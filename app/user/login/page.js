
import React from 'react';
import Login from '@/app/component/Login/Login';

import { getServerSession } from "next-auth/next"
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation'

import constants from '@/app/lib/constants';



export const dynamic = 'force-dynamic';
const title = "Signup | 3dlogoai"
const imageurl = constants.ICON_URL
const des = `
Signup | 3dlogoai
`
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
export default function page() {
    return (
        <Login />
    );
};

