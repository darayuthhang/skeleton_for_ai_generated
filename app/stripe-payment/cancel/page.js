
import React from 'react';
import { FRONT_ENDPOINT } from '@/app/lib/front-end-point';
import { redirect } from 'next/navigation'
// import { useRouter, useSearchParams } from 'next/navigation'

export default async function page({ params,
    searchParams }) {
    //     console.log("cancel");
    // if (searchParams?.session_id) {
    //     redirect(`${FRONT_ENDPOINT.DASHBOARD}`)
    //     //redirect user to sth
    // } else {
    //     redirect(`${FRONT_ENDPOINT.DASHBOARD}`)

    // }
    redirect(`${FRONT_ENDPOINT.DASHBOARD}`)
    return (
        <div>
            cancel
        </div>
    );

};

