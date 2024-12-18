import { db } from "@/app/lib/db";
import { UserServiceError } from "@/app/lib/error-handler/app-errors";
import constants from "@/app/lib/constants";

const { STATUS_CODES } = constants
class UserService{
    async fetchProAccountById(userId){
        try {
            let email = await db.User.findUnique({
                where: {
                    id: userId
                },
                select: {
                    account_type: true
                }
            })
            return email
        } catch (error) {
            throw new UserServiceError(error, STATUS_CODES.INTERNAL_ERROR)
        }
    }
    async fetchEmailById(userId) {
        try {
            let email = await db.User.findUnique({
                where: {
                    id: userId
                },
                select:{
                    email:true,
                    id:true
                }
            })
            return email
        } catch (error) {
            throw new UserServiceError(error, STATUS_CODES.INTERNAL_ERROR)
        }
    }
    async fetchUserDataById(userId){
        try {
            let accountType = await db.User.findUnique({
                where: {
                    id:userId
                },
                select:{
                    account_type:true,
                    subscriptions:{
                        select:{
                            sub_id:true
                        }
                    }
                }
            })  
            return accountType     
        } catch (error) {
            throw new UserServiceError(error, STATUS_CODES.INTERNAL_ERROR)
        }
    }
    async limitFreeAcount(userId){
        try {
            let accountType = await db.User.findUnique({
                where: {
                    id:userId
                },
           
                 
            })  
            return accountType     
        } catch (error) {
            throw new UserServiceError(error, STATUS_CODES.INTERNAL_ERROR)
        }
    }

}
export default UserService;
