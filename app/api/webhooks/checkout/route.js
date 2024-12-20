// import Cors from "micro-cors";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import Stripe from 'stripe';
import SubService from "../../service/sub-service";
import UserService from "../../service/user-service";
import { db } from "@/app/lib/db";

// import { buffer } from 'micro';
// import Cors from 'micro-cors';
// const cors = Cors({
//     allowMethods: ['POST', 'HEAD'],
// });

import StripeService from "../../service/stripe-service";
import constants from "@/app/lib/constants";


const stripe = new Stripe(`${process.env.STRIPE_SECRET_KEY}`, { apiVersion: '2022-11-15' });
const webhookSecret = `${process.env.STRIPE_WEBHOOK_SECRET}`;

const userService = new UserService();
const stripeService = new StripeService();
const subService = new SubService();



export async function POST(req) {
    const buf = await req.text();
    // const buf = await getRawBody(req);
    //const buf = await buffer(req.body);
    //const buf = await buffer(req.body);
    const sig = headers().get("stripe-signature");

    let data;
    let eventType;
    let event;
    try {
        event = stripe.webhooks.constructEvent(buf, sig, webhookSecret);
    } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Unknown error";
        console.log(`❌ Error message: ${errorMessage}`);

        return NextResponse.json(
            {
                error: {
                    message: `Webhook Error: ${errorMessage}`,
                },
            },
            { status: 400 }
        );
    }

    data = event.data;
    eventType = event.type;
    // Successfully constructed event.
    console.log("✅ Success:", event.id);
    //Receipts are only sent when a successful payment 
    //has been made—no receipt is sent if the payment fails or is declined.
    /**
     * Stripe only sends email receipts for payments that are made with your 
     * live API key or through your live Dashboard. 
     * If you are expecting an email for a test transaction, one will not be sent.
     */
    try {
       
        switch (event.type) {
         
            case 'checkout.session.completed': {
                       // First payment is successful and a subscription is created (if mode was set to "subscription" in ButtonCheckout)
                // ✅ Grant access to the product
                try {
                    
                    const session = event.data.object;
             
                    // const subscriptionId = session.subscription;
                    const { userId, accountType } = JSON.parse(session?.client_reference_id);

                    const session1 = await stripe.checkout.sessions.retrieve(
                        data.object.id,
                        {
                            expand: ['line_items']
                        }
                    );
             
                    const paymentMode = session1?.mode
                    /**
                     * Refunds: You may need to issue a refund for a specific payment. 
                     * Having the stripe_payment_id 
                     * allows you to directly reference the payment to process a refund.
                     */
                    const stripePaymentId = session1?.id;
           
                    
                    
                    if(userId){
                        //when user pay with one time payment
                        if(paymentMode === "payment"){
                            let dayPass = '';
                            const plan = accountType;
                            //basic 30 request, entry 5 searches
                            let remainRequest = 0;
                            //1 year pass 
                             if(plan === constants.PRICING.one_time_entry){
                                remainRequest = 1200;
                                dayPass = constants.ENUM_DAY_PASS.ONE_YEAR_DAY_PASS;
                            //30 day pas 
                            }else if(plan === constants.PRICING.beginner){
                                remainRequest = 100;
                                dayPass = constants.ENUM_DAY_PASS.THIRSTY_DAY_PASS;

                            }else if(plan === constants.PRICING.one_time_pay_as_u_go){
                                remainRequest = 1;
                            }else if(plan === constants.PRICING.one_time_starter){
                                remainRequest = 10;
                            }
                         
                            const result = await db.$transaction(async (trx) => {
                                let checkSub = await trx.OneTimePayment.findFirst({
                                    where: {
                                        user_id: userId
                                    },
                                    select:{
                                        has_access:true
                                    }
                                  }) 
                                  //each time user buy we need to track payment

                                // if(!checkSub?.has_access){
                                //     const subscription = await trx.OneTimePayment.create({
                                //         data: {
                                //             user_id: userId,
                                //             stripe_payment_id: stripePaymentId,
                                //         has_access: true,
                                //         payment_type:dayPass
                                          
                                //         },
                                //     });
                                // }
                                /**
                                 * Each payment we want to store it saparately 
                                 * so we can compare the payment with stripe 
                                 */
                                const subscription = await trx.OneTimePayment.create({
                                    data: {
                                        user_id: userId,
                                        stripe_payment_id: stripePaymentId,
                                    has_access: true,
                                    payment_type:dayPass
                                      
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
                           
                            });
                        }else{ 
                            //this for subscription        
                            const subscriptionId = session?.subscription
               
                            const customerId = session1?.customer;
                            const customer = await stripe.customers.retrieve(customerId);
        
                            // const customer = await stripe.customers.retrieve(customerId);
                            const priceId = session1?.line_items?.data[0]?.price.id;
                                //when user pay with subscription
                            const sub = await subService.checkSubByUserId(userId);
                        
                            const subPlan = sub?.plan
                            const plan = accountType;
                            let remainRequest = 0;
                            
                            const customerResub = subPlan && sub?.has_access === false
                            //sub plan not exist, has is true
                            //resub has is false because in another sub delete user unsub hash is set to false 
                            if(!subPlan){
                                if(plan === constants.PRICING.basic){
                                    remainRequest = 100
                                }else if(plan === constants.PRICING.standard){
                                    remainRequest = 210
                                }
                                await subService.createSub(
                                    userId,
                                    customerId,
                                    priceId,
                                    plan,
                                    true,
                                    customer?.email,
                                    subscriptionId,
                                    remainRequest// stripe email, user sign up can be different
                                )
                            }
                        }
                    }
           
                } catch (error) {
                    console.log(error);
                    throw new Error(error);
                }
                //1. user paid succesfully and the subscription is created
                // Provision access to your service
                break;
            }
            case 'customer.subscription.deleted': {
                console.log("revoke access");
                // ❌ Revoke access to the product
                // The customer might have changed the plan (higher or lower plan, cancel soon etc...)
                const subscription = await stripe.subscriptions.retrieve(
                    data.object.id
                );
                try {
                         // Revoke access to your product
                const customerId = subscription?.customer;
                await subService.deleteByCustomerId(customerId);
                } catch (error) {
                    throw new Error("customer.subscription.deleted" + error);
                }
             

                // break;
            }
            // case 'invoice.payment_succeeded':
            //     const invoice = event.data.object;
            //     const customerId = invoice.customer;
          
            //     // Add credits to the customer's account
            //     addCreditsToCustomer(customerId);
            //     break;

            default: {
                // console.error(`Unhandled event type: ${event.type}`);
                break;
            }
        }

        return NextResponse.json({ result: event, ok: true });
    } catch (error) {

        console.error(error);
        return NextResponse.json(
            {
                message: "something went wrong",
                ok: false,
            },
            { status: 500 }
        );
    }
}

                    // if (!subscriptionId) {
                    //     // Handle the case where subscription ID is not present

                    //     throw new Error('No subscription ID found in the session object');
                    // }