
import React  from 'react';

import { getServerSession } from "next-auth/next"
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation'

import constants from '@/app/lib/constants';
import helpers from '@/app/lib/helpers';
import { db } from '@/app/lib/db';
import Design from '@/app/component/3dlogo/Dashboard/Design/Design';

export const dynamic = 'force-dynamic';
const title = "Design | 3dlogo"
const imageurl = constants.ICON_URL
const des = `
Design | 3dlogo`
export const metadata = {
  title: title,
  description: des,
  // metadataBase: new URL(constants.DOMAIN_NAME_WITH_HTTPS), //canonical

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
    url: constants.DOMAIN_NAME_WITH_HTTPS,
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

export default async function page(){
   // let result = []; 
   const session = await getServerSession(authOptions);
   const isAuth = session?.refreshToken;
   let userId = await helpers.getUserId(session);
   
   if (!isAuth){
     redirect(`/`)
   }
   let imageList = await db.ImageUrl.findMany({
        where:{user_id:userId},
        select: {
            image_url:true
        },
        orderBy: {
            created_at: 'desc'  // or any other field you want to sort by
        }
    }
    )

    return (
        <>
            <Design 
                imageList={imageList}
            />
        </>
        
      
    );
};

