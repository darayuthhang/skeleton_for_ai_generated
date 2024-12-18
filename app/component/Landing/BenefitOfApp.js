"use client";
import React from "react";
import ClockIcon from "../Icon/ClockIcon";
import ReduceRiskIcon from "../Icon/ReduceRiskIcon";
import ProfessionalIcon from "../Icon/ProfessionalIcon";

const BenefitOfApp = () => {
  return (
    <section class=" md:p-20">
      <div className="container mx-auto p-4 md:p-8">
        <h2 class="text-4xl font-bold text-center text-black mb-20">
          How the App Helps You
        </h2>
        <div class="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="bg-originalColor p-8 bg-gray-100 rounded-lg shadow-lg">
            <div className="flex">
              <h3 class=" text-2xl  font-semibold text-gray-800  mb-4">
                Save Time
              </h3>
              <div className=" ml-auto"></div>
              <ClockIcon />
            </div>

            <p class="leading-relaxed text-slate-500 ">
              Don't spend months to build start up that nobody wants.
            </p>
          </div>
          <div class="bg-originalColor p-8 bg-gray-100 rounded-lg shadow-lg">
            <div className="flex">
              <h3 class=" text-2xl font-semibold text-gray-800  mb-4">
                Save money
              </h3>
              <div className="ml-auto">
                <ReduceRiskIcon />
              </div>
            </div>

            <p class="leading-relaxed text-slate-500">
            The average business start up cost ranges from $30,000 to $40,000.            </p>
          </div>
          <div class="bg-originalColor p-8 bg-gray-100 rounded-lg shadow-lg">
            <div className="flex">
              <h3 class=" text-2xl font-semibold text-gray-800  mb-4">
              Increased Efficiency
              </h3>
              <div className="ml-auto">
                <ProfessionalIcon />
              </div>
            </div>

            <p class="leading-relaxed text-slate-500">
            Increase your chances of finding product-market fit faster.             </p>
          </div>
        </div>
      </div>
    </section>
  );
};
export default BenefitOfApp;
