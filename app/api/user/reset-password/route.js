
// import { connect } from "@/dbConfig/dbConfig";
// import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/app/lib/db";
import constants from "@/app/lib/constants";
import helpers from '@/app/lib/back-end-helpers';
import userMailer from "@/app/lib/user-mailer";
import { AppError } from "@/app/lib/error-handler/app-errors";
import Zod from "@/app/lib/zod/Zod";
import { centralError } from "@/app/lib/error-handler/central-error";
import { limiter } from "../../config/limiter";
import authLib from "@/app/lib/auth-lib";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
    /**
     * @Todo maybe we can use jwt for reset password with link instead
     *  
     */
    /**
        * status code 404 ===>Email does not exist
        * status code 500 ===> Internal error.
        */
    const remaining = await limiter.removeTokens(1);
    if (remaining < 0) {
        return NextResponse.json({ success: false }, { status: 429, error: "Too Many Request" });
    }
    try {
        const reqBody = await request.json()
        let { email } = Zod.userResetEmailSchema.parse(reqBody);
        email = email.toLowerCase().trim();
        const user = await db.User.findFirst({ where: { email: email, validated: true, auth_method: constants.AUTH_METHOD.CUSTOM_EMAIL } });
        if (!user) throw new AppError("Email does not exist", constants.STATUS_CODES.NOT_FOUND)
        //delete token
        if(user?.id){
            const token = await db.Token.findFirst({ where: { user_id: user?.id } });
            if (token?.id) await db.Token.delete({where: {id: token?.id}});
        }
        //get new token
        //let resetToken = authLib.GetToken();
        let resetToken = await authLib.GenerateResetPassToken(
            {
                user_id: user?.id
            }
        )
        //create token
        // await db.Token.create({
        //     data: {
        //         user_id: user?.id,
        //         verification_code: resetToken,
        //         expired_in: helpers.getSixMinute()
        //     }
        // });
        const APP_NAME = constants.APP_NAME_FOR_SENDING_EMAIL
        let subject = `Reset your ${APP_NAME} password.`
        let text = `Someone (hopefully you) has requested a password reset for your ${APP_NAME}'s account.`;
 
        const link = `${process.env.NEXT_PUBLIC_URL}/user/update-password/${resetToken}`
        await resend.emails.send({
            from: `${APP_NAME}${constants.APP_NAME_DOMAIN_FOR_SENDING_EMAIL}`,
            to: email,
            subject: subject,
            html: `
               <html>
                <body>
                    <h1>${APP_NAME}</h1>
                    <div style="font-weight:bold; font-size:20px">${text}</div>
                    <a href="${link}">${link}</a>
                    <p>Here is your link</p>
                    <p>It will expire in 6 minutes.</p>
                </body>
                </html>
            `,
        });
        return NextResponse.json({ success: true }, { status: 200 })
    } catch (error) {
        return centralError(NextResponse, error);
    }
}


