import { inngest } from "./client";
import S3Service from "@/app/api/service/s3-service";
import OpenAiService from "@/app/api/service/openai-service";
import axios from "axios";
//by default, inngest will retry 3 times before fail
import { stringToSlug } from "@/app/lib/3d-logo-helpers";
import { v4 as uuidv4 } from "uuid";
import { db } from "@/app/lib/db";
import EmailService from "../service/email-service";
import Replicate from "replicate";
import constants from "@/app/lib/constants";
import { LOGO_TYPE } from "@/app/lib/3d-logo-constant";
import { INDUSTRY_ICONS } from "@/app/lib/3d-logo-constant";

const openAiService = new OpenAiService(
  process.env.OPEN_AI_ORGANIZATION,
  process.env.OPEN_AI_PROJECT_ID,
  process.env.OPEN_AI_API_KEY
);
const s3Service = new S3Service();
const emailService = new EmailService();

const replicate = new Replicate({ auth: process.env.REPLICATE_API_TOKEN });

// Helper function to save image data in the database
async function saveImageData({
  userId,
  userPrompt,
  hasAccess,
  threeDModal,
  industry,
  domainSlug,
  imageUrl,
  category
}) {
  await db.$transaction(async (tx) => {
    await tx.ImageUrl.create({
      data: {
        prompts: userPrompt,
        user_id: userId,
        has_access: hasAccess,
        three_d_model: threeDModal,
        industry,
        category: category,
        domain_slug: domainSlug,
        image_url: imageUrl,
      },
    });

    await tx.SearchRequest.update({
      where: { user_id: userId },
      data: {
        remaining_requests: { decrement: 1 },
        updated_at: new Date(),
      },
    });
  });
}

// Helper function to build user prompt
function buildUserPrompt({ companyName,logoType, slogan, industry, threeDModal, newBgColor, newColor }) {
  let userPrompts = "";
  // const adj = `a beautiful, professional, and stunning`
  // const adj = `an elegant and visually appealing `;
  let adj = '';

  // const test = `Create a surreal advertisement poster for a fictional time travel agency.
  //  The background should depict a swirling vortex of clock faces and historical landmarks from different eras. 
  //  In the foreground, place large, bold text that reads “CHRONO TOURS: YOUR PAST IS OUR FUTURE” in a retro-futuristic font. 
  //  The text should appear to be partially disintegrating into particles that are being sucked into the time vortex.
  //  Include smaller text at the bottom with fictional pricing and the slogan “History is just a ticket away!”`
  
  // Clearly displaying the company name '${companyName}' and the slogan '${slogan}'. 
  // Ensure both texts are visible and prominent.
  /**
   * 
   * Company Name: "Total Dental Care", 
   * Slogan: "Doctor love it to the moon", 
   * 3D Model: "Levitate with soft shadows",
   *  Color: "Yellow", Background Color: "Gradient from light blue to white"

   */
let typeOfLogo = logoType === LOGO_TYPE.THREE_D_LOGO ? "3D" : "2D";

//has to pick industry, company, slogna (optional) and thredmodel (optional)

if (companyName) {
  if (industry && threeDModal && slogan) { //This is always 3D since it has 3D Model.
    // All fields provided

    userPrompts = `Design a sleek, professional, and modern ${threeDModal} ${typeOfLogo} logo  with primary color of ${newColor} for the ${industry} industry, clearly displaying the company text '${companyName}' and the slogan text '${slogan}'. Ensure both texts are visible and prominent.`;

} else if (industry && slogan) {//This can be 2d and 3d since it has no 3d model.
    // Industry and slogan provided
    
    userPrompts = `Design a sleek, professional, and modern ${typeOfLogo} logo with primary color of ${newColor} for the ${industry} industry, clearly displaying the company text '${companyName}' and the slogan text '${slogan}'. Ensure both texts are visible and prominent.`;

} else if (industry && threeDModal) {
    //This is always 3D since it has 3D Model.
 
    userPrompts = `Design a sleek, professional, and modern ${threeDModal} ${typeOfLogo} logo with primary color of ${newColor} for the ${industry} industry, clearly displaying the company text'${companyName}' and the slogan text '${slogan}'. Ensure both texts are visible and prominent.`;

} else if (industry) { //This can be 2d and 3d since it has no 3d model.
    // Only industry provided
    userPrompts = `Design a sleek, professional, and modern ${typeOfLogo} logo with primary color of ${newColor} for the ${industry} industry, clearly displaying the company text '${companyName}'. Ensure the text is visible and prominent.`;

}
  // if (industry && threeDModal && slogan) { //This is always 3D since it has 3D Model.
  //     // All fields provided

  //     userPrompts = `Design a ${threeDModal} ${typeOfLogo} logo with primary color of ${newColor} for the ${industry} industry, clearly displaying the company text '${companyName}' and the slogan text '${slogan}'. Ensure both texts are visible and prominent.`;

  // } else if (industry && slogan) {//This can be 2d and 3d since it has no 3d model.
  //     // Industry and slogan provided
      
  //     userPrompts = `Design a ${typeOfLogo} logo with primary color of ${newColor}, clearly displaying the company text '${companyName}' and the slogan text '${slogan}'. Ensure both texts are visible and prominent.`;

  // } else if (industry && threeDModal) {
  //     //This is always 3D since it has 3D Model.
   
  //     userPrompts = `Design a ${threeDModal} ${typeOfLogo} logo with primary color of ${newColor} for the ${industry} industry, clearly displaying the company text'${companyName}' and the slogan text '${slogan}'. Ensure both texts are visible and prominent.`;

  // } else if (industry) { //This can be 2d and 3d since it has no 3d model.
  //     // Only industry provided
  //     userPrompts = `Design a ${typeOfLogo} logo with primary color of ${newColor} for the ${industry} industry, clearly displaying the company text '${companyName}'. Ensure the text is visible and prominent.`;

  // }
}
  return userPrompts?.trim();
}
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

