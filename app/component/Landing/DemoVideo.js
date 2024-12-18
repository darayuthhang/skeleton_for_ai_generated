"use client";
import React from "react";
import { Suspense } from "react";

const DemoVideo = () => {
  return (
    <div className="">
         <section className="p-1 md:container md:mx-auto  md:p-20">
      <Suspense fallback={<p>Loading video...</p>}>
        <div className="relative pb-[50.25%] border-4 border-neutral-400	 rounded-md ">
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src="https://www.youtube.com/embed/5Vh2Nu1BHjY"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="YouTube Video"
            loading="lazy"
          />
        </div>
      </Suspense>
    </section>
    </div>
 
  );
};
export default DemoVideo;
