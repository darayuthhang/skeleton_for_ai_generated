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
    */
 
    const remaining = await limiter.removeTokens(1);
    if (remaining < 0) {
        return NextResponse.json({ success: false }, { status: 429, error: "Too Many Request" });
    }
    try {
        const reqBody = await request.json()
        let { googleToken, signUpOrLogin, accountType } = reqBody;
   
        let user = null, userData = {}, userObject = {}, customUser;
        let payload = await authLib.getGoogleUserInfo(googleToken);
        const googleId = payload.sub;
        console.log("google users login");
        // /**
        //  * @Description
        //  * check if account with payment already exist
        //  */
        // if(accountType === "Pro"){
        //     const existUser = await db.User.findUnique({ where: { email: payload?.email } });
        //     if (existUser) throw new AppError('User signup with exist email', constants.STATUS_CODES.NOT_FOUND)
        // }
        /**
        * @Description
        * if user sign up with gmail and email already
        * exist return email already exist
        */
        if (signUpOrLogin === constants.SIGN_UP) {
            const existUser = await db.User.findUnique({ where: { email: payload?.email } });
            if (existUser) throw new AppError('User signup with exist email', constants.STATUS_CODES.NOT_FOUND)
        }
            /**
            * @Description if google email exist in customer user, 
            * tell user email already
           */
        customUser = await db.User.findFirst({ where: { email: payload?.email, auth_method: constants.AUTH_METHOD.CUSTOM_EMAIL } });
        if (customUser) throw new AppError("User already exist in custom user.", constants.STATUS_CODES.CONFLICT);

        /**
        * @Description user re login with the exist google email
        *  do not create another google email.
        */
        user = await db.User.findFirst({ where: { email: payload?.email, auth_method: constants.AUTH_METHOD.GMAIL, google_id: googleId } });
        if (user?.google_id) {
            let googleUserData = await authLib.FormatGoogleUser(user?.google_id, googleId, user)
            return NextResponse.json({ success: true, data: googleUserData }, { status: 200 })
        }
        /**
         * @Description create user 
         */
        if(!customUser){
            user = await db.User.create({
                data: {
                   
                    name: payload?.given_name,
                    email: payload?.email,
                    google_id:googleId,
                    auth_method: constants.AUTH_METHOD.GMAIL
                }
            })
            await db.SearchRequest.create({
                data:{
                    user_id:user?.id,
                    remaining_requests:constants.FREE_CREDIT
                }
            }) 
            userObject = { userId: user?.id }
            userData = {
                accessToken: await authLib.GenerateAccessToken(userObject),
                refreshToken: await authLib.GenerateRefreshToken(userObject),
                userId: user?.id,
                name: user?.name,
                email: user?.email,
                created_at: user?.created_at
            }
            return NextResponse.json({ success: true, data: userData }, { status: 200 })
        }
        throw new AppError("Unable to login with Google user");
    } catch (error) {
        console.log(error);
        return centralError(NextResponse, error);
    }
}
