'use client'
import { useSession } from "next-auth/react";
import React, { useEffect } from 'react';
import Navigation from "../component/Navigation/Navigation";
import { redirect } from "next/navigation";

import { FRONT_ENDPOINT } from "../lib/front-end-point";
import { useRouter } from "next/navigation";



export default function UserLayout({ children }) {
   
    const { data: session, status } = useSession();
    const router = useRouter();


     if (status === 'unauthenticated') {
        return (
            <>
                {/* <Navigation /> */}
                {children}
            </>
        );
    }else{
        // router.push(FRONT_ENDPOINT.DASHBOARD)
    }
  
}
