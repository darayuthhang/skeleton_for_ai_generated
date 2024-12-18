"use client";
import React from "react";
import Navigation from "../../Navigation/Navigation";
import Link from "next/link";
import constants from "@/app/lib/constants";
import Footer from "../../Landing/Footer";
import { shortenLogoDescription } from "@/app/lib/3d-logo-helpers";
import AvatarRating from "../../Landing/AvatarRating";

const ShowCase = ({
  header,
  founderName,
  created_at,
  imageUrl,
  alt,
  industry,
  threedModel,
  style,
}) => {
  return (
    <div className="">
      <Navigation />

      <div className="">
        <div className="hero">
          <div className="hero-content text-center">
            <div className="max-w-md">
              <h1 className="text-4xl font-bold tracking-tight  sm:text-3xl xl:text-4xl sm:tracking-tight capitalize">
                {shortenLogoDescription(header)}
              </h1>
              <p className="text-md  mt-5 mb-5">
                This {industry} logo concept was designed with the help of our AI 3D logo
                generator. It's a {threedModel} 3D model logo with the style of{" "}
                {style ? style : "random"}.
              </p>
              <p className="text-sm  mb-4 ">
                This idea concept was searched in our AI generator by{" "}
                <span className="font-bold">{founderName}</span> on {created_at}.
              </p>
              <Link
                href="/user/signup"
                className="btn bg-redRose text-white mt-1 mb-2"
              >
                {constants.BTN_TEXT.GET_STARTED}
              </Link>
              <AvatarRating />
              <div className="flex justify-center relative">
                <img
                  alt={alt}
                  className="rounded-lg w-full h-auto shadow-lg"
                  src={imageUrl}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span
                    className=" text-5xl font-bold"
                    style={{
                      textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
                      opacity: 0.5,
                    }}
                  >
                    3D Logo ai
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div >
      <Footer />
    </div>
  );
};

export default ShowCase;