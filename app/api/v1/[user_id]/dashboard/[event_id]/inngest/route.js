import { NextRequest, NextResponse } from "next/server";
import { isAuthorization } from "@/app/api/apiMiddleware/checkAuthorization";
import { getUserIdAfterAuthorize } from "@/app/api/apiMiddleware/checkAuthorization";
import { centralError } from "@/app/lib/error-handler/central-error";
export const maxDuration = 25;


export async function GET(request, {params}) {

    // const remaining = await rateLimitSub.removeTokens(1)
    // if (remaining < 0) { return NextResponse.json({ success: false }, { status: 429, error: "Too Many Request" }); }
    if (!await isAuthorization(request)) return NextResponse.json({ message: "Unauthorized", }, { status: 401 });
    const userId = getUserIdAfterAuthorize(request);
    // accept scanLink
    // handle error later.
    // const reqBody = await request.json()
    const eventId = params?.event_id

    let url = `https://api.inngest.com/v1/events/${eventId}/runs`
    if (process.env.NEXT_PUBLIC_LOCAL_STAGE === 'local'){
         url = `http://127.0.0.1:8288/v1/events/${eventId}/runs`
    }

    const options = {
        method: 'GET',
        headers: {
          'x-inngest-env': '',
          Accept: 'application/json',
          Authorization: `Bearer ${process.env.INNGEST_SIGNING_KEY}`,
        }
      };
    
    try {
        const response = await fetch(url, options);
        const json = await response.json();
        
        
        return NextResponse.json({ success: true, data:json.data}, { status: 200 });
    } catch (error) {
        return centralError(NextResponse, error);
    }
}