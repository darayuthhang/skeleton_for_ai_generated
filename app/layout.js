'use client'
import ReduxProvider from './ReduxProvider'
import './styles/globals.css'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { SessionProvider } from "next-auth/react";
import Script from 'next/script';

export default function RootLayout(props) {


  return (
    <html lang="en" data-theme="winter">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta charSet="utf-8" />
        {/* <title>{constants.APP_NAME}</title>
        <meta name='description' content='Discover and showcase your app to a vibrant community of solopreneurs and indie hackers. Gain valuable back-links and enhance your SEO for free!' />
   
  
   
   
        <meta name="twitter:title" content="Boost Your App's Visibility: Premier Directory for Solopreneurs & Indie Hackers" />
       
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="/image/indietool-logo.png" />
        <meta name="twitter:description" content="Discover and showcase your app to a vibrant community of solopreneurs and indie hackers. Gain valuable back-links and enhance your SEO for free!" />
        
        <meta property="og:URL" content={constants.DOMAIN_NAME_WITH_HTTPS} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Boost Your App's Visibility: Premier Directory for Solopreneurs & Indie Hackers" />
        <meta property="og:description" content="Discover and showcase your app to a vibrant community of solopreneurs and indie hackers. Gain valuable back-links and enhance your SEO for free!" />
        <meta property="og:image" content="/image/indietool-logo.png" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/favicon.ico" sizes="any" />
        <link
          rel="canonical"
          href={constants.DOMAIN_NAME_WITH_HTTPS}
          key="canonical"
        /> */}

{/* 
        <Script type="text/javascript">
          {`
          window.$crisp=[];
          window.CRISP_WEBSITE_ID="6edede16-dbc9-4d11-a025-32848c04f5ae";
          (function(){
            d=document; s=d.createElement("script");
            s.src="https://client.crisp.chat/l.js";
            s.async=1;
            d.getElementsByTagName("head")[0].appendChild(s);
          })();
        `}
        </Script> */}


       

{process.env.NEXT_PUBLIC_LOCAL_STAGE !== 'local' && 
  <script defer data-domain="3dlogoai.com" src="https://plausible.io/js/script.js"></script>
}
      </head>
      <body className=' min-h-screen w-screen  bg-gray-100   ' >
        <SessionProvider>
          <ReduxProvider>
            <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
              {/* <AlertMarketing /> */}
            {/* <div role="alert" className="  alert alert-success  text-sm w-full">
    <div></div>
    <span className="w-full text-center">
    We now support additional formats! You can download your logos in EPS, SVG, PNG, and PDF.    
    </span>
  </div> */}
              {/*              
              <NextTopLoader /> */}
              {props.children}
              {/* <Analytics /> */}
            </GoogleOAuthProvider>
          </ReduxProvider>
        </SessionProvider>
                
      </body>
    </html>
  )
}
