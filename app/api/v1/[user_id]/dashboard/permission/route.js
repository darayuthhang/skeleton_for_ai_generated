import { NextRequest, NextResponse } from "next/server";
import SubService from "@/app/api/service/sub-service";
import { centralError } from "@/app/lib/error-handler/central-error";
import { isAuthorization } from "@/app/api/apiMiddleware/checkAuthorization";
import { getUserIdAfterAuthorize } from "@/app/api/apiMiddleware/checkAuthorization";
import SearchRequestService from "@/app/api/service/search-request-service";
import { rateLimitPromptDashboard } from "@/app/api/config/limiter";
import { db } from "@/app/lib/db";

export const maxDuration = 25;
// Opt out of caching; every request should send a new event
// export const dynamic = 'force-dynamic'; //this only

const subService = new SubService();
const searchService = new SearchRequestService();
// const s3Service = new S3Service();
// const openAiService = new OpenAiService(
//   process.env.OPEN_AI_ORGANIZATION,
//   process.env.OPEN_AI_PROJECT_ID,
// process.env.OPEN_AI_API_KEY );

export async function POST(request, { params }) {
  const remaining = await rateLimitPromptDashboard.removeTokens(1);
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

  const {checked} = reqBody;
  
  try {
     await db.$transaction(async (tx) => {
      await tx.Permission.upsert({
        where: {
          user_id: userId,
        },
        update: {
          is_private: checked,
          updated_at: new Date(),
        },
        create: {
          is_private: checked,
          user: {
            connect: {
              id: userId,
            },
          },
        },
      });


      let imageResult = await tx.ImageUrl.findFirst({
        where: { user_id: userId },
        select:{image_url:true}
      })

      const imageUrlExist = imageResult?.image_url
      
      if(imageUrlExist){
        let res = await tx.ImageUrl.updateMany({
          where: { user_id: userId },
          data: {
            has_access: checked, // Assuming 'checked' is a boolean value
            updated_at: new Date(),
          },
        });  
      }
  
    });

    return NextResponse.json(
      {
        success: true,
   
      },
      { status: 200 }
    );
  } catch (error) {
    return centralError(NextResponse, error);
  }
}
