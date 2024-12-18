import OpenAI from "openai";

import { OpenAIServiceNotFoundError } from "@/app/lib/error-handler/app-errors";
// const image = await this._openai.images.generate(
//   { 
//       model: "dall-e-3", 
//       prompt: prompt ,
//       response_format: "b64_json",
//       size: "1024x1024",
//       quality:"hd"
//   });
// return image?.data;
// } catch (error) {
class OpenAiService {
    constructor(
      organizationId,
      projectId,
      apiKey
    ) {
    
        // this._url = apiUrl;
      this._openai = new OpenAI({
        organization: organizationId,
        project:`${projectId}`,
        apiKey:apiKey
      })
     
    }

  async sendToGptAPiChatVisionWithImageUrl(url, promptMessage, model = "gpt-4o-mini") {
    // const modelApi = "gpt-4o-mini";
    try {
      const completion = await this._openai.chat.completions.create({
        model: model.toLowerCase(),
        response_format: { type: "json_object" },
        messages: [
          // {
          //   role: "system",
          //   content: assistant
          // },
          {
            role: "user",
            content: [
              { type: "text", text: promptMessage },
              {
                type: "image_url",
                image_url: {
                  url: url,
                  detail: "low",
                },
              },
            ],
          },
        ],
      });

      return completion.choices[0]?.message?.content;
    } catch (error) {
      throw new OpenAIServiceNotFoundError(error, error?.status);
    }
  }

    async sendToGptAPiChat(prompt, assistant, modelFour="gpt-4o") {

    
      try {
          const completion = await this._openai.chat.completions.create({
              messages: [{"role": "system", "content": assistant},
                          {"role": "user", "content": prompt}],
           
              model: modelFour,
              response_format: { type: "json_object" },
            });
          
            return completion.choices[0]?.message?.content;
      } catch (error) {
          throw new OpenAIServiceNotFoundError(error, error?.status);
      }
  }
  async sendToGptToGetMainPoint(prompt, assistant) {
    const modelFour = "gpt-4o-mini";
  
    try {
        const completion = await this._openai.chat.completions.create({
            messages: [
                        {"role": "user", "content": prompt}],
         
            model: modelFour,
            response_format: { type: "json_object" },
          });
        
          return completion.choices[0]?.message?.content;
    } catch (error) {
        throw new OpenAIServiceNotFoundError(error, error?.status);
    }
}


  async sendToGptApiChatWithNoAssistant(prompt, model) {
  
    try {
        const completion = await this._openai.chat.completions.create({
            messages: [{"role": "user", "content": prompt}],
         
            model: model,
          
          });
        
          return completion.choices[0]?.message?.content;
    } catch (error) {
        throw new OpenAIServiceNotFoundError(error, error?.status);
    }
}
  /**
   * 
   * @param {*} prompt 
   * @param {*} size 
   * @param {*} n this parraele request up to 10 request
   * @returns 
   */
  async sendToDalle3(prompt, size="1024x1024", n=1) { 
    let model = "dall-e-3";
    
    try {
       const response = await this._openai.images.generate(
          { 
              model: "dall-e-3", 
              prompt: prompt ,
              // response_format: "b64_json", //this for binary
              size: size,
              n
              // quality:"hd"
          });

      let imageUrl = response?.data[0]?.url;
      let revisePrompt = response?.data[0]?.revised_prompt;

      return { imageUrl, revisePrompt}
   
    } catch (error) {
        throw new OpenAIServiceNotFoundError(error, error?.status);
    }
}

async sendParallelRequest(prompt, size = "1024x1024", n = 6) { 

    
  try {
      // Create an array of promises for the parallel requests
      const requests = Array(n).fill().map(() =>
        this._openai.images.generate({
          model: "dall-e-3",
          prompt: prompt,
          size: size,
          n: 1, // Request one image per call
        })
      );
  
      // Wait for all requests to complete
      const responses = await Promise.all(requests);
  
      // Collect the image URLs from the responses
      const imageUrls = responses.map(response => response.data[0].url);
  
      return imageUrls
      // return image?.data;
  } catch (error) {
      throw new OpenAIServiceNotFoundError(error, error?.status);
  }
}
 
}
export default OpenAiService;
