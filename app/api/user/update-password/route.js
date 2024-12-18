import { NextRequest, NextResponse } from "next/server";
import { db } from "@/app/lib/db";
import constants from "@/app/lib/constants";
import { AppError } from "@/app/lib/error-handler/app-errors";
import { centralError } from "@/app/lib/error-handler/central-error";
import authLib from "@/app/lib/auth-lib";
import { limiter } from "../../config/limiter";
export async function PUT(request) {
    const remaining = await limiter.removeTokens(1);
    if (remaining < 0) {
        return NextResponse.json({ success: false }, {status: 429,error: "Too Many Request"});
    }
    const reqBody = await request.json()
    let { token, password } = reqBody;
    try {
        // let code = await this.tokenRepository.findCode(token);
        //const code = await db.Token.findFirst({ where: { verification_code: token } });
        let code = await authLib.ValidateResetPassSignature(token);
        if (!code?.isValid) throw new AppError("Unable to Update password active user", constants.STATUS_CODES.NOT_FOUND)
        let hashPassword = await authLib.GeneratePassword(password, await authLib.GenerateSalt());
        const user = await db.User.update({ where: { id: code?.payload?.user_id }, data: { password: hashPassword, updated_at: new Date() } });
        return NextResponse.json({ success: true }, { status: 200 })
    } catch (error) {
        return centralError(NextResponse, error);
    }
}

