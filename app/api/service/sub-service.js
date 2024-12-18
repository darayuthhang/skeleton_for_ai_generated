import { db } from "@/app/lib/db";
import { SubServiceError } from "@/app/lib/error-handler/app-errors";
import constants from "@/app/lib/constants";
class SubService {

    async createSub(
        userId, 
        stripeCustomerId, 
        stripePriceId, 
        plan,
        hasAccess,
        email,
        subscriptionId,
        remainRequest){
        try {
            const result = await db.$transaction(async (trx) => {
                const subscription = await trx.Subscription.create({
                    data: {
                        user_id: userId,
                        stripe_customer_id: stripeCustomerId,
                        stripe_price_id: stripePriceId,
                        plan: plan,
                        has_access: hasAccess,
                        stripe_customer_email: email,
                        stripe_sub_id: subscriptionId
                    },
                });
                const updatedRequest = await trx.SearchRequest.update({
                    where: {
                        user_id: userId,
                    },
                    data: {
                        remaining_requests: {
                            increment: remainRequest,  // Increment the remaining_requests field by remainRequest
                        },
                        updated_at: new Date(),  // Ensure the updated_at field is also updated
                    },
                });

                return true;
                /**
                 * @Justupdateit because
                 * each time user sign up
                 * the sytem will create one remain request
                 */
            });
        } catch (error) {
            throw new SubServiceError(error);
        }
    }
    async checkSubByUserId(
        userId, 
      ){
        try {
            let sub = await db.Subscription.findFirst({
                where: {
                    user_id: userId
                },
                select:{
                    plan:true,
                    id:true,
                    has_access:true
                }
            })
            return sub
        } catch (error) {
            throw new SubServiceError(error);
        }
       
    }
    async fetchSubByUserId(
        userId, 
      ){
        try {
            let sub = await db.Subscription.findFirst({
                where: {
                    user_id: userId
                },
                select:{
                    plan:true,
                    id:true,
                    has_access:true,
                    stripe_sub_id:true,
                    

                }
            })
            return sub
        } catch (error) {
            throw new SubServiceError(error);
        }
       
    }
    async updateSub(
        userId, 
        stripeCustomerId, 
        stripePriceId, 
        plan,
        hasAccess,
        email,
        subscriptionId){
        try {
            const subscription = await db.Subscription.update({
                where:{
                    user_id:userId
                },
                data: {
                    stripe_customer_id: stripeCustomerId,
                    stripe_price_id: stripePriceId,
                    plan: plan,
                    has_access:hasAccess,
                    stripe_customer_email:email,
                    stripe_sub_id:subscriptionId
                },
              });
        } catch (error) {
            throw new SubServiceError(error);
        }
    }

    async updateHasAccessByCustomerId(
      
        stripeCustomerId,
        hasAccess 
       ){
        try {
            const subscription = await db.Subscription.update({
                where:{
                    stripe_customer_id:stripeCustomerId
                },
                data: {
                   
                    has_access:hasAccess,
                   
                },
              });
        } catch (error) {
            throw new SubServiceError(error);
        }
    }
    async deleteByCustomerId(
      
        stripeCustomerId,
       ){
        try {
            const subscription = await db.Subscription.delete({
                where:{
                    stripe_customer_id:stripeCustomerId
                },
               
              });
        } catch (error) {
            throw new SubServiceError(error);
        }
    }
}
export default SubService;
