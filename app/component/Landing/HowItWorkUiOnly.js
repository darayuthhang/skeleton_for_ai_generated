'use client'
import React from 'react';
const HowItWorkUiOnly = () => {
return (
    <section class="md:p-10 ">
      <div className="container mx-auto p-4 md:p-8">
        <h2 class="text-4xl font-bold text-center text-black mb-20">
          How does it work?
        </h2>
        <div className="relative mt-12 lg:mt-20">
      <div className="absolute inset-x-0 hidden xl:px-44 top-2 md:block md:px-20 lg:px-28">
        <img src="/image/curve.svg" alt="" className="w-full" />
      </div>
      <div className="relative grid grid-cols-1 text-center gap-y-12 md:grid-cols-3 gap-x-12">
        <div>
          <div className="flex items-center justify-center w-16 h-16 mx-auto bg-white border-2 border-gray-200 rounded-full shadow">
            <span className="text-xl font-semibold text-gray-700"> 1 </span>
          </div>
          <h3 className=" mt-6 text-xl font-semibold leading-tight text-black md:mt-10">
            Describe your coloring page
          </h3>
          {/* <p className="mt-4 text-base text-black">
          Enter your product description about the problem your product solves.
          </p> */}
        </div>
        <div>
          <div className="flex items-center justify-center w-16 h-16 mx-auto bg-white border-2 border-gray-200 rounded-full shadow">
            <span className="text-xl font-semibold text-gray-700"> 2 </span>
          </div>
          <h3 className="mt-6 text-xl font-semibold leading-tight text-black md:mt-10">
            Click generate
          </h3>
        
        </div>
        <div>
          <div className="flex items-center justify-center w-16 h-16 mx-auto bg-white border-2 border-gray-200 rounded-full shadow">
            <span className="text-xl font-semibold text-gray-700"> 3 </span>
          </div>
          <h3 className="mt-6 text-xl font-semibold leading-tight text-black md:mt-10">
          Our AI will generate a coloring page for you.         </h3>
          {/* <p className="mt-4 text-base text-black">
          Note: Using the same prompt may generate slightly different versions of your uploaded image each time. Save the versions you like!
          </p> */}
        </div>
      </div>
    </div>
      </div>
    </section>
);
}
export default HowItWorkUiOnly;