import { NextRequest, NextResponse } from "next/server";
import { centralError } from "@/app/lib/error-handler/central-error";
import {
  isAuthorization,
  getUserIdAfterAuthorize,
} from "@/app/api/apiMiddleware/checkAuthorization";
import SearchRequestService from "@/app/api/service/search-request-service";
import { rateLimitPromptDashboard } from "@/app/api/config/limiter";
import S3Service from "@/app/api/service/s3-service";
import OpenAiService from "@/app/api/service/openai-service";
import { db } from "@/app/lib/db";
import Zod from "@/app/lib/zod/Zod";
import Replicate from "replicate";
import { stringToSlug } from "@/app/lib/3d-logo-helpers";
import { v4 as uuidv4 } from "uuid";
import { inngest } from "@/app/api/inngest/client";
import constants from "@/app/lib/constants";
import { removeDots } from "@/app/lib/3d-logo-helpers";

export const dynamic = "force-dynamic";
export const maxDuration = 25;

const searchService = new SearchRequestService();
const s3Service = new S3Service();
const openAiService = new OpenAiService(
  process.env.OPEN_AI_ORGANIZATION,
  process.env.OPEN_AI_PROJECT_ID,
  process.env.OPEN_AI_API_KEY
);
const replicate = new Replicate({ auth: process.env.REPLICATE_API_TOKEN });


async function readStreamToBuffer(stream) {
  const reader = stream.getReader();
  const chunks = [];
  let done, value;

  while (!done) {
    ({ done, value } = await reader.read());
    if (value) chunks.push(value);
  }

  return Buffer.concat(chunks);
}

/**
 *
 * @PROMPT_TYPE_1
 */
// function buildUserPrompt({ prompt }) {
//   let userPrompts = "";

//   return userPrompts?.trim();
// }


export async function POST(request) {
  try {
    // Rate limit check
    const remaining = await rateLimitPromptDashboard.removeTokens(1);
    if (remaining < 0) {
      return NextResponse.json(
        { success: false, error: "Too Many Requests" },
        { status: 429 }
      );
    }

    // Authorization check
    if (!(await isAuthorization(request))) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Parse request body and user ID
    const userId = getUserIdAfterAuthorize(request);
    let { prompt } = Zod.newPromptSchema.parse(await request.json());

    // Check user request limits
    const search = await searchService.findRemainRequestByUserId(userId);
    if (!search || search.remaining_requests <= 0) {
      throw new Error("Remaining requests have reached the limit");
    }
    //check if one time payment will expired 
    // Check one-time payment access
    const oneTimePayment = await db.OneTimePayment.findFirst({
      where: { user_id: userId },
      select: { has_access: true },
    });
    const hasAccess = oneTimePayment?.has_access || false;

    /**
     * @sendToGPT
     */

    const gptModel = "gpt-4o-mini";
    const gptPrompt = `Extract important text from prompt ${prompt} that make sense, 
    avoid text coloring page, 
    and return with meta description and description that rank well for seo
     and return in JSON format below: {
    data:"",
    meta_description:"",
    description:"",
    alt_text:""
    }`;
    const assistant = `You are expert in extract important text from prompt that can rank for seo.`;
    let gptResponse = await openAiService.sendToGptAPiChat(
      gptPrompt,
      assistant,
      gptModel
    );
    let userPrompts = JSON.parse(gptResponse);

    const promptForGenerated = userPrompts?.data
    const promptForSeo = userPrompts?.data + " coloring page";
    const domainSlug = stringToSlug(promptForSeo + `-${uuidv4()}`);
    const titleAndHeading = removeDots(promptForSeo);
    const description = userPrompts?.description;
    const metaDescription = userPrompts?.meta_description;
    const altText = userPrompts?.alt_text;

    /**
     * Flex shcneel return in array format [ ReadableStream { locked: false, state: 'readable', supportsBYOB: false }]
     * other model return ReadableStream { locked: false, state: 'readable', supportsBYOB: false }
     */
    /**
     * @SendToReplicate
     */
    const newPrompt = `Generate a black-and-white coloring page of ${promptForGenerated}. The background must be white color.`
    const input = {
      prompt: newPrompt,
      go_fast: true,
      megapixels: "1",
      num_outputs: 1,
      aspect_ratio: "1:1",
      output_format: "png",
      output_quality: 80,
      num_inference_steps: 4,
    };
    const replicateOutput = await replicate.run(
      "black-forest-labs/flux-schnell",
      { input }
    );

    /**
     * @UploadtoS3
     */

    const imageBuffer = await readStreamToBuffer(replicateOutput[0]);
    const fileName = await s3Service.uploadFileToS3WithBuffer(imageBuffer);
    const imageUrl = `https://${process.env.S3_BUCKET_NAME}.s3.amazonaws.com/${constants.folder}/${fileName}`;

    /**
     * @saveToDatabase
     */

    await db.$transaction(async (tx) => {
      await tx.ImageUrl.create({
        data: {
          title_and_heading: titleAndHeading,
          user_id: userId,
          has_access: hasAccess,
          description,
          meta_description:metaDescription,
          domain_slug: domainSlug,
          image_url: imageUrl,
          alt_text:altText
        },
      });
  
      await tx.SearchRequest.update({
        where: { user_id: userId },
        data: {
          remaining_requests: { decrement: 1 },
          updated_at: new Date(),
        },
      });
    });    

    return NextResponse.json({ success: true, imageUrl: imageUrl }, { status: 200 });

    // Return successful response
    // return NextResponse.json({ success: true,  inngestId: inngestId?.ids[0] }, { status: 200 });
  } catch (error) {
    console.error("Error generating logo:", error);
    return centralError(NextResponse, error);
  }
}
