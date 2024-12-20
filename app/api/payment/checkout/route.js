import { NextRequest, NextResponse } from "next/server";
import { centralError } from "@/app/lib/error-handler/central-error";
import {
  isAuthorization,
  getUserIdAfterAuthorize,
} from "@/app/api/apiMiddleware/checkAuthorization";
import { rateLimitStripe } from "@/app/api/config/limiter";

import Zod from "@/app/lib/zod/Zod";

import StripePayment from "@/app/lib/stripe/Stripe";
import constants from "@/app/lib/constants";

const stripe = new StripePayment();

export async function POST(request, { params }) {
  if ((await rateLimitStripe.removeTokens(1)) < 0) {
    return NextResponse.json(
      { success: false },
      { status: 429, error: "Too Many Request" }
    );
  }
  //authrozation
  if (!(await isAuthorization(request)))
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  let userId = getUserIdAfterAuthorize(request);

  const reqBody = await request.json();
  
  let { amount, accountType = "" } = Zod.stripeSchema.parse(reqBody);
  let pricingItem = "";
  let mode = "subscription";
  try {
    
     if(accountType.trim() === constants.PRICING.one_time_entry){
      pricingItem = process.env.NEXT_PUBLIC_ONE_TIME_ENTRY_STRIPE_PRODUCT
      mode = "payment" //one time payment
    }else if(accountType.trim() === constants.PRICING.beginner){
      pricingItem = process.env.NEXT_PUBLIC_ONE_TIME_BEGINNER_STRIPE_PRODUCT
      mode = "payment" //one time payment
    }else if(accountType.trim() === constants.PRICING.one_time_pay_as_u_go){
      pricingItem = process.env.NEXT_PUBLIC_ONE_TIME_PAY_AS_YOU_GO_STRIPE_PRODUCT
      mode = "payment" //one time payment
    }else if(accountType.trim() === constants.PRICING.one_time_starter){
      mode = "payment";
      pricingItem = process.env.NEXT_PUBLIC_ONE_TIME_STARTER_STRIPE_PRODUCT
    }
    
    else{
      throw new Error("Pro or Expert payment do not exist");
    }

    const paymentMode = process.env.NEXT_PUBLIC_STRIPE_PAYMENT_MODE;
    const successUrl = `${process.env.NEXT_PUBLIC_URL}/stripe-payment/success?session_id={CHECKOUT_SESSION_ID}&credit_type=${accountType?.trim()}`;
    const cancelUrl = `${process.env.NEXT_PUBLIC_URL}/stripe-payment/cancel`;
    let sessionId = await stripe.createSessionCheckout(
      pricingItem.trim(),
      successUrl,
      cancelUrl,
      paymentMode,
      userId,
      accountType,
      mode,
    );
    return NextResponse.json(
      { success: true, sessionId: sessionId },
      { status: 200 }
    );
  } catch (error) {
    return centralError(NextResponse, error);
  }
}
