import { NextRequest, NextResponse } from "next/server";
import SubService from "@/app/api/service/sub-service";
import { centralError } from "@/app/lib/error-handler/central-error";
import { isAuthorization } from "@/app/api/apiMiddleware/checkAuthorization";
import { getUserIdAfterAuthorize } from "@/app/api/apiMiddleware/checkAuthorization";
import SearchRequestService from "@/app/api/service/search-request-service";
import { rateLimitFeedBck } from "@/app/api/config/limiter";
import { db } from "@/app/lib/db";
import Zod from "@/app/lib/zod/Zod";
import helpers from "@/app/lib/helpers";

import { inngest } from "@/app/api/inngest/client";
import UserService from "@/app/api/service/user-service";
import constants from "@/app/lib/constants";
import EmailService from "@/app/api/service/email-service";

export const maxDuration = 25;
// Opt out of caching; every request should send a new event
// export const dynamic = 'force-dynamic'; //this only
const userService = new UserService();
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
  const {text} = Zod.feedBackSchema.parse(reqBody);

  try {
    let res = await userService.fetchEmailById(userId);
    
    // let inngestId = await inngest.send({
    //     name: "3dlogoai/sendEmail",
    //     data: {
    //         fromEmail:constants.APP_NAME_DOMAIN_FOR_SENDING_EMAIL,
    //         userEmail:res?.email,
    //         text
    //     },
    //   });
    //   const id = inngestId?.ids[0];
    const userEmail = res?.email;
    const fromEmail = constants.APP_NAME_DOMAIN_FOR_SENDING_EMAIL
    const newFromEmail = `Feedback ${helpers.formatDate(new Date())}<no.reply@3dlogoai.com>`
    const emailTo = "darayuthhang12@gmail.com"
    const subject = `Feedback from ${userEmail} to 3dlogoai.com`

    let response = await emailService.sendThroughEmail(
      emailTo,
      subject,
      text,
      newFromEmail
    )
   
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
