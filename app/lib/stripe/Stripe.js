import { loadStripe } from '@stripe/stripe-js';
import Stripe from 'stripe';
import axios from '@/app/lib/axios/Axios';
import constants from '../constants';
const stripePromise = loadStripe(`${process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}`)
class StripePayment {

    handleCheckout = async (amount, typeOfAccount, promotekitReferral) => {
      
        let accountType = this.getAccountType(typeOfAccount);
        try {
            const data = { amount, accountType, promotekitReferral }
            const stripe = await stripePromise;
            const response = await axios.post('/payment/checkout', data);
            const result = await stripe.redirectToCheckout({
                sessionId: response?.data?.sessionId,
            });

            if (result.error) {
                // Handle error herses
            }
        } catch (error) {
            console.log(error);
        }

    };
    getAccountType(typeOfAccount){
        let accountType = "";
         if(typeOfAccount === constants.PRICING.one_time_entry){
            accountType = constants.PRICING.one_time_entry
        }else if(typeOfAccount === constants.PRICING.beginner){
            accountType = constants.PRICING.beginner
        }else if(typeOfAccount === constants.PRICING.one_time_pay_as_u_go){
            accountType = constants.PRICING.one_time_pay_as_u_go
        }else if(typeOfAccount === constants.PRICING.one_time_starter){
            accountType = constants.PRICING.one_time_starter

        }
        return accountType
    }
    createSessionCheckout = async (
        pricingItem,
        successUrl,
        cancelUrl,
        paymentMode,
        userId,
        accountType,
        mode="subscription",
        referral
    ) => {
        try {
           
            const stripe = new Stripe(`${process.env.STRIPE_SECRET_KEY}`);
            //const stripe = await loadStripe(NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
            const session = await stripe.checkout.sessions.create({
                client_reference_id: JSON.stringify({ userId, accountType }),
                payment_method_types: ['card'],
          
                line_items: [{
                    price: `${pricingItem}`, // Use your Stripe price ID here
                    quantity: 1,
                }],
                mode: mode,
                success_url: successUrl,
                cancel_url: cancelUrl,
            });;
            return session.id;
        } catch (error) {
            throw new Error(error);
        }

    }
    async deleteStripeSubById(subId){
        try {
            const stripe = new Stripe(`${process.env.STRIPE_SECRET_KEY}`);
            await stripe.subscriptions.cancel(subId);
            return true;
        } catch (error) {
            throw new Error(error);
        }
    }
  
}

export default StripePayment;
