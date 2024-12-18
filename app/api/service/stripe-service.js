import { db } from "@/app/lib/db";
import { StripeServiceError } from "@/app/lib/error-handler/app-errors";
import StripePayment from "@/app/lib/stripe/Stripe";

class StripeService {
  async deleteSubById(subId) {
    try {
      await db.$transaction(async (tx) => {
        const deleteSub = await tx.Subscription.delete({
          where: {
            sub_id: subId,
          },
        });

        await tx.User.update({
          where: {
            id: deleteSub?.user_id,
          },
          data: {
            account_type: "free",
          },
        });
      });

      return true;
    } catch (error) {
      //status code 500 by default
      throw new StripeServiceError(error);
    }
  }
  async createStripePayment(userId, amount, accountType = "pro") {
    try {
      await db.$transaction(async (tx) => {
        // Code running in a transaction...
        const newUser = await tx.User.update({
          where: {
            id: userId,
          },
          data: {
            account_type: accountType,
          },
        });
        await tx.Credit.create({
          data: {
            user_id: userId,
            amount: amount,
            credit_type: accountType,
          },
        });
      });
    } catch (error) {
      throw new StripeServiceError(error);
    }
  }

}
export default StripeService;
