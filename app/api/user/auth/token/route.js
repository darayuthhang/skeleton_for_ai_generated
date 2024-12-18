import { NextRequest, NextResponse } from "next/server";
// import { db } from "@/app/lib/db";
// import constants from "@/app/lib/constants";
// import { limiter } from "../../config/limiter";
// import { AppError } from "@/app/lib/error-handler/app-errors";
import { centralError } from "@/app/lib/error-handler/central-error";
import Zod from "@/app/lib/zod/Zod";
import authLib from "@/app/lib/auth-lib";

export async function POST(request) {
    /**
         * 404 password not found
         * 500 Unable to Find active user
         * 400 bad request
         * 406 user does not exist
    */
    // const remaining = await limiter.removeTokens(1);
    // if (remaining < 0) {
    //     return NextResponse.json({ success: false }, { status: 429, error: "Too Many Request" });
    // }

    const reqBody = await request.json()
    let { refreshToken } = reqBody;
    if (refreshToken === null) NextResponse.json({ success: false }, { status: 401, error: "Refresh token does not exist." });
    try {
        const user = await authLib.VerifyToken(refreshToken, process.env.NEXT_PUBLIC_REFRESH_TOKEN_SECRET);
  
        const accessToken = await authLib.GenerateAccessToken({ userId: user?.userId });

        return NextResponse.json({ success: true, accessToken: accessToken }, { status: 200});
    } catch (error) {
        console.log(error);
        return centralError(NextResponse, error);
    }
}
