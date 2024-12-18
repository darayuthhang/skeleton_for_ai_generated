import { NextRequest, NextResponse } from "next/server";
import { centralError } from "@/app/lib/error-handler/central-error";
import { isAuthorization } from "@/app/api/apiMiddleware/checkAuthorization";
import { getUserIdAfterAuthorize } from "@/app/api/apiMiddleware/checkAuthorization";
import { rateLimitFeedBck } from "@/app/api/config/limiter";
import { db } from "@/app/lib/db";
import Zod from "@/app/lib/zod/Zod";
import UserService from "@/app/api/service/user-service";



export const maxDuration = 25;
// Opt out of caching; every request should send a new event
// export const dynamic = 'force-dynamic'; //this only

const userService = new UserService();

export async function POST(request, { params }) {
  const remaining = await rateLimitFeedBck.removeTokens(1);
  if (remaining < 0) {
    return NextResponse.json(
      { success: false },
      { status: 429, error: "Too Many Request" }
    );
  }
  if (!(await isAuthorization(request)))
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  const userId = getUserIdAfterAuthorize(request);
  const reqBody = await request.json();
 const {  
    promptType,
    feedCount,
imageUrl} = reqBody;
  try {
    let res = await userService.fetchEmailById(userId);
    const userEmail = res?.email;
    const newCollectData = await db.CollectData.create({
        data: {
          email: userEmail,
          prompt_type: promptType, // Can be null or a string
          feed_count: parseInt(feedCount),
          image_url:imageUrl
          
          // Prisma automatically handles `created_at` and `updated_at` if you set default values
        },
      });

   
    return NextResponse.json(
      {
        success: true,
        // inngestId: id,
      },
      { status: 200 }
    );
  } catch (error) {
    return centralError(NextResponse, error);
  }
}
