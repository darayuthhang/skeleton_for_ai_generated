import { ENTRY_STRIPE_LINK, BEGINNER_LINK_STRIPE } from "./stripe/stripe-constant"
class Constant {
    PRIVACY_POLICY = "/privacy-policy"
    TERM_CONDITION = "/term-condition"
    statusMessage = {
        NOT_FOUND_MSG: "Unable to fetch data at the moment. Please try again later. ",
        INTENAL_SERVER_ERROR_MSG: "Unable to fetch data at the moment. Please try again later. ",
        BAD_REQUEST_MSG: "Not valid code snippet"
    }
    LOADING = "loading"
    SUCCESS = "success"
    FAILED = "failed"
    /**
     * LOGIN SIGNUP ENDPOINT DONT CHANGE ANYTHING
     */
    USER_SIGNUP = "/user/signup"
    USER_LOGIN = "/user/login"
    USER_FORGET_PASSWORD = "/user/forgot-password"
    USER_UPDATE_PASSWORD = "/user/update-password"

    GOOGLE_PARAM_SIGN_UP = "sign_up"
    NEXT_LOADING = "loading"
    NEXT_AUTHENTICATE = "authenticated"
    NEXT_UNAUTHENTICATE = "unauthenticated"
    PRIVATE_ROUTE = "PRIVATE"
    PUBLIC_ROUTE = "PUBLIC"
    STATUS_CODES = {
        OK: 200,
        BAD_REQUEST: 400,
        UN_AUTHORISED: 403,
        NOT_FOUND: 404,
        INTERNAL_ERROR: 500,
        MAXIMUM_LIMIT: 413,
        CONFLICT: 409,
        NOT_ACCEPTABLE: 406,
        ZOD_ERROR_CODE:422,
        EXTERNAL_API_ERROR: 503
    };
    AUTH_METHOD = {
        GMAIL: "google_email",
        CUSTOM_EMAIL: "email",
    };
    TWITTER_URL="https://twitter.com/DarayuthH"
    RESET_PASS = "RESET_PASS";
    SIGN_UP = "sign_up";
    
    APP_NAME_DOMAIN_FOR_SENDING_EMAIL ="@coloringpagebyai.com"
    APP_NAME_FOR_SENDING_EMAIL ="coloringpagebyai"
    
    APP_NAME ="coloringpagebyai"
    DOMAIN_NAME ="coloringpagebyai"
    /**
     * @Dontforget to change https://www.coloringpagebyai.com
     * if i start new project because it can affect stripe,
     * and google login
     */
    DOMAIN_NAME_WITH_HTTPS ="https://www.coloringpagebyai.com"

    imageUrl = "https://res.cloudinary.com/dacxiuqkp/image/upload/v1699899864/stockalertlogo/stockalert-logo_d30ia8.png";

    ACCOUNT_TYPE_PRO = "pro";

    folder = process.env.NEXT_PUBLIC_TEST_STAGE === 'test' ? "dev" :"prod";
    eventKey = process.env.NEXT_PUBLIC_TEST_STAGE === 'test' ? "" :"prod"
    ICON_URL = "/image/showcase/logo.webp"
    
