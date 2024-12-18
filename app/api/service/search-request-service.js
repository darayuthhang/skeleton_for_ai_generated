import { db } from "@/app/lib/db";
import { SearchRequestServiceError } from "@/app/lib/error-handler/app-errors";
class SearchRequestService {
    async checkCreditExist(userId, remainRequest) {
        try {
            //this will return null if data does not exist.
            const searchRequest = await db.SearchRequest.create({
                data:{
                    user_id:userId,
                    remaining_requests:remainRequest
                }
            })
            return searchRequest;
        } catch (error) {
            //status code 500 by default
            throw new SearchRequestServiceError(error)
        }
    }
    async findByUserId(userId, remainRequest) {
        try {
            //this will return null if data does not exist.
            const searchRequest = await db.SearchRequest.findFirst({
                where:{
                    user_id:userId
                }
            })
      
            
            return searchRequest;
        } catch (error) {
            return 0;
            //status code 500 by default
            // throw new SearchRequestServiceError(error)
        }
    }
    async findRemainRequestByUserId(userId) {
        try {
            //this will return null if data does not exist.
            const searchRequest = await db.SearchRequest.findFirst({
                where:{
                    user_id:userId
                },
                select:{
                    remaining_requests:true
                }
            })
            return searchRequest;
        } catch (error) {
            //status code 500 by default
            throw new SearchRequestServiceError(error)
        }
    }
    async decreaseRemainingByUserId(userId, remainRequest) {
        try {
          
       
            //this will return null if data does not exist.
            const updatedRequest = await db.SearchRequest.update({
                where: {
                  user_id: userId,
                },
                data: {
                  remaining_requests: {
                    decrement: remainRequest,  // Decrement remaining_requests by 1
                  },
                  updated_at: new Date(),  // Update the updated_at field
                },
              });
            return true;
        } catch (error) {
            //status code 500 by default
            throw new SearchRequestServiceError(error)
        }
    }
}
export default SearchRequestService;
