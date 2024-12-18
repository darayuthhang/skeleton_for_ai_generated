
import React from 'react';


import { db } from './lib/db';
import { getServerSession } from "next-auth/next"
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation'
import { FRONT_ENDPOINT } from './lib/front-end-point';
import { shortenDomainSlug } from './lib/3d-logo-helpers';
import constants from './lib/constants';
import Landing from './component/Landing/Landing';
import { imageList } from './lib/3d-logo-constant';
import { imageListOf3DLogo, imageListOf2DLogo } from './lib/3d-logo-constant';
import TestApp from './testApp';
export const dynamic = 'force-dynamic';
const title = `The #1 AI 3DLogo Generator for Professional 3DLogo
 | 3dlogoai`
const imageurl = "/image/showcase/logo.webp"
const des = `
3D Logo Design Service - Elevate Your Brand with Stunning 3D Logos | 3dlogoai
`
export const metadata = {
  title: title,
  description: des,
  metadataBase: new URL(constants.DOMAIN_NAME_WITH_HTTPS), //canonical

  icons: [
    {
      "rel": "icon",
      "url": imageurl ,
      "sizes": "48x48",
      "type": "image/jpg"
    },
    {
      "rel": "icon",
      "url": imageurl,
      "sizes": "96x96",
      "type": "image/jpg"
    },
    {
      "rel": "icon",
      "url": imageurl,
      "sizes": "144x144",
      "type": "image/jpg"
    },
    {
      "rel": "apple-touch-icon",
      "url": imageurl,
      "sizes": "48x48",
      "type": "image/jpg"
    },
    {
      "rel": "apple-touch-icon",
      "url": imageurl,
      "sizes": "96x96",
      "type": "image/jpg"
    },
    {
      "rel": "apple-touch-icon",
      "url": imageurl,
      "sizes": "144x144",
      "type": "image/jpg"
    },
  ],
  keywords: [

  ],
  openGraph: {
    title: title,
    // url: constants.DOMAIN_NAME_WITH_HTTPS,
    description: des,
    type: "website",
    images: [
      {
        url: imageurl,
        type: "image/jpg",
        width: 1200,
        height: 630,
        alt: "EMM",
      },
    ],
    type: 'website',
  },
  twitter: {
    card: "summary_large_image",
    title:title,
    description: des,
    images: [
      {
        url: imageurl,
        type: "image/jpg",
        width: 1200,
        height: 630,
        alt: "EMM",
      },
    ],
  },
}
export default async function page() {
  
  const session = await getServerSession(authOptions);
  if(session?.accessToken){
    redirect(`${FRONT_ENDPOINT.DASHBOARD}`)
  }
  const h1 = ` The #1 AI 3DLogo Generator for Professional 3DLogo`;
  const h2 = ` Create a 3D logo`
  const des = `   Get professional 3D logos in seconds with our AI 3D Logo
                  Generator. Simply enter your company name and slogan to
                  receive stunning logo designs.`
  


  const limit = 12;
  // const imageUrls = await db.ImageUrl.findMany({
  //   where: {
  //     has_access: false,
  //   },    orderBy: {
  //     created_at: 'desc',
  //   },
  //   take: limit,
  //   select: {
  //     image_url: true,
  //     domain_slug:true
  //   },
  // });

 
  
  return (
    <>
    <Landing 
    h1={h1}
    h2={h2}
    imageListOf3DLogo={imageListOf3DLogo}
    imageListOf2DLogo={imageListOf2DLogo}
    description={des}
    imageList={imageList}
  
    />
    {/* <ProductKeyWord /> */}
    </>
  
     
  );


};



// 'use client'
// import React from 'react';
// import Link from 'next/link'
// const Signup = () => {
//   return (
//     <div className='container  mx-auto  flex justify-center '>
//       <div className='flex items-center min-h-screen w-96 p-3'>
//         <div className="flex flex-col w-full 
//                             border-opacity-50 
//                             p-6 rounded-md
//                             border-2 border-black shadow-md">
//           <div className="grid h-20   rounded-box place-items-center">
//             <button className='btn btn-outline min-w-full '>
//               <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="25" viewBox="0 0 48 48">
//                 <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
//               </svg>
//               SIGN UP WITH GOOGLE
//             </button>
//           </div>
//           <div className="divider">OR</div>
//           <div className="grid h-20
//                 rounded-box place-items-center ">
//             <button className='btn btn-outline min-w-full '>

//               SIGN UP WITH EMAIL
//             </button>
//           </div>
//           <div className="divider"></div>
//           <div className='flex justify-center'>
//             <div className='mr-2'>Already a user?</div>
//             <Link href="#" className='link link-neutral'>Login</Link>
//           </div>
//         </div>
//       </div>
//     </div>



//   );
// };

// export default Signup;