    APP_NAME_FOR_HEADING="Coloringpagebyai"
    PRICING = {
        basic:"basic",
        standard:"standard",
        beginner:"beginner",//this is one time beginner
        one_time_pay_as_u_go:"one_time_pay_as_u_go",
        one_time_basic:"onetimebasic", // 15.99$
        one_time_entry:"onetimeentry", // 3$
        one_time_starter:"onetimestarter",


    }

    
    CARD_PRICING_DES = [
        // {
        //     header:"Starter",
        //     tool_tip:"Credits expire after 1 year.",
        //     pricing:"$10.00",
        //     savePricing:false,
        //     discountPricing:"$20",
        //     offer:[
        //         "10 credits (1 credit = 1 logo) ",
        //             // "Transform your existing logo into a 3D logo",
        //         "Store your Logos here forever",
        //         "Create 2D logo and 3D Logo",
        //         "Download Logos in Bulk",
        //         // "Download logos in formats: EPS, SVG, PNG, and PDF",
        //         "Free customer support",
        //         "Free commercial use (remove watermark)",
            
        //         ],
        //     card_pricing:this.PRICING.one_time_starter,
        //     card_pricing_link:"",
        //          button_text:"Buy now"
                
        // },
        {
            header:"30 days pass",
            tool_tip:"Credits will expire after the day has passed.",            
            pricing:"$14.99",
            isPopular:false,

            savePricing:false,
            discountPricing:"$40",
            offer:[
                "100 credits",
                    // "Transform your existing logo into a 3D logo",
           "Permanent cloud storage",
           "30 days access ",

                "Free customer support",
            
                ],
            card_pricing:this.PRICING.beginner,
            card_pricing_link:BEGINNER_LINK_STRIPE,
                 button_text:"Buy now"
                
        },
        {
            header:"One year pass",
            isPopular:true,
            tool_tip:"Credits will expire after the day has passed.",
            pricing:"$59",
            savePricing:true,
            discountPricing:"$100",
            offer:[
                "1200 credits",
             "Permanent cloud storage",
             "365 day access",


                "Free customer support",
             
          
                ],
            card_pricing:this.PRICING.one_time_entry,
            card_pricing_link:ENTRY_STRIPE_LINK,
                 button_text:"Buy now"
                
        },
        // {
        //     header:"Pay as you go",
        //     tool_tip:"It is yours forever",
        //     pricing:"$0.90",
        //     savePricing:false,
        //     discountPricing:"",
        //     offer:[
        //         "1 credit (1 credit = 1 logo) ",
        //             // "Transform your existing logo into a 3D logo",
        //         "Store your Logos here forever",
        //         "Download Logos in Bulk",
        //         // "Download logos in formats: EPS, SVG, PNG, and PDF",
        //         "Free customer support",
        //         "Free commercial use (remove watermark)",
            
        //         ],
        //     card_pricing:this.PRICING.one_time_pay_as_u_go,
        //     card_pricing_link:BEGINNER_LINK_STRIPE,
        //          button_text:"Buy now"
                
        // },
        // {
        //     header:"Premium",
        //     tool_tip:"It is yours forever",
        //     pricing:"$100",
        //     savePricing:true,
        //     discountPricing:"$200",
        //     offer:[
        //         "100 logos ",
        //             "Transform your existing logo into a 3D logo",
        //         "Store your image here forever",
        //         "Download Logos in Bulk",
        //         // "Download logos in formats: EPS, SVG, PNG, and PDF",
        //         "Free customer support",
        //         "Free commercial use (remove watermark)",
            
        //         ],
        //     card_pricing:this.PRICING.one_time_basic,
        //          button_text:"Buy now"
                
        // },
        
        // {
        //     header:"Onetime",
        //     tool_tip:"Credits do not rollover and reset every month.",
        //     pricing:"$10",
        //     offer_1:"210 credits",
        //     offer_2:"Free customer support",
        //     offer_3:"",
        //     offer_4:"",
        //     card_pricing:this.PRICING.standard
                
        // },
    
        ]
userCountOrLogo = {
    logo:2160,
    userCount:2025
    
}

BTN_TEXT = {
    GET_STARTED:"Design a coloring page"
}
FREE_CREDIT = 0;
IS_SCROLL_PAY_PLAN = true;
ENUM_DAY_PASS = {
    FIRST_DAY_PASS:"FIRST_DAY_PASS",
    SECOND_DAY_PASS:"SECOND_DAY_PASS",
    NO_PASS:"NO_PASS",
    THIRSTY_DAY_PASS:"THIRSTY_DAY_PASS",
    ONE_YEAR_DAY_PASS:"ONE_YEAR_DAY_PASS"
}

}
export default new Constant();
