import { NextRequest, NextResponse } from "next/server";
import SubService from "@/app/api/service/sub-service";
import { centralError } from "@/app/lib/error-handler/central-error";
import { isAuthorization } from "@/app/api/apiMiddleware/checkAuthorization";
import { getUserIdAfterAuthorize } from "@/app/api/apiMiddleware/checkAuthorization";
import SearchRequestService from "@/app/api/service/search-request-service";
import { rateLimitPromptDashboard } from "@/app/api/config/limiter";
import S3Service from "@/app/api/service/s3-service";
import OpenAiService from "@/app/api/service/openai-service";
import constants from "@/app/lib/constants";
import { db } from "@/app/lib/db";
import { v4 as uuidv4 } from "uuid";

import { inngest } from "@/app/api/inngest/client";

import sharp from "sharp";
import Zod from "@/app/lib/zod/Zod";

export const maxDuration = 25;
// Opt out of caching; every request should send a new event
// export const dynamic = 'force-dynamic'; //this only

const subService = new SubService();
const searchService = new SearchRequestService();
// const s3Service = new S3Service();
// const openAiService = new OpenAiService(
//   process.env.OPEN_AI_ORGANIZATION,
//   process.env.OPEN_AI_PROJECT_ID,
// process.env.OPEN_AI_API_KEY );

export async function POST(request, { params }) {
  const remaining = await rateLimitPromptDashboard.removeTokens(1);
  if (remaining < 0) {
    return NextResponse.json(
      { success: false },
      { status: 429, error: "Too Many Request" }
    );
  }
  if (!(await isAuthorization(request)))
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  const userId = getUserIdAfterAuthorize(request);
  const reqBody = await request.json();
  const { style, 
    threeDModal, 
    popularCategory, 
    color, bgColor, 
    promptToRequired,
    companyName,
    industry } =
    Zod.promptSchema.parse(reqBody);

    
  
  let result = [];
  try {
    //if search request is 0, handling error.
    let search = await searchService.findRemainRequestByUserId(userId);

    if (search?.remaining_requests <= 0 || !search) {
      throw new Error("Remaining requests have reached the limit");
    }
    const oneTimePayment = await db.OneTimePayment.findUnique({
      where: {
        user_id: userId,
      },
      select: {
        has_access: true,
      },
    })
    const isuserBuy = oneTimePayment?.has_access || false;
  
    let inngestId = await inngest.send({
      name: "3dlogoai/createThreeDLogo",
      data: {
        threeDModal,
        popularCategory,
        companyName,
        style,
        bgColor,
        industry,
        color,
        userId,
        isuserBuy,
        hasAccess:false,
        prompt:promptToRequired
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
