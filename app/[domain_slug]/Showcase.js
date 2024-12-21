"use client";
import React, { useRef } from "react";
import Navigation from "../component/Navigation/Navigation";
import Link from "next/link";
import constants from "@/app/lib/constants";
import Image from "next/image";
import { formatToShowday } from "../lib/app-helpers";
import Footer from "../component/Landing/Footer";
import axios from "axios";
import { saveAs } from "file-saver";
import CardPricing from "../component/CardPricing/CardPricing";
import Breadcrumbs from "../component/Landing/BreadCrump";
const ShowCase = ({ header, created_at, imageUrl, alt, description }) => {
  const contentRef = useRef(null);
  const iframeRef = useRef(null);

  const downloadImage = async () => {
    const response = await axios.get(imageUrl, {
      responseType: "blob",
    });
    const blob = response.data;
    saveAs(blob, `coloring_page.png`);
  };

  // Function to trigger print
  const printImage = () => {
    const iframe = document.createElement("iframe"); // Create an iframe element
    iframe.style.position = "absolute";
    iframe.style.width = "0px";
    iframe.style.height = "0px";
    iframe.style.border = "none";
    document.body.appendChild(iframe); // Append iframe to the document body

    // Get the image URL from the contentRef (Image component)
    const imageUrl = contentRef.current.src;

    const iframeDoc = iframe.contentWindow.document;
    iframeDoc.open();
    iframeDoc.write(`
      <html>
        <head>
          <title>Print Image</title>
        </head>
        <body style="text-align: center;">
          <img src="${imageUrl}" style="max-width: 100%; max-height: 100%;" onload="window.print(); window.close();" />
        </body>
      </html>
    `);
    iframeDoc.close();

    iframe.contentWindow.focus(); // Focus on the iframe content
    iframe.contentWindow.print(); // Trigger the print dialog
  };
  return (
    <div className="">
      <Navigation />

      <div className="">
        <div className="hero">
          <div className="hero-content text-center">
            <div className="max-w-md">
              <h1 className="text-1xl font-bold tracking-tight sm:text-2xl xl:text-3xl sm:tracking-tight capitalize">
                {header}
              </h1>
              <p className="text-md mt-5 mb-5"></p>
              <p className="text-sm mb-4">{description}</p>

              <Link
                href="/user/signup"
                className="btn bg-redRose text-white mt-1 mb-2"
              >
                {constants.BTN_TEXT.GET_STARTED}
              </Link>
              <div className="text-sm">
                The image was created on {formatToShowday(created_at)}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center flex-col items-center relative">
          {/* Image with absolute positioned buttons inside */}
          <div className="relative">
            <Image
              ref={contentRef}
              alt={alt}
              width={500}
              height={500}
              className="rounded-lg shadow-lg"
              src={imageUrl}
              lazy="loading"
            />

            {/* Buttons inside the image, positioned at the top-right corner */}
            <div className="absolute top-2 right-2 flex flex-col space-y-2">
              <button
                onClick={downloadImage}
                className="btn btn-sm mb-2   rounded p-2"
              >
                Download
              </button>
              <button onClick={printImage} className="btn btn-sm  rounded p-2">
                Print
              </button>
            </div>
          </div>
        </div>
        <iframe
          id="ifmcontentstoprint"
          ref={iframeRef}
          style={{ display: "none" }}
          title="iframe"
        />
        <div className="mt-10">
          <CardPricing />
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default ShowCase;
