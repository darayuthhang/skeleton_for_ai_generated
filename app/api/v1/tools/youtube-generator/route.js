import { NextRequest, NextResponse } from "next/server";
import { centralError } from "@/app/lib/error-handler/central-error";
import { isAuthorization } from "@/app/api/apiMiddleware/checkAuthorization";
import { getUserIdAfterAuthorize } from "@/app/api/apiMiddleware/checkAuthorization";
import { rateLimitNameGenerator } from "@/app/api/config/limiter";
import Zod from "@/app/lib/zod/Zod";
import OpenAiService from "@/app/api/service/openai-service";

export const maxDuration = 25;
// Opt out of caching; every request should send a new event
// export const dynamic = 'force-dynamic'; //this only

// const s3Service = new S3Service();
const openAiService = new OpenAiService(
  process.env.OPEN_AI_ORGANIZATION,
  process.env.OPEN_AI_PROJECT_ID,
  process.env.OPEN_AI_API_KEY
);



export async function POST(request, { params, searchParams }) {
  const remaining = await rateLimitNameGenerator.removeTokens(1);
  if (remaining < 0) {
    return NextResponse.json(
      { success: false },
      { status: 429, error: "Too Many Request" }
    );
  }

  const reqBody = await request.json();
  const { promptRequired, variants,toggle } = Zod.youtubeGeneratorSchema.parse(reqBody);
  

  let prompts = '', result = "";
  if(toggle){
    //include has tag 
    prompts =`Generate me ${variants} youtube description based on ${promptRequired}.
    Please also include the hashtages.
    Please return data in the JSON format below:
    { "data": [] }`
  }else{
     prompts = `Generate me ${variants} youtube description based on ${promptRequired}
    Please return data in the JSON format below:
    { "data": [{description:""}] }`;
  }
  try {
    const model = `gpt-4o-mini`;
    const assistant = `You are a helpful assistant that specializes in generating unique and creative youtube description.`;
  
    result = await openAiService.sendToGptAPiChat(prompts, assistant, model);


    return NextResponse.json(
      {
        success: true,
        data: JSON.parse(result),
      },
      { status: 200 }
    );
  } catch (error) {
    return centralError(NextResponse, error);
  }
}


