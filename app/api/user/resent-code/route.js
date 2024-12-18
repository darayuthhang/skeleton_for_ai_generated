import { NextRequest, NextResponse } from "next/server";
import { db } from "@/app/lib/db";
import constants from "@/app/lib/constants";
import helpers from '@/app/lib/back-end-helpers';
import { AppError } from "@/app/lib/error-handler/app-errors";
import Zod from "@/app/lib/zod/Zod";
import { centralError } from "@/app/lib/error-handler/central-error";
import authLib from "@/app/lib/auth-lib";
import userMailer from "@/app/lib/user-mailer";
import { limiter } from "../../config/limiter";

import { Resend } from "resend";
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
    const remaining = await limiter.removeTokens(1);
    if (remaining < 0) {
        return NextResponse.json({ success: false }, {status: 429,error: "Too Many Request"});
    }
    const reqBody = await request.json()
    let { email } = Zod.userResentCodeSchema.parse(reqBody);
    try {
        const user = await db.User.findFirst({ where: { email: email, auth_method: constants.AUTH_METHOD.CUSTOM_EMAIL } });
        if (!user) throw new AppError('Cannot Send Verification Code.', constants.STATUS_CODES.NOT_FOUND);
        const verificationCode = authLib.GetVerificationCode();
        //update active user
        await db.Token.update({
            where: { user_id: user?.id }, data: {
                verification_code: verificationCode,
                expired_in: helpers.getSixMinute()
            },
        })
        const APP_NAME = constants.APP_NAME_FOR_SENDING_EMAIL
        let result = await resend.emails.send({
            from: `${APP_NAME}${constants.APP_NAME_DOMAIN_FOR_SENDING_EMAIL}`, // Ensure this domain has a good reputation and proper email authentication (SPF, DKIM, DMARC)
            to: email,
            subject: `${APP_NAME} Verification Code`, // Clear and simple subject line
            html: `
            <html>
                <head>
                    <style>
                        body { font-family: Arial, sans-serif; }
                        .header { font-weight: bold; font-size: 24px; }
                        .code { font-size: 22px; margin-top: 10px; }
                        .footer { margin-top: 10px; font-size: 14px; }
                    </style>
                </head>
                <body>
                    <h1>${APP_NAME}</h1>
                    <div class="header">Verification Code</div>
                    <div class="code">${verificationCode}</div>
                    <p class="footer">Here is your OTP verification code. It will expire in 6 minutes.</p>
                </body>
                </html>
    `,
            text: `${APP_NAME} Verification Code\n\nYour verification code is ${verificationCode}. It will expire in 6 minutes.` // Include a plain text version of the email
        });
        console.log(result);
        return NextResponse.json({ success: true }, { status: 200 })
    } catch (error) {
        return centralError(NextResponse, error);
    }
}
// export async function GET(request) {
//     try {
        
//         const remaining = await limiter.removeTokens(1);
//         // if (remaining < 0) {
//         //     return NextResponse.json({ success: false }, {
//         //         status: 429,
//         //         error: "Too Many Request",
//         //         // headers:{
//         //         //     'Access-Control-Allow-Origin': origin || '*',
//         //         //     'Content-Type': "text/plain"
//         //         // }
//         //     });
//         // }
//         return NextResponse.json({ success: true }, { status: 200 })
//     } catch (error) {

//     }
// }
