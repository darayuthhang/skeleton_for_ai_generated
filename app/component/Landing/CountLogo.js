"use client";
import constants from "@/app/lib/constants";
import React from "react";
const CountLogo = () => {
  return (
    <div className="text-center text-xl md:text-6xl font-bold mt-5 mb-10">
     <div className="mb-10"><span className="text-accent">
     {constants.userCountOrLogo.logo}
       </span> Logos already generated for</div> 
      <span className="text-secondary"> 
          {constants.userCountOrLogo.userCount}
         </span> happy customers.
    </div>
  );
};
export default CountLogo;
