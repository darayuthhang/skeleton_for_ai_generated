import { db } from "@/app/lib/db";
import { CreditServiceError } from "@/app/lib/error-handler/app-errors";
import constants from "@/app/lib/constants";
class CreditService {
    async checkCreditExist(userId, creditType) {
        try {
            //this will return null if data does not exist.
            const credit = await db.Credit.findFirst({
                where:{
                    user_id:userId,
                    credit_type:creditType
                },
                select:{
                    amount:true,
                    credit_type:true,
                   
                    id:true
                }
            })
            return credit;
        } catch (error) {
            //status code 500 by default
            throw new CreditServiceError(error)
        }
    }
    async getCredit(userId, creditType) {
        try {
            //this will return null if data does not exist.
            const credit = await db.Credit.findFirst({
                where: {
                    user_id: userId,
                    credit_type:creditType
                },
                select: {
                    amount: true,
                    credit_type:true,
                
                }
            })
            return credit;
        } catch (error) {
            //status code 500 by default
            throw new CreditServiceError(error)
        }
    }
    async getCreditByUserId(userId) {
        try {
            //this will return null if data does not exist.
            const credit = await db.Credit.findFirst({
                where: {
                    user_id: userId,
                },
                select: {
                    amount: true,
                    credit_type:true,
                   
                }
            })
            return credit;
        } catch (error) {
            //status code 500 by default
            throw new CreditServiceError(error)
        }
    }
    async updateCreditAmount(id, amount, creditType) {
     
        try {
            const credit = await db.Credit.update({
                where: {
                    id: id,
                    credit_type: creditType
                },
                data: {
                    amount: amount,
                    updated_at: new Date(),
                }
            })
            return credit;
        } catch (error) {
            //status code 500 by default
            throw new CreditServiceError(error)
        }
    }
    async createCredit(userId, creditType, amount=0,) {
        try {
            await db.Credit.create({
                data: {
                  user_id: userId,
                  amount: amount,
                  credit_type: creditType,
                },
              });
        } catch (error) {
          throw new CreditServiceError(error);
        }
      }

      async isAccount(userId, accountType) {
        try {
            const resAccountType = await db.Credit.findFirst({
                where: {
                    user_id: userId,
                    credit_type:accountType
                },
                select: {
                    amount: true,
                    credit_type:true,
                   
                }
            })
            const expertAccount = resAccountType && resAccountType?.credit_type === constants.ACCOUNT_TYPE_EXPERT;
  
            /**
             * We can validate some more accounts here.
             */
            let account = "free";
            if (expertAccount) {
              account = constants.ACCOUNT_TYPE_EXPERT;
            }
            return account;
        } catch (error) {
          throw new CreditServiceError(error);
        }
      }

}
export default CreditService;
