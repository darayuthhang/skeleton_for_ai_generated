"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import SenjaPage from "./SenjaPage";
// const data = [
//   {
//     quote:`
//    This app is a game-changer for indie hackers like me. I needed a professional-looking logo for my startup, and this tool delivered beyond my expectations. The 3D effects are impressive, and the customization options are vast. Highly recommended!
//     `,
//     imageUrl:`/image/testimony/testi-1.jpg`,
//     founderName:`Charles Teh`,
//     founderSiteLink:`https://x.com/charlestehio`,
//     founderAppName:`Whatcanidotoday`
//   },
//   {
//     quote:`
// I've been using this 3D logo creation app for a few weeks now, and I am blown away by the quality and ease of use. The designs are stunning and the interface is incredibly user-friendly. My clients have noticed the upgrade in our branding, and I couldn't be happier!
// `,
//     imageUrl:`/image/testimony/testi-2.jpeg`,
//     founderName:`Dimon Dev`,
//     founderSiteLink:`hexpay.net`,
//     founderAppName:`Hexpay`
//   },
//   {
//     quote:`
// Using this 3D logo app has given my clients a major edge. The process is fast, and the results are stunning. My clients love their new, standout logos! `,
//     imageUrl:`/image/testimony/testi-3.jpg`,
//     founderName:`Devansh Bhushan`,
//     founderSiteLink:`https://growfol.com/`,
//     founderAppName:`Growfol`
//   },
//   {
//     quote:`I was skeptical at first, but this app has completely changed my approach to logo design. The 3D elements bring a whole new dimension to branding, making it more dynamic and engaging. The app is intuitive and perfect for both beginners and experienced designers.`,
//     imageUrl:`/image/testimony/testi-4.png`,
//     founderName:`Jainil`,
//     founderSiteLink:`SocialStats.co`,
//     founderAppName:`SocialStats`
//   },
//   {
//     quote:`Creating a logo used to be a daunting task, but this app makes it so much fun! The 3D logo creator offers a wide range of styles and effects, allowing me to experiment and find the perfect look for my brand. The end result is always professional and eye-catching. `,
//     imageUrl:`/image/testimony/testi-5.jpg`,
//     founderName:`Jaypy`,
//     founderSiteLink:`indietldr.com`,
//     founderAppName:`Indietldr`,
//     // twitterLink:`https://x.com/jipe_dev`
//   },
//   {
//     quote:`Making a logo used to be tough, but this app makes it easy and fun! With a variety of styles and effects, I can experiment and find the perfect look. The final logo always looks professional and stands out. `,
//     imageUrl:`/image/testimony/testi-6.jpg`,
//     founderName:`Gabi`,
//     founderSiteLink:`http://SuperPo.st`,
//     founderAppName:`Superpo`,
//     // twitterLink:`https://x.com/jipe_dev`
//   },
//   {
//     quote:`I was looking for something like this for ages, thanks, waiting to try. `,
//     imageUrl:`/image/testimony/testi-7.jpg`,
//     founderName:`Nie`,
//     founderSiteLink:`replypulse.com`,
//     founderAppName:`Replypulse`,
//     // twitterLink:`https://x.com/jipe_dev`
//   }
// ]
const data = [
  // {
  //   quote: ` This app is a game-changer for indie hackers like me.`,
  //   imageUrl: `/image/testimony/testi-1.jpg`,
  //   founderName: `Charles Teh`,
  //   founderSiteLink: `https://x.com/charlestehio`,
  //   founderAppName: `Whatcanidotoday`,
  //   founderSocialMediaLink: "https://x.com/charlestehio",
  // },
  // {
  //   quote: `
  //   I've been using this 3D logo creation app for a few weeks now, and I am blown away by the quality and ease of use.
  //   `,
  //   imageUrl: `/image/testimony/testi-2.jpeg`,
  //   founderName: `Dimon Dev`,
  //   founderSiteLink: `hexpay.net`,
  //   founderAppName: `Hexpay`,
  //   founderSocialMediaLink: "https://x.com/DimonDevCEO",
  // },
//   {
//     quote:`
// Using this 3D logo app has given my clients a major edge. The process is fast, and the results are stunning. My clients love their new, standout logos! `,
//     imageUrl:`/image/testimony/testi-3.jpg`,
//     founderName:`Devansh Bhushan`,
//     founderSiteLink:`https://growfol.com/`,
//     founderAppName:`Growfol`,
//     founderSocialMediaLink:"https://x.com/BhushanDevansh"
//   },

//    {
//     quote:`I was skeptical at first, but this app has completely changed my approach to logo design. The 3D elements bring a whole new dimension to branding, making it more dynamic and engaging. The app is intuitive and perfect for both beginners and experienced designers.`,
//     imageUrl:`/image/testimony/testi-4.png`,
//     founderName:`Jainil`,
//     founderSiteLink:`SocialStats.co`,
//     founderAppName:`SocialStats`,
//     founderSocialMediaLink:'https://x.com/jainilnf'
//   },
//   {
//     quote:`Creating a logo used to be a daunting task, but this app makes it so much fun! The 3D logo creator offers a wide range of styles and effects, allowing me to experiment and find the perfect look for my brand. The end result is always professional and eye-catching. `,
//     imageUrl:`/image/testimony/testi-5.jpg`,
//     founderName:`Jaypy`,
//     founderSiteLink:`indietldr.com`,
//     founderAppName:`Indietldr`,
//     founderSocialMediaLink:"https://x.com/jaypy_build"
//     // twitterLink:`https://x.com/jipe_dev`
//   },
  // {
  //   quote:`Making a logo used to be tough, but this app makes it easy and fun! With a variety of styles and effects, I can experiment and find the perfect look. The final logo always looks professional and stands out. `,
  //   imageUrl:`/image/testimony/testi-6.jpg`,
  //   founderName:`Gabi`,
  //   founderSiteLink:`http://SuperPo.st`,
  //   founderAppName:`Superpo`,
  //   founderSocialMediaLink:"https://x.com/createdbygabi"
  //   // twitterLink:`https://x.com/jipe_dev`
  // },
  // {
  //   quote:`I was looking for something like this for ages, thanks, waiting to try. `,
  //   imageUrl:`/image/testimony/testi-7.jpg`,
  //   founderName:`Nie`,
  //   founderSiteLink:`replypulse.com`,
  //   founderAppName:`Replypulse`,
  //   founderSocialMediaLink:"https://x.com/niepreneur"
  //   // twitterLink:`https://x.com/jipe_dev`
  // },

  //   {
  //     quote:`
  //  This app is great and is exactly what I've been looking for to help me validate product ideas! `,
  //     imageUrl:`/image/testimony/testi-4.jpeg`,
  //     founderName:`Darrel`,
  //     founderSiteLink:`https://mindfulnessbellmenubar.com/`,
  //     founderAppName:`Mindfulnessbellmenubar`
  //   },
  //   {
  //     quote:`Dhang made an affordable tool to validate your idea before wasting time. 1 prompt and you got your answer to go all in or not. Very valuable tool to use! `,
  //     imageUrl:`/image/testimony/testi-5.jpg`,
  //     founderName:`Jipe`,
  //     founderSiteLink:``,
  //     founderAppName:``,
  //     twitterLink:`https://x.com/jipe_dev`
  //   }
];
const WallOfLove = ({wallOfLoveRef}) => {
  return (
    <section className="py-10  sm:py-16 lg:py-24 " ref={wallOfLoveRef}>
    <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto mb-10 text-center">
        <h2 className="text-3xl font-bold leading-tight  sm:text-4xl lg:text-5xl">
        &#128591; What our customers say
        </h2>
        {/* <p className="max-w-lg mx-auto mt-4 text-base leading-relaxed text-gray-600">Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis.</p> */}
      </div>

      {/* <div className="grid grid-cols-1 gap-6 px-4 mt-12 sm:px-0 xl:mt-20 xl:grid-cols-4 sm:grid-cols-2">
        {data?.map((val, index) => (
          <div className="overflow-hidden bg-slate-200 rounded-md">
            <div className="px-5 py-6">
              <div className="flex items-center justify-between">
                <img
                  className="flex-shrink-0 object-cover w-10 h-10 rounded-full"
                  src={val?.imageUrl}
                  alt="customers"
                />
                <div className="min-w-0 ml-3 mr-auto">
                  <p className="text-base font-semibold text-black truncate">
                    {val?.founderName}
                  </p>
                </div>
                <a
                  href={val?.founderSocialMediaLink}
                  title=""
                  className="inline-block text-sky-500"
                  target="__blank"
                >
                  {val?.ph ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="25"
                      height="25"
                      viewBox="0 0 40 40"
                      class="styles_logo__xeq4y"
                    >
                      <g fill="none" fill-rule="evenodd">
                        <path
                          fill="#FF6154"
                          d="M40 20c0 11.046-8.954 20-20 20S0 31.046 0 20 8.954 0 20 0s20 8.954 20 20"
                        ></path>
                        <path
                          fill="#FFF"
                          d="M22.667 20H17v-6h5.667a3 3 0 0 1 0 6m0-10H13v20h4v-6h5.667a7 7 0 1 0 0-14"
                        ></path>
                      </g>
                    </svg>
                  ) : (
                    <svg
                      className="w-6 h-6"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M19.633 7.997c.013.175.013.349.013.523 0 5.325-4.053 11.461-11.46 11.461-2.282 0-4.402-.661-6.186-1.809.324.037.636.05.973.05a8.07 8.07 0 0 0 5.001-1.721 4.036 4.036 0 0 1-3.767-2.793c.249.037.499.062.761.062.361 0 .724-.05 1.061-.137a4.027 4.027 0 0 1-3.23-3.953v-.05c.537.299 1.16.486 1.82.511a4.022 4.022 0 0 1-1.796-3.354c0-.748.199-1.434.548-2.032a11.457 11.457 0 0 0 8.306 4.215c-.062-.3-.1-.611-.1-.923a4.026 4.026 0 0 1 4.028-4.028c1.16 0 2.207.486 2.943 1.272a7.957 7.957 0 0 0 2.556-.973 4.02 4.02 0 0 1-1.771 2.22 8.073 8.073 0 0 0 2.319-.624 8.645 8.645 0 0 1-2.019 2.083z"></path>
                    </svg>
                  )}
                </a>
              </div>
              <blockquote className="mt-5">
                <p className="text-base text-gray-800">
                  {val?.quote}
                </p>
              </blockquote>
            </div>
          </div>
        ))}
          
      </div> */}
      <div className="">
      <SenjaPage />

      </div>

    </div>
  </section>
//     <div className="container mx-auto " ref={wallOfLoveRef}>
//       <h1 className="text-xl text-center lg:text-5xl font-bold">
//       &#128591; Testimonial
//       </h1>
//       <div className="mt-10 grid grid-cols-1 justify-center border rounded-md md:grid-cols-2 lg:grid-cols-3 gap-4">
//         {data.map((val, index) => 
//           <figure className="relative h-full w-full max-w-[550px] p-6 rounded-xl border border-base-content/20 bg-base-100">
//           <blockquote className="relative">
//             <div className="text-base xl:text-sm text-base-content">
//               {val?.quote}
//             </div>
//           </blockquote>
//           <figcaption className="relative flex items-center justify-start gap-4 pt-4 mt-4 border-t border-base-content/10">
//             <div className="overflow-hidden rounded-full bg-base-300 shrink-0">
//               <Image
//                 src={val?.imageUrl}
//                 width={50}
//                 height={50}
//                 alt={val?.founderName}
//               />
//             </div>
//             <div className="w-full flex items-end justify-between gap-2">
//               <div>
//                 <div className="text-sm font-medium text-base-content">
//                 {val?.founderName}
//                 <br></br>
//                 {val?.founderSiteLink ? 
//                 <>
//                                   @founder <Link href={val?.founderSiteLink} target="__blank">{val?.founderAppName}</Link>

//                 </>

//                 :
//                   <Link href={val?.twitterLink} target="___blank">
//                     <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="40" height="40" viewBox="0 0 48 48">
// <path fill="#03a9f4" d="M24,4C12.954,4,4,12.954,4,24s8.954,20,20,20s20-8.954,20-20S35.046,4,24,4z"></path><path fill="#fff" d="M36,17.12c-0.882,0.391-1.999,0.758-3,0.88c1.018-0.604,2.633-1.862,3-3	c-0.951,0.559-2.671,1.156-3.793,1.372C29.789,13.808,24,14.755,24,20v2c-4,0-7.9-3.047-10.327-6c-2.254,3.807,1.858,6.689,2.327,7	c-0.807-0.025-2.335-0.641-3-1c0,0.016,0,0.036,0,0.057c0,2.367,1.661,3.974,3.912,4.422C16.501,26.592,16,27,14.072,27	c0.626,1.935,3.773,2.958,5.928,3c-2.617,2.029-7.126,2.079-8,1.977c8.989,5.289,22.669,0.513,21.982-12.477	C34.95,18.818,35.342,18.104,36,17.12"></path>
// </svg>
//                   </Link>
//                 }
//                 </div>
//                 <div className="mt-0.5 text-sm text-base-content/60"></div>
//               </div>
//             </div>
//           </figcaption>
//         </figure>
//         )}
//       </div>
//     </div>
  );
};
export default WallOfLove;
