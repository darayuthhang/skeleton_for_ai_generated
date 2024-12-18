import { db } from "@/app/lib/db";
class ChatGptPromptService {
    async findByUserId(userId) {
        try {
            //this will return null if data does not exist.
            const gptPrompt = await db.GptPrompt.findMany({
                where:{
                    user_id:userId
                },
                select:{
                    image_url:true,
                    prompt:true,
                    created_at:true
                }
            })
            return gptPrompt;
        } catch (error) {
            //status code 500 by default
            throw new ChatGptPromptError(error)
        }
    }
  
  
}
export default ChatGptPromptService;
