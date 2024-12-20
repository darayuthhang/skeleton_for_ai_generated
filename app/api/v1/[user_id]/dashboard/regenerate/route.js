import { NextRequest, NextResponse } from "next/server";
import { centralError } from "@/app/lib/error-handler/central-error";
import { isAuthorization, getUserIdAfterAuthorize } from "@/app/api/apiMiddleware/checkAuthorization";
import SearchRequestService from "@/app/api/service/search-request-service";
import { rateLimitPromptDashboard } from "@/app/api/config/limiter";
import S3Service from "@/app/api/service/s3-service";
import OpenAiService from "@/app/api/service/openai-service";
import { db } from "@/app/lib/db";
import constants from "@/app/lib/constants";
import Zod from "@/app/lib/zod/Zod";
import Replicate from "replicate";
import { stringToSlug, removeDots } from "@/app/lib/3d-logo-helpers";
import { v4 as uuidv4 } from "uuid";





const searchService = new SearchRequestService();
const s3Service = new S3Service();
const openAiService = new OpenAiService(
  process.env.OPEN_AI_ORGANIZATION,
  process.env.OPEN_AI_PROJECT_ID,
  process.env.OPEN_AI_API_KEY
);
const replicate = new Replicate({ auth: process.env.REPLICATE_API_TOKEN });

export const dynamic = "force-dynamic";
export const maxDuration = 25;

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





export async function POST(request) {
  try {
    // Rate limit check
    const remaining = await rateLimitPromptDashboard.removeTokens(1);
    if (remaining < 0) {
      return NextResponse.json({ success: false, error: "Too Many Requests" }, { status: 429 });
    }

    // Authorization check
    if (!(await isAuthorization(request))) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Parse request body and user ID
    const userId = getUserIdAfterAuthorize(request);
    const { imageUrl } = Zod.imageUrlSchema.parse(await request.json());
    
    // Check user request limits
    const search = await searchService.findRemainRequestByUserId(userId);
    if (!search || search.remaining_requests <= 0) {
      throw new Error("Remaining requests have reached the limit");
    }

    // Check one-time payment access
    const oneTimePayment = await db.OneTimePayment.findFirst({ where: { user_id: userId }, select: { has_access: true } });
    const hasAccess = oneTimePayment?.has_access || false;

    let     prompt = `Generate an image description in JSON format with the following structure: { data: {
      prompt:"",
      short_prompt_main_point:"",
          meta_description:"",
    description:"",
    alt_text:""
  }}`;

    const input = {
      megapixels: "1",
      num_outputs: 1,
      redux_image: imageUrl,
      aspect_ratio: "1:1",
      output_format: "png",
      output_quality: 80,
      num_inference_steps: 4
    };

    const[ gptVisionResponse, replicateOutput] = await Promise.all([
      openAiService.sendToGptAPiChatVisionWithImageUrl(imageUrl, prompt),
       replicate.run(
        "black-forest-labs/flux-redux-schnell",
        { input }
      )
    ])
    //   const fluxModel = "black-forest-labs/flux-1.1-pro"

    
    
    const afterParse = JSON.parse(gptVisionResponse);
    
    const promptForSeo = afterParse?.data?.short_prompt_main_point;

    const promptForGenerated = afterParse?.data?.prompt

    const domainSlug = stringToSlug(promptForSeo + `-coloring-page-${uuidv4()}`);
    const titleAndHeading = removeDots(promptForGenerated);
    const description = afterParse?.data?.description;
    const metaDescription = afterParse?.data?.meta_description;
    const altText = afterParse?.data?.alt_text;

    /**
     * @UploadtoS3
     */

    const imageBuffer = await readStreamToBuffer(replicateOutput[0]);
    const fileName = await s3Service.uploadFileToS3WithBuffer(imageBuffer);
    const s3ImageUrl = `https://${process.env.S3_BUCKET_NAME}.s3.amazonaws.com/${constants.folder}/${fileName}`;
    
    

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

     return NextResponse.json({ success: true, imageUrl:s3ImageUrl  }, { status: 200 });

    // Return successful response
    // return NextResponse.json({ success: true,  inngestId: inngestId?.ids[0] }, { status: 200 });
  } catch (error) {
    console.error("Error generating logo:", error);
    return centralError(NextResponse, error);
  }
}


        //   const inputPrompt = {
    //     prompt: userPrompt,
    //     resolution: "1024x1024",
    //     style_type: "None",
    //     aspect_ratio: "16:9",
    //     magic_prompt_option: "Auto"
    //   };
    //   const flux = { prompt: userPrompt, prompt_upsampling: true }
    //   const model = `ideogram-ai/ideogram-v2`
    //get prompt
    //then send to ideogram