export const create3dLogo = inngest.createFunction(
  {
    id: "create3dLogo",
    throttle: {
      limit: 600,
      period: "1m",
    },
   
  },
  { event: "3dlogoai/create3dLogo" },
  async ({ event, step }) => {
    const { userId, slogan,newBgColor,newColor,logoType, companyName, industry, threeDModal, hasAccess } =
      event?.data;

    const userPrompt = buildUserPrompt({
      companyName,
      slogan,
      industry,
      threeDModal,
      newBgColor,
      newColor,
      logoType

    });
    
    const keyWordPromise = await step.run("extractKeyword", async () => {
      const inputPrompt = {
        prompt: userPrompt,
        resolution: "1024x1024",
        style_type: "None",
        aspect_ratio: "16:9",
        magic_prompt_option: "Auto"
      };
      const flux = { prompt: userPrompt, prompt_upsampling: true }
      const model = `ideogram-ai/ideogram-v2`
      const fluxModel = "black-forest-labs/flux-1.1-pro"
      const replicateOutput = await  replicate.run(model, {
          input: inputPrompt,
        })
      const domainSlug = stringToSlug(`${industry}-logo-${uuidv4()}`);
      const imageBuffer = await readStreamToBuffer(replicateOutput);
      const fileName = await s3Service.uploadFileToS3WithBuffer(imageBuffer);
      const imageUrl = `https://${process.env.S3_BUCKET_NAME}.s3.amazonaws.com/${constants.folder}/${fileName}`;

      // Parse OpenAI response
      // const parsedData = JSON.parse(openAiOutput);
      return {
        userId,
        userPrompt,
        hasAccess,
        threeDModal,
        industry,
        domainSlug,
        imageUrl,
      };
    });

    
    const loaddb = await step.run("save db", async () => {
      let {
        userId,
        userPrompt,
        hasAccess,
        threeDModal,
        industry,
        domainSlug,
        imageUrl,
      } = keyWordPromise;
      await saveImageData({
        userId,
        userPrompt,
        hasAccess,
        threeDModal,
        industry,
        domainSlug,
        imageUrl,
        category:logoType //category
      });
    });

    
    return {
      imageUrl: keyWordPromise?.imageUrl,
    };

  }
);

  //      const mainKeywordPrompt = `Extract only main keyword from it: ${userPrompt}. Return as JSON: { "data": "" }`;

   //   userPrompts = `Design a ${threeDModal} 3D logo that reads in '${companyName}' text and include smaller text at the bottom with the slogan '${slogan}'. 
    //   Ensure both texts are visible, with primary color of ${newColor}, 
    //   and a cartoon image for a ${industry} industry.
    //  `;
      // userPrompts = `Design ${adj} ${threeDModal} 3D logo with primary color ${newColor} and background color ${newBgColor} tailored for the ${industry} industry. Ensure the company name '${companyName}' and the slogan '${slogan}' are clearly displayed, highly visible, and prominently integrated into the design.`
    //   userPrompts = `Create a ${threeDModal} 3D logo with primary color of ${newColor}. 
    //   The background should depict ${industry} industry with background color ${newBgColor}.
    //  In the foreground, place large, bold text that reads in "${companyName} in a retro-futuristic font."
    //  You must include smaller text at the bottom with the slogan “${slogan}”
    //  `;

          // const [replicateOutput, openAiOutput] = await Promise.all([
      //   replicate.run("black-forest-labs/flux-1.1-pro", {
      //     input: { prompt: userPrompt, prompt_upsampling: true },
      //   }),
      //   openAiService.sendToGptToGetMainPoint(mainKeywordPrompt),
      // ]);