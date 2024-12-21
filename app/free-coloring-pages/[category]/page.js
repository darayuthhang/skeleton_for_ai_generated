
import React from 'react';

import { unstable_cache } from 'next/cache';

import { db } from '@/app/lib/db';

import { getServerSession } from "next-auth/next"
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { notFound, redirect } from 'next/navigation'
import Landing from './Landing';
import constants from '@/app/lib/constants';

export const dynamic = 'force-dynamic';
const fiveMinutes = 60 * 5;

// const getCacheFindFirst = unstable_cache(
//     async (queryParamSubDomain) => {
//       // console.log("Cache MISS: Fetching total items count from the database");
//       let result = await db.FreeColorPageImageUrl.findFirst({

//         where: { category: queryParamSubDomain },
//         // skip: offset,
//         // take: limit,
//         select: { 
//             image_url: true,  
//             created_at:true,
//             title_and_heading:true,
          
//             meta_description:true,
//             description:true,
//             alt_text:true,
          
//             },
      
//       });
//       return result
    
//     },
//     ['global-cache'], // Static cache key
//      // add the user ID to the cache key
//     {
//       tags: ["global"], 
//       revalidate: fiveMinutes,
//     }
//   );

  const getCacheFindMany = unstable_cache(
    async (queryParamSubDomain) => {
      // console.log("Cache MISS: Fetching total items count from the database");
      let result = await db.FreeColorPageImageUrl.findMany({

        where: { category: queryParamSubDomain },
        // skip: offset,
        // take: limit,
        select: { 
            image_url: true,  
            created_at:true,
            title_and_heading:true,
            alt_text:true,
            domain_slug:true
          
            },
      
      });
      return result
    
    },
    ['global-cache'], // Static cache key
     // add the user ID to the cache key
    {
      tags: ["global"], 
      revalidate: fiveMinutes,
    }
  );


export async function generateMetadata({ params }, parent) {
    const category = params?.category;
    
    /**
     * Dont convert params to lowercase, we do not want duplicate
     * content when google crawl index
     */


    
    let title =`Free ${category} Coloring Pages: Fun & Free Printables for All Ages` + ` | ${constants.APP_NAME}`,
     description = `Explore ${category} coloring pages, perfect for kids and adults. 
     Featuring the list of ${category}s, these printables are free to download, print, and color!`, 
     imageUrl = `${constants.ICON_URL}`, 
     alt = 'logo of the coloringpagebyai'; 
    
    // let keyWords = filterMetaData?.keyWords;
   
    
    return {
        title: title,
        description: description,
        icons: [
            {
                "rel": "icon",
                "url": imageUrl,
                "sizes": "48x48",
                "type": "image/jpg"
            },
            {
                "rel": "icon",
                "url": imageUrl,
                "sizes": "96x96",
                "type": "image/jpg"
            },
            {
                "rel": "icon",
                "url": imageUrl,
                "sizes": "144x144",
                "type": "image/jpg"
            },
            {
                "rel": "apple-touch-icon",
                "url": imageUrl,
                "sizes": "48x48",
                "type": "image/jpg"
            },
            {
                "rel": "apple-touch-icon",
                "url": imageUrl,
                "sizes": "96x96",
                "type": "image/jpg"
            },
            {
                "rel": "apple-touch-icon",
                "url": imageUrl,
                "sizes": "144x144",
                "type": "image/jpg"
            },
        ],
        // alternates: {
        //     canonical: canonicalUrl,
        // },
        // keywords: keyWords,
        openGraph: {
            title: title,
            // url: canonicalUrl,
            description: description,
            //    type: "website",
            images: [
                {
                    url: imageUrl,
                    type: "image/jpg",
                    width: 1200,
                    height: 630,
                    alt: alt,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: title,
            description: description,
            images: [
                {
                    url: imageUrl,
                    type: "image/jpg",
                    width: 1200,
                    height: 630,
                    alt: alt,
                },
            ],
        },
    }
  }
export default async function page({params}) {
  
//   const session = await getServerSession(authOptions);
//   if(session?.accessToken){
//     redirect(`${FRONT_ENDPOINT.DASHBOARD}`)
//   }

const category = params?.category;

let result = await getCacheFindMany(category);
    
    if(result && result.length > 0){
        let h1 =`Free ${category} Coloring Pages: Fun & Free Printables for All Ages`

        const pageDescription = `Discover a wide range of ${category.toLowerCase()} coloring pages designed for creativity and fun!
        these free printables are great for all ages. Start coloring today!`;
        
        return <Landing 
        h1={h1}
         p={pageDescription}
         listOfData={result}
         />
    }else{
        return notFound()
    }


  

};



