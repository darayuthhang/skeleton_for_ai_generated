import axios from 'axios';

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
class IdeogramService {
    constructor(
   
      apiKey
    ) {
    
        // this._url = apiUrl;
      this.apiKey = apiKey;
      this.url = `https://api.ideogram.ai/generate`
     
    }


    async getLogo(userPrompts) {
      const options = {
        method: 'POST',
        url: this.url,
        headers: {
          'Api-Key': `${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        timeout: 30000, // 30 seconds timeout
        data: {
          image_request: {
            prompt: userPrompts,
            aspect_ratio: 'ASPECT_1_1',
            model: 'V_2',
            magic_prompt_option: 'AUTO',
          },
        },
      };
    
      try {
        console.log("Start Ideogram API call:", new Date().toISOString());
    
        
        const response = await axios(options);
        console.log(response);
        
        console.log("Ideogram API response received:", response.data);
        return response.data;
      } catch (error) {
        if (error.code === 'ECONNABORTED') {
          console.error('Request to Ideogram API timed out');
        } else if (error.response) {
          // The request was made and the server responded with a status code outside of 2xx
          console.error('Ideogram API responded with error:', error.response.status, error.response.data);
        } else if (error.request) {
          // The request was made but no response was received
          console.error('No response received from Ideogram API:', error.request);
        } else {
          // Something happened in setting up the request
          console.error('Error setting up request to Ideogram API:', error.message);
        }
    
        throw new Error(`Ideogram API error: ${error.message}`);
      }
    }
    





 
}
export default IdeogramService;
