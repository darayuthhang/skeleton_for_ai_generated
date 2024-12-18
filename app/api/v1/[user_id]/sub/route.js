import { NextRequest, NextResponse } from "next/server";
import SubService from "@/app/api/service/sub-service";
import { centralError } from "@/app/lib/error-handler/central-error";
import { rateLimitSub } from "@/app/api/config/limiter";
import { isAuthorization } from "@/app/api/apiMiddleware/checkAuthorization";
import { getUserIdAfterAuthorize } from "@/app/api/apiMiddleware/checkAuthorization";
import SearchRequestService from "@/app/api/service/search-request-service";
import { db } from "@/app/lib/db";
export const maxDuration = 25;
export const dynamic = 'force-dynamic';


const subService = new SubService();
const searchService = new SearchRequestService();

export async function GET(request, {params}) {

    const remaining = await rateLimitSub.removeTokens(1)
    if (remaining < 0) { return NextResponse.json({ success: false }, { status: 429, error: "Too Many Request" }); }
    if (!await isAuthorization(request)) return NextResponse.json({ message: "Unauthorized", }, { status: 401 });
    const userId = getUserIdAfterAuthorize(request);
    // accept scanLink
    // handle error later.
    // const reqBody = await request.json()
  
    try {
        let result = await db.OneTimePayment.findFirst({
            where: { user_id: userId },
            select: {
              has_access: true,
            },
          });
        
            let searchRequest = await searchService.findByUserId(userId);
   
            
        // let imageUrlAccess = await db.ImageUrl.findFirst({
        //     where: { user_id: userId },
        //     select: {
        //       has_access: true,
        //     },
        //   });

        //   const hasAccess = imageUrlAccess?.has_access || false;

        return NextResponse.json({ success: true, data: result, 
            remainRequest:searchRequest?.remaining_requests }, { status: 200 });
    } catch (error) {
        return centralError(NextResponse, error);
    }
}
