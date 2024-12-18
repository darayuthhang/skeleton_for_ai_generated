
// import { connect } from "@/dbConfig/dbConfig";
// import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/app/lib/db";
import constants from "@/app/lib/constants";
import AuthLib from "@/app/lib/auth-lib";
import helpers from '@/app/lib/back-end-helpers';
import userMailer from "@/app/lib/user-mailer";
import { AppError } from "@/app/lib/error-handler/app-errors";
import Zod from "@/app/lib/zod/Zod";
import { centralError } from "@/app/lib/error-handler/central-error";
import { limiter } from "../../config/limiter";

import { Resend } from "resend";

const { AUTH_METHOD , STATUS_CODES} = constants;
const resend = new Resend(process.env.RESEND_API_KEY);

/**
      * status code 400 ==> Please activae your account
      * status code 404 ===> Email already exist
      * status code 500 ===> Create user not found.
      */
export async function POST(request) {

    const remaining = await limiter.removeTokens(1);
    if (remaining < 0) {
        return NextResponse.json({ success: false }, { status: 429, error: "Too Many Request" });
    }
    try {
        const reqBody = await request.json()
        let { name, email, password } = Zod.userSignUpSchema.parse(reqBody);
        email = email.toLowerCase().trim();
        //check if googleUser exist 
        const isGoogleUser = await db.User.findUnique({
            where: { email: email, auth_method: AUTH_METHOD.GMAIL }
        })
        if (isGoogleUser) throw new AppError("Email already exist.", STATUS_CODES.NOT_FOUND)
        //check if user has not activate account
        const isNotActivate = await db.User.findFirst({ where: { email: email, validated: false, auth_method: AUTH_METHOD.CUSTOM_EMAIL } });
        if (isNotActivate) throw new AppError('Please activate your account.', STATUS_CODES.BAD_REQUEST)
        const hashPassword = await AuthLib.GeneratePassword(password, await AuthLib.GenerateSalt());
        const verificationCode = AuthLib.GetVerificationCode()
        await db.$transaction(async (tx) => {
            // Code running in a transaction...
            const newUser = await tx.User.create({
                data: {
                    name: name,
                    email: email,
                    password: hashPassword,
                    auth_method: AUTH_METHOD.CUSTOM_EMAIL
                }
            })
            await tx.Token.create({
                data:{
                    user_id: newUser.id,
                    verification_code: verificationCode,
                    expired_in: helpers.getSixMinute()
                }
            })
            await tx.SearchRequest.create({
                data:{
                    user_id:newUser.id,
                    remaining_requests:constants.FREE_CREDIT
                }
            })
        })
        const APP_NAME = constants.APP_NAME_FOR_SENDING_EMAIL;
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
    //     await resend.emails.send({
    //         from: `${APP_NAME}${constants.APP_NAME_DOMAIN_FOR_SENDING_EMAIL}`, // Ensure this domain has a good reputation and proper email authentication (SPF, DKIM, DMARC)
    //         to: email,
    //         subject: `${APP_NAME} Verification Code`, // Clear and simple subject line
    //         html: `
    //    <html>
    //     <head>
    //         <style>
    //             body { font-family: Arial, sans-serif; }
    //             .header { font-weight: bold; font-size: 24px; }
    //             .code { font-size: 22px; margin-top: 10px; }
    //             .footer { margin-top: 10px; font-size: 14px; }
    //         </style
    //     </head>
    //     <body>
    //         <h1>${APP_NAME}</h1>
    //         <div class="header">Verification Code</div>
    //         <div class="code">${verificationCode}</div>
    //         <p class="footer">Here is your OTP verification code. It will expire in 6 minutes.</p>
    //     </body>
    //     </html>
    // `,
    //         text: `${APP_NAME} Verification Code\n\nYour verification code is ${verificationCode}. It will expire in 6 minutes.` // Include a plain text version of the email
    //     });
        // await resend.emails.send({
        //     from: `stockalertnow${process.env.NEXT_PUBLIC_DOMAIN_EMAIL}`,
        //     to: email,
        //     subject: `${APP_NAME}'s verificationcode`,
        //     html: `
        //        <html>
        //         <body>
        //             <h1>Stockalertnow</h1>
        //             <div style="font-weight:bold; font-size:35px">Verification code</div>
        //             <img  style="width:50px" src=${constants.imageUrl} alt="Image">
        //             <div style="font-size:50px">${verificationCode}</div>
        //             <p>Here is your OTP verification code.</p>
        //             <p>It will expire in 6 minutes.</p>
        //         </body>
        //         </html>
        //     `,
        // });
                    // let result = await resend.emails.send({
//             //     require :( "notifi)ations@stockalertnow.com",
//             //     to: "darayuthhang12@gmail.com",
//             //     subject: "Alibaba", 
//             //     html: emailTemplate(),
//             // });
        //await userMailer.sendEmail(APP_NAME, APP_NAME, email, `${APP_NAME}'s verificationcode`, verificationCode)
        return NextResponse.json({success: true}, {status: 200})
    } catch (error) {
        return centralError(NextResponse, error);
    }
}


