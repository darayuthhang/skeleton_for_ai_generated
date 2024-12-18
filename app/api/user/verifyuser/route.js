import { NextRequest, NextResponse } from "next/server";
import { db } from "@/app/lib/db";
import constants from "@/app/lib/constants";
import { limiter } from "../../config/limiter";
import { AppError } from "@/app/lib/error-handler/app-errors";
import authLib from "@/app/lib/auth-lib";

import { centralError } from "@/app/lib/error-handler/central-error";
export async function POST(request) {
    const remaining = await limiter.removeTokens(1);
    if (remaining < 0) {
        return NextResponse.json({ success: false }, { status: 429, error: "Too Many Request" });
    }
    const reqBody = await request.json()
    let { verificationCode, email } = reqBody
    email = email.toLowerCase();
    try {
        const user = await db.User.findFirst({ where: { email: email, auth_method: constants.AUTH_METHOD.CUSTOM_EMAIL } });
        const getCode = await db.Token.findFirst({where: {verification_code:verificationCode}});
     
        //check if the code does not exist
        if (!getCode) throw new AppError("verificationCode does not exist", constants.STATUS_CODES.NOT_FOUND); 
        //check if code is expired.
        if (getCode && getCode?.expired_in) {
            if (Date.now() >= getCode?.expired_in) throw new AppError('Invalid verificationCode or expired timestamp.', constants.STATUS_CODES.NOT_FOUND)
        }  
        await db.User.update({where: {id: user?.id},data: {
                validated: true,
                updated_at: new Date()
            },
        })
        if (getCode?.id) await db.Token.delete({ where: { user_id: user?.id } })
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
        //update active user
        return NextResponse.json({ success: true, data: userData }, { status: 200 })
    } catch (error) {
        console.log(error);
        return centralError(NextResponse, error);
    }
}

