import { inngest } from "./client";
import S3Service from "@/app/api/service/s3-service";
import OpenAiService from "@/app/api/service/openai-service";
import axios from "axios";
//by default, inngest will retry 3 times before fail
import { v4 as uuidv4 } from "uuid";
import { db } from "@/app/lib/db";
import Replicate from "replicate";
import constants from "@/app/lib/constants";
import { combineCategoryForRuningTheAiTopopulateOnly, popularCartoonCharacters } from "@/app/lib/app-constant";
import { stringToSlug, removeDots, addDashToSpace } from "@/app/lib/app-helpers";

const openAiService = new OpenAiService(
  process.env.OPEN_AI_ORGANIZATION,
  process.env.OPEN_AI_PROJECT_ID,
  process.env.OPEN_AI_API_KEY
);
const s3Service = new S3Service();

const replicate = new Replicate({ auth: process.env.REPLICATE_API_TOKEN });

// Helper function to read stream data
async function readStreamToBuffer(stream) {
  const reader = stream.getReader();
  const chunks = [];
  let done, value;

  while (!done) {
    ({ done, value } = await reader.read());
    if (value) chunks.push(value);
  }

  return Buffer.concat(chunks);
}

export const create = inngest.createFunction(
  {
    id: "color-page/create",
  },
  { event: "color-page/create" },
  async ({ event, step }) => {

    /**
     * @NOTICE : SINCE IT GENERATE STH SLIGHT DIFFERENT I WANT IT TO BE DIFFERENT
     * @NOTICE : MAYBE COME UP WITH STH CREATIVE NEXT TIME.
     */
    const assistant = `You are expert in extract important text from prompt that can rank for seo.`;
    const gptModel = "gpt-4o-mini";
    
    const events = await Promise.all(combineCategoryForRuningTheAiTopopulateOnly.map(async (category) => {
      const prompt = `${category} coloring page`;

      const gptPrompt = `Extract important text from prompt ${prompt} that make sense, 
       avoid text coloring page, 
       and return with meta description and description that rank well for seo
       and return in JSON format below: {
       prompts:"",
       meta_description:"",
       description:"",
       alt_text:"",
       short_prompts_for_index_page:""
       }`;

      let gptResponse = await openAiService.sendToGptAPiChat(
        gptPrompt,
        assistant,
        gptModel
      );

      let userPrompts = JSON.parse(gptResponse);
      

      const shortPromptforIndexPage = userPrompts?.short_prompts_for_index_page + " coloring page";
      
            const promptForGenerated = userPrompts?.prompts;

      const promptForSeo = userPrompts?.prompts + " coloring page";
      
      /**
       * @BECAREFUL HERE
       */

      /**
       * @DOTHIS WHEN YOU WANT TO USE RANDOM PROMPT
       */
      const domainSlug = stringToSlug(shortPromptforIndexPage + `-${uuidv4()}`);

     /**
      * @DOTHIS WHEN YOU INITIA START RUN [category] coloring page
      */
      // const domainSlug = stringToSlug(prompt); 

      const titleAndHeading = removeDots(promptForSeo);
      const description = userPrompts?.description;
      const metaDescription = userPrompts?.meta_description;
      const altText = userPrompts?.alt_text;

      const newPrompt = `Generate a black-and-white coloring page of ${promptForGenerated}. The background must be white color.`;
      const input = {
        prompt: newPrompt,
        go_fast: true,
        megapixels: "1",
        num_outputs: 1,
        aspect_ratio: "1:1",
        output_format: "png",
        output_quality: 80,
        num_inference_steps: 4,
      };
      const replicateOutput = await replicate.run(
        "black-forest-labs/flux-schnell",
        { input }
      );
      const imageBuffer = await readStreamToBuffer(replicateOutput[0]);
      const fileName = await s3Service.uploadFileFreeFolders3WithBuffer(imageBuffer);
      //free folder
      const imageUrl = `https://${process.env.S3_BUCKET_NAME}.s3.amazonaws.com/free/${fileName}`;

      await db.FreeColorPageImageUrl.create({
        data: {
          title_and_heading: titleAndHeading,
          description,
          meta_description: metaDescription,
          domain_slug: domainSlug,
          image_url: imageUrl,
          alt_text: altText,
          category: category.toLowerCase(),
        },
      });
    }));

    return "done";
  }
);


