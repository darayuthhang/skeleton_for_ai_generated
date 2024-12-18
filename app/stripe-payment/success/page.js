
import React from 'react';

import { redirect } from 'next/navigation'
import { FRONT_ENDPOINT } from '@/app/lib/front-end-point';
// import { useRouter, useSearchParams } from 'next/navigation'

export default async function page({ params,
    searchParams}) {
    if (searchParams?.session_id){
        redirect(`${FRONT_ENDPOINT.DASHBOARD}`)
        //redirect user to sth
    }else{
        return (
            <div>
                Success
            </div>
        );
    }
 
   
};

