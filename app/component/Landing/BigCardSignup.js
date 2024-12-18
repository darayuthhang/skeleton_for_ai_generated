"use client";
import React from "react";
import Link from "next/link";
import constants from "@/app/lib/constants";
const BigCardSignup = ({scrollTo}) => {
  return (
    <div className="rounded-lg  mt-20 mb-20 hero bg-tree">
      <div className="hero-content text-center  lg:p-20">
        <div className="max-w-md">
          <h1 className="text-2xl md:text-5xl text-white font-bold">
          Get your <span className=" link text-rose-400  font-bold text-shadow-3d ">3D logo </span>  
          
          </h1>
          <p className="py-6  leading-relaxed text-white md:font-bold">
          Let our AI generate a 3D logo to elevate your brand engagement, transforming your logo from a mere symbol into a dynamic experience.           </p>
          {constants.IS_SCROLL_PAY_PLAN ? 
                  <Link
                  href="#pricing"
                  onClick={scrollTo}
                  className="btn bg-redRose text-white shadow-2xl shadow-black border-2 btn-wide font-bold "
                >
                  &#9997; {constants.BTN_TEXT.GET_STARTED}
                </Link>
                :
                <Link
                href="/user/signup"
              
                className="btn bg-redRose text-white shadow-2xl shadow-black border-2 btn-wide font-bold "
              >
                &#9997; {constants.BTN_TEXT.GET_STARTED}
              </Link>

              }
         
          {/* <Link href="/user/signup" className="btn bg-redRose text-white shadow-2xl shadow-black border-2 btn-wide font-bold ">
          &#9997; {constants.BTN_TEXT.GET_STARTED}
          </Link> */}
        </div>
      </div>
    </div>
  );
};
export default BigCardSignup;
