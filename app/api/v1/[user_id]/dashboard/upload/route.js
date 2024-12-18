import { NextRequest, NextResponse } from "next/server";

import { centralError } from "@/app/lib/error-handler/central-error";
import { isAuthorization } from "@/app/api/apiMiddleware/checkAuthorization";
import { getUserIdAfterAuthorize } from "@/app/api/apiMiddleware/checkAuthorization";
import SearchRequestService from "@/app/api/service/search-request-service";
import { rateLimitUpload } from "@/app/api/config/limiter";
import constants from "@/app/lib/constants";
import { db } from "@/app/lib/db";

import { inngest } from "@/app/api/inngest/client";
import S3Service from "@/app/api/service/s3-service";
import OpenAiService from "@/app/api/service/openai-service";
import { hashMapColor } from "@/app/lib/3d-logo-constant";
import sharp from "sharp";
import Zod from "@/app/lib/zod/Zod";
import { transformPrompt } from "@/app/lib/3d-logo-helpers";

export const maxDuration = 25;
// Opt out of caching; every request should send a new event
// export const dynamic = 'force-dynamic'; //this only
const s3Service = new S3Service();
const searchService = new SearchRequestService();
const openAiService = new OpenAiService(
  process.env.OPEN_AI_ORGANIZATION,
  process.env.OPEN_AI_PROJECT_ID,
  process.env.OPEN_AI_API_KEY
);

export async function POST(request, { params }) {
  const remaining = await rateLimitUpload.removeTokens(1);
  if (remaining < 0) {
    return NextResponse.json(
      { success: false },
      { status: 429, error: "Too Many Request" }
    );
  }
  if (!(await isAuthorization(request))) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const userId = getUserIdAfterAuthorize(request);

  const formData = await request.formData();
  const file = formData.get("file");
  const threeDModal = formData.get("threeDModal");
  const style = formData.get("style");
  const bgColor = formData.get("bgColor");
  const color = formData.get("color");

  const width = 512,
    height = 512;

  try {
    //if search request is 0, handling error.
    let search = await searchService.findRemainRequestByUserId(userId);

    if (search?.remaining_requests <= 0) {
      throw new Error("Remaining requests have reached the limit");
    }
    //if file does not exist, throw error.
    if (!file) throw new Error("File or prompts do not exist.");
    const buffer = Buffer.from(await file.arrayBuffer());

    //convert image to 512x512
    const resizedImageBuffer = await sharp(buffer)
      .resize({ width: width, height: height }) // Adjust dimensions as needed
      .toBuffer();

      /**
       * @Note we do not need it for now. (Below)
       */
         //upload to s3
        // const fileName = await s3Service.uploadFileToS3(
        //   file.name,
        //   resizedImageBuffer
        // );
        // //get image url from s3
        // const imageUrl = `https://${process.env.S3_BUCKET_NAME}.s3.amazonaws.com/${constants.folder}/${fileName}`;
    
        // Convert the resized image buffer to a base64 string
    const base64Image = resizedImageBuffer.toString('base64');

    // Create a data URL from the base64 string
    const imageUrl = `data:image/png;base64,${base64Image}`;

    //check if user has pro plan(user buy one time)
    const oneTimePayment = await db.OneTimePayment.findFirst({
      where: {
        user_id: userId,
      },
      select: {
        has_access: true,
      },
    });

    const isuserBuy = oneTimePayment?.has_access || false;


 
    let inngestId = await inngest.send({
      name: "3dlogoai/uploadLogo",
      data: {
        threeDModal,
        style,
        bgColor,
        color,
        userId,
        isuserBuy,
        originalImageUrl:imageUrl,
        hasAccess:false,
      },
    });

    const id = inngestId?.ids[0];

    return NextResponse.json(
      {
        success: true,
        inngestId: id,
      },
      { status: 200 }
    );
  } catch (error) {
    return centralError(NextResponse, error);
  }
}
