
// import { NextRequest, NextResponse } from "next/server";
// import { centralError } from "@/app/lib/error-handler/central-error";
// import { isAuthorization, getUserIdAfterAuthorize } from "@/app/api/apiMiddleware/checkAuthorization";
// import { rateLimitStripe } from "@/app/api/config/limiter";
// import StripeService from "@/app/api/service/stripe-service";
// import { removeDailyUpdateAlert } from "@/app/lib/redis";

// import StockMarketService from "@/app/api/service/stock-market-service";
// import StockAlertService from "@/app/api/service/stock-alert-service";
// import constant from "@/app/lib/stock-market-constant/constant";
// import StripePayment from "@/app/lib/stripe/Stripe";

// const stripeService = new StripeService();
// const stockmarketService = new StockMarketService();
// const stockMarketAlertService = new StockAlertService();
// const stripePayment = new StripePayment();

// export async function DELETE(request, { params }) {

//     if (await rateLimitStripe.removeTokens(1) < 0) { return NextResponse.json({ success: false }, { status: 429, error: "Too Many Request" }); }
//     //authrozation
//     if (!await isAuthorization(request)) return NextResponse.json({ message: "Unauthorized", }, { status: 401 });

//     const subId = params?.subId;
//     const userId = getUserIdAfterAuthorize(request);
  
//     try {
        
//         //delete from stripe payment
//         await stripePayment.deleteStripeSubById(subId);
//         //delete from db
//         let result = await stripeService.deleteSubById(subId);
//         /**
//          * @description
//          * - remove alert from redis 
//          */
//         if(result){
//             let stockMarketList = await stockmarketService.getStockMarketListByUserId(userId)
            
//             for(let val of stockMarketList){
//                 const stockAlertId = val.stock_alerts[0].id
//                 const symId = val?.id;//stockmarketTableId
//                 const alertType = constant.STOP_NEWS_ALERT;
//                 if (stockAlertId) {
//                     await removeDailyUpdateAlert(stockAlertId);
//                     await stockMarketAlertService.updateAlertType(alertType, symId, false);
//                 }
//             }
//         }
//         return NextResponse.json(
//             { success: true },
//             { status: 200 })
//     } catch (error) {
//         return centralError(NextResponse, error)
//     }
// }
