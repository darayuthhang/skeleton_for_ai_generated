import { NextRequest, NextResponse } from "next/server";
import { centralError } from "@/app/lib/error-handler/central-error";
import { isAuthorization } from "@/app/api/apiMiddleware/checkAuthorization";
import { getUserIdAfterAuthorize } from "@/app/api/apiMiddleware/checkAuthorization";
import { rateLimitFeedBck } from "@/app/api/config/limiter";
import { db } from "@/app/lib/db";
import Zod from "@/app/lib/zod/Zod";
import helpers from "@/app/lib/helpers";

import { inngest } from "@/app/api/inngest/client";

import constants from "@/app/lib/constants";
import EmailService from "@/app/api/service/email-service";

export const maxDuration = 25;
// Opt out of caching; every request should send a new event
// export const dynamic = 'force-dynamic'; //this only
const emailService = new EmailService();

export async function POST(request, { params }) {
  const remaining = await rateLimitFeedBck.removeTokens(1);
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
  const { imageUrl, email } = reqBody;
  try {
    // let inngestId = await inngest.send({
    //     name: "3dlogoai/sendEmail",
    //     data: {
    //         fromEmail:constants.APP_NAME_DOMAIN_FOR_SENDING_EMAIL,
    //         userEmail:res?.email,
    //         text
    //     },
    //   });
    //   const id = inngestId?.ids[0];



    let inngestId = await inngest.send({
      name: "3dlogoai/sendLogoThroughEmail",
      data: {
        fromEmail: constants.APP_NAME_DOMAIN_FOR_SENDING_EMAIL,
        emailSendTo : email,
        imageUrl
      },
    });
    return NextResponse.json(
      {
        success: true,
        // inngestId: id,
      },
      { status: 200 }
    );
  } catch (error) {
    return centralError(NextResponse, error);
  }
}
