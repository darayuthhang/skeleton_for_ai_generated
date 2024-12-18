import { NextRequest, NextResponse } from "next/server";
import SubService from "@/app/api/service/sub-service";
import { centralError } from "@/app/lib/error-handler/central-error";
import { rateLimitUnSub } from "@/app/api/config/limiter";
import { isAuthorization } from "@/app/api/apiMiddleware/checkAuthorization";
import { getUserIdAfterAuthorize } from "@/app/api/apiMiddleware/checkAuthorization";
import StripePayment from "@/app/lib/stripe/Stripe";
import Zod from "@/app/lib/zod/Zod";
export const maxDuration = 25;
export const dynamic = 'force-dynamic';


const subService = new SubService();
const stripe = new StripePayment();
export async function POST(request, {params}) {

    const remaining = await rateLimitUnSub.removeTokens(1)
    if (remaining < 0) { return NextResponse.json({ success: false }, { status: 429, error: "Too Many Request" }); }
    if (!await isAuthorization(request)) return NextResponse.json({ message: "Unauthorized", }, { status: 401 });
    const userId = getUserIdAfterAuthorize(request);
    // accept scanLink
    // handle error later.
    const reqBody = await request.json()
    const {subId} = Zod.subSchema.parse(reqBody);
    try {
        
        await stripe.deleteStripeSubById(subId)

        return NextResponse.json({ success: true, data: [] }, { status: 200 });
    } catch (error) {
        return centralError(NextResponse, error);
    }
}
