"use client"; // Ensures this component runs on the client side

import React, {useRef} from "react";
import Link from "next/link";
import Image from "next/image";
import constants from "@/app/lib/constants";
import Footer from "../../Landing/Footer";
import Navigation from "../../Navigation/Navigation";
import AvatarRating from "../../Landing/AvatarRating";
import CardPricing from "../../CardPricing/CardPricing";
import AlertMarketing from "../Alert/AlertMarketing";
import { generateAltText } from "@/app/lib/3d-logo-helpers";

const Explore = ({ imageList, totalPages, currentPage, imagesPerPage }) => {
  const pricingRef = useRef(null);
  const scrollTo = (e) => {
    e.preventDefault(); // Prevent default link behavior
    if (pricingRef.current) {
      pricingRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <div>
   
      <Navigation 
       scrollTo={scrollTo}
      />
      
      <div className="hero ">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-3xl capitalize md:text-6xl font-bold Monaco ">
              Explore{" "}
              <span className="link text-rose-400 font-bold text-shadow-3d">
                3D logo{" "}
              </span>
              from community
            </h1>
            <p className="py-5 ">
              Discover the unique designs that other creative minds have crafted
              with their AI-powered 3D Logo designer.
            </p>
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
            <AvatarRating />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2  md:grid-cols-4 lg:grid-cols-6 ">
        {imageList.map((val, index) => (
          <Link
  
            href={`/logos/${val?.domain_slug}`}
            key={val?.domain_slug || index}
            className="border rounded-lg overflow-hidden"
          >
            <Image
              src={val?.image_url}
              alt={`${generateAltText(val?.prompts)}`}
              loading="lazy" 
              width={250}
              height={250}
              // className="transition-transform duration-300 transform hover:scale-105"
            />
          </Link>
        ))}
      </div>

      {/* Pagination Controls */}
      <nav aria-label="Pagination" className="mt-8 flex justify-center">
        <ul className="inline-flex items-center -space-x-px">
          {currentPage > 1 && (
            <li>
              <Link
                      scroll={false}
                href={`?page=${currentPage - 1}&limit=${imagesPerPage}`}
                className="block px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700"
                aria-label="Previous page"
              >
                <span className="sr-only">Previous</span>
                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </Link>
            </li>
          )}

          {Array.from({ length: totalPages }, (_, i) => {
            const pageNumber = i + 1;
            const isCurrentPage = currentPage === pageNumber;
            const isNearCurrentPage = Math.abs(currentPage - pageNumber) <= 2;
            
            if (isCurrentPage || isNearCurrentPage || pageNumber === 1 || pageNumber === totalPages) {
              return (
                <li key={pageNumber}>
                  <Link
                    href={`?page=${pageNumber}&limit=${imagesPerPage}`}
                    aria-current={isCurrentPage ? "page" : undefined}
                    scroll={false}
                    className={`${
                      isCurrentPage
                        ? "z-10 px-3 py-2 leading-tight text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700"
                        : "px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                    } ${pageNumber === 1 ? "rounded-l-lg" : ""} ${pageNumber === totalPages ? "rounded-r-lg" : ""}`}
                  >
                    {pageNumber}
                  </Link>
                </li>
              );
            } else if (
              (pageNumber === currentPage - 3 && currentPage > 4) ||
              (pageNumber === currentPage + 3 && currentPage < totalPages - 3)
            ) {
              return (
                <li key={pageNumber} className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300">
                  ...
                </li>
              );
            }
            return null;
          })}

          {currentPage < totalPages && (
            <li>
              <Link
              scroll={false}
                href={`?page=${currentPage + 1}&limit=${imagesPerPage}`}
                className="block px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700"
                aria-label="Next page"
              >
                <span className="sr-only">Next</span>
                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </Link>
            </li>
          )}
        </ul>
      </nav>

      <div className="mt-10">
        <CardPricing pricingRef={pricingRef}/>
      </div>
      <Footer />
    </div>
  );
};

export default Explore;
