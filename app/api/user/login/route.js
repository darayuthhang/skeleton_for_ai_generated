import { NextRequest, NextResponse } from "next/server";
import { db } from "@/app/lib/db";
import constants from "@/app/lib/constants";
import { limiter } from "../../config/limiter";
import { AppError } from "@/app/lib/error-handler/app-errors";
import { centralError } from "@/app/lib/error-handler/central-error";
import Zod from "@/app/lib/zod/Zod";

import authLib from "@/app/lib/auth-lib";
// export async function GET(request) {
//     try {

//         return NextResponse.json({ success: true }, { status: 200 })

//     } catch (error) {

//     }
// }
export async function POST(request) {
    /**
         * 404 password not found
         * 500 Unable to Find active user
         * 400 bad request
         * 406 user does not exist
         * 
         * 
    */
    const remaining = await limiter.removeTokens(1);
    if (remaining < 0) {
        return NextResponse.json({ success: false }, { status: 429, error: "Too Many Request" });
    }
    try {
        const reqBody = await request.json()
        let { email, password } = Zod.userLoginSchema.parse(reqBody);;
        // const isPaymentAccountSignUp = accountType === 'Pro' && signUpOrLogin === "sign_up";
        // if (isPaymentAccountSignUp){
        //     //create account for user
        //     //send 
        // }
        //return if user does not exist
        const isUserExist = await db.User.findFirst({ where: { email: email } });
        if (!isUserExist) throw new AppError("user does not exist", constants.STATUS_CODES.NOT_ACCEPTABLE)
        //ccheck if custom user exist in email user
        const isCustomUserInEmailUser = await db.User.findFirst({ where: {email: email, auth_method: constants.AUTH_METHOD.GMAIL}})
        if(isCustomUserInEmailUser) throw new AppError("user is gmail users", constants.STATUS_CODES.CONFLICT);
        //check for unable to find active user
        const user = await db.User.findFirst({ where: { email: email, validated: true, auth_method: constants.AUTH_METHOD.CUSTOM_EMAIL } });
        if (!user) throw new AppError("Unable to Find active user")

        if (!await authLib.isPassword(password, user?.password)) {
            throw new AppError('Password not found', constants.STATUS_CODES.NOT_FOUND)
        }
        const userObject = { userId: user?.id }
        const refreshToken = await authLib.GenerateRefreshToken(userObject);
        const accessToken = await authLib.GenerateAccessToken(userObject);
        const userData = {
            accessToken,
            refreshToken,
            userId: user?.id,
            name: user?.name,
            email: user?.email,
            created_at: user?.created_at
        }
        return NextResponse.json({ success: true, data: userData }, { status: 200 })
    } catch (error) {
        console.log(error);
        return centralError(NextResponse, error);
    }
}
