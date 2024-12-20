"use client";
import constants from "@/app/lib/constants";
import React from "react";
import Link from "next/link";
import AvatarRating from "./AvatarRating";
import Image from "next/image";
const VerticalHero = ({
  header,
 h1,
 h2,
 imageList = [],
  scrollTo,
  dynamic = false,
  des,
}) => {
  const badgeHTML = `<a href="https://www.producthunt.com/posts/3dlogoai?embed=true&utm_source=badge-featured&utm_medium=badge&utm_souce=badge-3dlogoai" target="_blank"><img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=470133&theme=light" alt="Image&#0032;to&#0032;prompts - Turn&#0032;your&#0032;images&#0032;into&#0032;prompts | Product Hunt" style="width: 250px; height: 54px;" width="250" height="54" /></a>`;

  return (
    <div className="hero ">
      <div className="hero-content text-center mt-20">
        <div className="max-w-2xl">
          {dynamic ? (
            <>
              <h1
                className="
                      text-3xl
                       capitalize 
                       md:text-6xl 
                       font-bold Monaco
                       text-black"
              >
                <span className=" link text-green-100  font-bold text-shadow-3d ">
                  {header}
                </span>
              </h1>

              {/* <p className="py-2  text-white">{des}</p> */}
            </>
          ) : (
            <>
          

            <div className="flex gap-5 flex-col">
                <h1 class="text-xs font-bold text-black sm:text-sm lg:text-[#474368]/70">
                  {h1}
                </h1>
                <h2 className="text-black text-4xl font-bold tracking-tight text-gray-700
                 sm:text-5xl xl:text-7xl ">
                  {h2}
               
                  <span  className="border-b-4 border-indigo-200 border-b-indigo-500 rounded-full px-2"> 
                    on Amazon</span>
                </h2>
                <div className="flex flex-wrap justify-center gap-2"> 
                {imageList.map((val, index) => 
                  <Image 
                    className="rounded-md"
                    key={index}
                    width={200}
                    height={200}
                    alt={val?.alt}
                    src={val?.image_url}
                  />
                )}
                </div> 
            
                <p
                  className=" mt-3 text-base 
                font-medium text-gray sm:text-lg  "
                >
                  {des}
                </p>
              </div>
             
         
            </>
          )}

          <div className="mt-4">
            {constants.IS_SCROLL_PAY_PLAN ? (
              <Link
                href="#pricing"
                onClick={scrollTo}
                className="btn bg-redRose text-white "
              >
                &#9997; {constants.BTN_TEXT.GET_STARTED}
              </Link>
            ) : (
              <Link href="/user/signup" className="btn bg-redRose text-white ">
                &#9997; {constants.BTN_TEXT.GET_STARTED}
              </Link>
            )}
          </div>

          {/* <AvatarRating /> */}
          {/* <div className="flex justify-center">
            <a
              className=""
              href="https://www.indietool.io/indietool/3dlogoai-com"
              target="_blank"
            >
              <img
                src="https://indie-tool.s3.amazonaws.com/embed/feature-indietool-11.png"
                alt="3dlogoai-com"
                style={{ width: "200px", height: "54px" }}
              />
            </a>
          </div> */}
        </div>
      </div>
    </div>
  );
};
export default VerticalHero;
