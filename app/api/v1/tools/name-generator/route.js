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

const numberOfGenerate = "26";

export async function POST(request, { params, searchParams }) {
  const remaining = await rateLimitNameGenerator.removeTokens(1);
  if (remaining < 0) {
    return NextResponse.json(
      { success: false },
      { status: 429, error: "Too Many Request" }
    );
  }

  const reqBody = await request.json();
  const { promptRequired } = Zod.nameGeneratorSchema.parse(reqBody);

  const promptGetMainPoint = `Extract the main keywords from the sentence: ${promptRequired}.
   Keep them concise and relevant 
   Please return data in json format below:
   {data:""}
   if you think prompts is spamming, 
   please return error data in json format below:
   {data : {error:"", isSpam:true}} .

   `;
  const assistantMainPoint = `You are assistant that great at extract main points.`;
  /**
  * 


AI Response:

coffee shop
students
Step 2: Prompt to Generate Using Keywords
"Using the keywords 'coffee shop' and 'students,' generate 5 unique and creative business names for a student-focused coffee shop
  * 
  */
  let parseData,
    result = "";

  try {
    // Send the prompt to extract main points
    const getMainPointRes = await openAiService.sendToGptToGetMainPoint(
      promptGetMainPoint,
      assistantMainPoint
    );

    if (getMainPointRes) {
      try {
        parseData = JSON.parse(getMainPointRes);
      } catch (error) {
        console.error("Error parsing getMainPointRes:", error);
        throw new Error("Failed to parse the main point response.");
      }
    }
    // Parse the response

    if (parseData?.data?.isSpam) {
      console.warn("Please do not spam it");
      throw new Error("Please do not spam it.");
    }
    // Check if parseData and required data exist
    else if (parseData?.data) {
      const keywords = parseData.data;

      const prompts = `Using the keywords ${keywords} to generate ${numberOfGenerate} unique and creative business names. 
            Please return data in the JSON format below:
            { "data": [] }`;

      const assistant = `You are a helpful assistant that specializes in generating unique and creative business names.`;
      const model = `gpt-4o-mini`;

      // Send the request to generate business names
      result = await openAiService.sendToGptAPiChat(prompts, assistant, model);
    } else {
      console.warn("No valid data found in parseData:", parseData);
      throw new Error("Main point extraction returned no keywords.");
    }

    // console.log(res);

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

export async function GET(request, { params }) {
  const remaining = await rateLimitNameGenerator.removeTokens(1);
  if (remaining < 0) {
    return NextResponse.json(
      { success: false },
      { status: 429, error: "Too Many Request" }
    );
  }

  const reqUrl = request.url;
  const { searchParams } = new URL(reqUrl);
  const category = searchParams.get("category") || null;

  let result = "";

  try {
    if (category) {
      const prompts = `Using the keywords ${category} to generate ${numberOfGenerate} unique and creative business names. 
        Please return data in the JSON format below:
        { "data": [] }`;

      const assistant = `You are a helpful assistant that specializes in generating unique and creative business names.`;
      const model = `gpt-4o-mini`;

      // Send the request to generate business names
      result = await openAiService.sendToGptAPiChat(prompts, assistant, model);
    }

    return NextResponse.json(
      {
        success: true,
        data: result ? JSON.parse(result) : [],
      },
      { status: 200 }
    );
  } catch (error) {
    return centralError(NextResponse, error);
  }
}
