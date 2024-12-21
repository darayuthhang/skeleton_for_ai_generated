
import React from 'react';

import { unstable_cache } from 'next/cache';

import { db } from '@/app/lib/db';

import { getServerSession } from "next-auth/next"
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { notFound, redirect } from 'next/navigation'

import constants from '@/app/lib/constants';
import ShowCase from './Showcase';

export const dynamic = 'force-dynamic';
const fiveMinutes = 60 * 5;

const getCacheFindFirst = unstable_cache(
    async (queryParamSubDomain) => {
      // console.log("Cache MISS: Fetching total items count from the database");
      let result = await db.FreeColorPageImageUrl.findFirst({

        where: { domain_slug: queryParamSubDomain },
        // skip: offset,
        // take: limit,
        select: { 
            image_url: true,  
            created_at:true,
            title_and_heading:true,
          
            meta_description:true,
            description:true,
            alt_text:true,
          
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
    const domainSlug = params?.domain_slug;
    
    /**
     * Dont convert params to lowercase, we do not want duplicate
     * content when google crawl index
     */
    let title =`404 not found` + ` | ${constants.APP_NAME}`,
    description = ``, 

    imageUrl = `${constants.ICON_URL}`, 
    alt = 'logo of the coloringpagebyai'; 


    let result = await getCacheFindFirst(domainSlug);
  
    
    if(result){
   
        title = `Free ${result?.title_and_heading} | ${constants.APP_NAME}`; 

        description = result?.meta_description;
        imageUrl = result?.image_url;
        alt = result?.alt_text;
    }
 



    
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

const domainSlug = params?.domain_slug;

let result = await getCacheFindFirst(domainSlug);
    
    if(result){


        let description = result?.description,
        imageUrl = result?.image_url,
        alt = result?.alt_text;
        return <ShowCase 
        header={"Free " + result?.title_and_heading}
        description={description}
        imageUrl={imageUrl}
        alt={alt}
        created_at={result?.created_at}
        />
    }else{
        return notFound()
    }


  

};



