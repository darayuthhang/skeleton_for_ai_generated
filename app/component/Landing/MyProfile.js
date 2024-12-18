"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";

const MyProfile = () => {
  return (
    <div className="hero p-20">
      <div className="hero-content flex-col lg:flex-row">
        <Image
          src="/image/my_profile.jpg"
          width={150}
          height={150}
          className="rounded-full shadow-2xl"
        />
        {/* <img
          src="/image/my_profile.jpg"
          className="max-w-sm rounded-full shadow-2xl"
        /> */}

        <div>
          <h1 className="text-xl lg:text-5xl font-bold">Hey, I am Dhang! 👋</h1>
          <div className="py-6 flex flex-col ui-sans-serif gap-2">
            <span className="text-md lg:text-lg">
            Having failed 13 startups, Startseocheck being my most recent one,
             I realized I hadn't done proper research. So, I came up with the idea 
             of a keyword research tool for founders and business owners
            like me to validate ideas quickly and save months of work through SEO.
            </span>
            {/* <span className="text-md">
              Initially, I was hesitant to share my startup because I feared
              that people might steal my idea. However, I soon realized that
              many people might have the same idea.
            </span> */}
          </div>
          {/* <div className="text-md mb-2">
         Since i have spent 3 to 6 months building things nobody wanted (learned the hard way!).
          My idea: 
          </div> */}
          <Link
            className="btn btn-sm btn-secondary mt-2 "
            href="https://twitter.com/DarayuthH"
            target="_blank"
          >
            Connect with me on Twitter.
          </Link>
        </div>
      </div>
    </div>
    // <div id="about" class="max-w-2xl mx-auto my-16 px-8 ">
    //   <div class="flex items-start">
    //     <div class="avatar flex-shrink-0">
    //       <div class="w-24 ring ring-yellow-500 ring-offset-2 rounded-full">
    //         <img src="/image/my_profile.jpg" alt="My profile" />
    //       </div>
    //     </div>
    //     <div class="flex-shrink ml-4">
    //       <p class="font-bold text-lg">Hey, I am Dhang</p>
    //       <p class="text-wrap my-2">
    //         Inspired by #buildinpublic community in Twitter. i start to build my start up and
    //         share it in public. Back then,I am afraid of sharing my start up because i am afraid of
    //         people stealing my idea. Then, i come to realize that everyone has the same idea.
    //         <a
    //           target="_blank"
    //           class="text-secondary underline"
    //           href="https://packagist.org/users/karakhanyans/packages/"
    //         >
    //           my packages
    //         </a>{" "}
    //         got tens of thousand of downloads.{" "}
    //       </p>
    //     </div>
    //   </div>
    //   <div>
    //     <p class="text-wrap my-2">
    //       {" "}
    //       I am a{" "}
    //       <a
    //         class="underline"
    //         target="_blank"
    //         href="https://exam.laravelcert.com/is/sergey-karakhanyan/certified-since/2020-05-05"
    //       >
    //         Certified Laravel Developer
    //       </a>{" "}
    //       and during my 10 years of experience in web development (7 with
    //       Laravel), I delivered a lot of products, launched a{" "}
    //       <a
    //         class="text-secondary underline"
    //         target="_blank"
    //         href="https://www.producthunt.com/@karakhanyans"
    //       >
    //         couple of SaaS apps
    //       </a>{" "}
    //       (3 of them got top recognition) and all of them had the same things in
    //       common: Payments, User Registration, SEO, Admin, Blog...{" "}
    //     </p>
    //     <p class="text-wrap my-2 mt-4">
    //       {" "}
    //       So I combined all my experience and knowledge into{" "}
    //       <span class="font-bold">Larafast</span> and sharing it with you.{" "}
    //     </p>
    //     <p class="text-wrap my-2 text-lg mt-8 font-bold">
    //       {" "}
    //       How can it help you?{" "}
    //     </p>
    //     <ul class="mt-4 ml-4">
    //       <li class="mt-2">
    //         1. <span class="font-bold">Less Stress</span> on doing boring stuff
    //         again and again
    //       </li>
    //       <li class="mt-2">
    //         2. <span class="font-bold">Save your time</span> and focus on idea,
    //         not on boilerplate
    //       </li>
    //       <li class="mt-2">
    //         3. <span class="font-bold">Deliver products</span> with a lightning
    //         speed
    //       </li>
    //       <li class="mt-2">
    //         4. <span class="font-bold">Earn Money</span> and test your product
    //         faster
    //       </li>
    //       <li class="mt-4">
    //         <span class="italic">
    //           "The more you ship, the more you learn, the more you earn -
    //         </span>
    //       </li>
    //     </ul>
    //   </div>
    // </div>
  );
};
export default MyProfile;
