"use client";
import React, { useState, useRef } from "react";
import Navigation from "../Navigation/Navigation";

import StripePayment from "@/app/lib/stripe/Stripe";
import WallOfLove from "./WallOfLove";

import VerticalHero from "./VerticalHero";
import HowItWorkUiOnly from "./HowItWorkUiOnly";
import CardPricing from "../CardPricing/CardPricing";
import Faq from "./Faq";
import BigCardSignup from "./BigCardSignup";
import Footer from "./Footer";
import CountLogo from "./CountLogo";
import ShowoffImageList from "./ShowoffImageList";
import FutureTrends from "./FutureTrend";
import ComparisonBenefit from "./ComparisonBenefit";
import Image from "next/image";


const stripe = new StripePayment();
const Landing = ({     imageList, h1,h2, description, dynamic, imageListOf3DLogo,imageListOf2DLogo }) => {
  const pricingRef = useRef(null);
  const faqRef = useRef(null);
  const wallOfLoveRef = useRef(null);
  const demoRef = useRef(null);
  const [switchLogoType, setSwitchLogoType] = useState(true);
  const [paymentProLoading, setPaymentProLoading] = useState(false);

  const scrollTo = (e) => {
    e.preventDefault(); // Prevent default link behavior
    if (pricingRef.current) {
      pricingRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  const scrollToFaq = (e) => {
    e.preventDefault(); // Prevent default link behavior

    if (faqRef.current) {
      faqRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  const scrollTowallOfLoveRef = (e) => {
    e.preventDefault(); // Prevent default link behavior

    if (wallOfLoveRef.current) {
      wallOfLoveRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  const scrollToDemoRef = (e) => {
    e.preventDefault(); // Prevent default link behavior

    if (demoRef.current) {
      demoRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  const handleSwitchLogo = (val) => {
    if(switchLogoType === true){
      setSwitchLogoType(false)
    }else{
      setSwitchLogoType(true);
    }
  }


  return (
    <div className="">
      {/* <AlertMarketing /> */}
      <Navigation
        scrollTo={scrollTo}
        scrollToFaq={scrollToFaq}
        scrollTowallOfLoveRef={scrollTowallOfLoveRef}
        scrollToDemoRef={scrollToDemoRef}
      />

      <VerticalHero
        scrollTo={scrollTo}
        h1={h1}
        h2={h2}
        imageList={imageList}
        des={description}
        dynamic={dynamic}
      />


      {/* <div className="bg-tree flex items-center flex-col">
        <span className="text-xl ">&#9757;</span>

        <div className="text-center text-sm text-white ">
          Samples from our AI 3D Designer{" "}
        </div>
      
      </div> */}
      {/* <DemoVideo /> */}
      <div className="flex justify-center ">
      <video className="rounded-md border"  type="video/mp4" width="860" height="514" muted="muted" autoplay="autoplay" loop="loop" src="https://res.cloudinary.com/dacxiuqkp/video/upload/v1734036543/media/demo_zwmw9k.mp4"></video>

      </div>
      {/* <AsSeenIn /> */}
      <div className="flex justify-center">
        <CountLogo />
      </div>
      <div className="flex flex-col">
    <div className="text-center text-xl mb-2">Examples created using our logo creator
      </div>
      <div className="flex justify-center mt-5 mb-5">
          <button onClick={handleSwitchLogo} className={`btn btn-sm ${switchLogoType && "btn-secondary"}`}>3D Logo</button>
          <button onClick={handleSwitchLogo} className={`btn btn-sm ${!switchLogoType && "btn-secondary"}`}>2D Logo</button>
      </div>

    </div>
   
      {/* <ExploreCommunity imageUrls={imageUrls} /> */}
      <div className="mt-10 mb-10">
        <WallOfLove wallOfLoveRef={wallOfLoveRef} />
      </div>
      <ComparisonBenefit />

      <FutureTrends />

      {/* <MarketingApp /> */}
      <div className="mt-5 ">
        <HowItWorkUiOnly />
        {/* <DemoVideo /> */}
      </div>


      {/* <UserIdeaList
              userListIdeas={userListIdeas}
            /> */}
      {/* <HappyCustomers /> */}

      {/* <HowItWorkUiOnly /> */}

      <CardPricing pricingRef={pricingRef} />
      <Faq />
      {/* <MyProfile /> */}
      <BigCardSignup scrollTo={scrollTo} />
      <Footer />
      <div className="text-center text-sm mb-2">Made with ❤️ in Boston</div>
    </div>
  );
};

export default Landing;
//flex justify-center flex-col lg:flex-row items-center
