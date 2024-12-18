import { NextRequest, NextResponse } from "next/server";
import { centralError } from "@/app/lib/error-handler/central-error";
import { isAuthorization } from "@/app/api/apiMiddleware/checkAuthorization";
import { getUserIdAfterAuthorize } from "@/app/api/apiMiddleware/checkAuthorization";
import SearchRequestService from "@/app/api/service/search-request-service";
import { rateLimitDownload } from "@/app/api/config/limiter";

import { db } from "@/app/lib/db";
import { v4 as uuidv4 } from "uuid";
import CloudinaryService from "@/app/api/service/cloudinary-service";
import { inngest } from "@/app/api/inngest/client";

import sharp from "sharp";
import Zod from "@/app/lib/zod/Zod";

const cloudinaryService = new CloudinaryService();

export const maxDuration = 25;


export async function POST(request, { params }) {
  const remaining = await rateLimitDownload.removeTokens(1);
  if (remaining < 0) {
    return NextResponse.json(
      { success: false },
      { status: 429, error: "Too Many Request" }
    );
  }
  if (!(await isAuthorization(request))){
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  }
  const userId = getUserIdAfterAuthorize(request);
  const reqBody = await request.json();
  const { imageUrl } = Zod.downloadSchema.parse(reqBody);
  
//     console.log(industry);
  //accept url 
  //send upload to cloudinary
  //reformat and then return to url format, svg, ebs 
  // then front-end can download
  
  let result = [];
  try {
    //if search request is 0, handling error.
    // let search = await searchService.findRemainRequestByUserId(userId);

    // if (search?.remaining_requests <= 0 || !search) {
    //   throw new Error("Remaining requests have reached the limit");
    // }
    // const oneTimePayment = await db.OneTimePayment.findUnique({
    //   where: {
    //     user_id: userId,
    //   },
    //   select: {
    //     has_access: true,
    //   },
    // })
    // const isuserBuy = oneTimePayment?.has_access || false;
    let imageList = await cloudinaryService.upload(imageUrl);
    
    return NextResponse.json(
      {
        success: true,
        imageList
      },
      { status: 200 }
    );
  } catch (error) {
    return centralError(NextResponse, error);
  }
}
