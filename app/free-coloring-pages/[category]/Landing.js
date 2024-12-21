"use client";
import React from "react";
import Navigation from "@/app/component/Navigation/Navigation";
import constants from "@/app/lib/constants";
import Link from "next/link";
import Breadcrumbs from "@/app/component/Landing/BreadCrump";
import List from "./List";
import Footer from "@/app/component/Landing/Footer";
import CardPricing from "@/app/component/CardPricing/CardPricing";

const Landing = ({ h1, p, listOfData }) => {
  return (
    <div>
      <Navigation explore={true} />
      <div className="hero  ">
        <div className="hero-content text-center">
          <div className="max-w-lg">
            <div className="flex justify-center">
              <Breadcrumbs />
            </div>

            <h1 className="text-5xl font-bold">{h1}</h1>
            <p className="py-6">{p}</p>

            <div className="mt-4">
              {constants.IS_SCROLL_PAY_PLAN ? (
                <Link
                  href="#pricing"
                  // onClick={scrollTo}
                  className="btn bg-redRose text-white "
                >
                  &#9997; {constants.BTN_TEXT.GET_STARTED}
                </Link>
              ) : (
                <Link
                  href="/user/signup"
                  className="btn bg-redRose text-white "
                >
                  &#9997; {constants.BTN_TEXT.GET_STARTED}
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10 mb-10 p-10 bg-gray-200 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {listOfData.map((val, index) => (
          <List
            key={index}
            imageUrl={val?.image_url}
            promptDes={val?.title_and_heading}
            altText={val?.alt_text}
            domain_slug={val?.domain_slug}
          />
        ))}
      </div>
      <CardPricing />
      <Footer />
    </div>
  );
};
export default Landing;
