'use client'
import React from 'react';
import Link from 'next/link';
import AvatarRating from '../Landing/AvatarRating';
const StartupseocheckHero = ({header, text}) => {
return (
    <div className="hero  ">
    <div className="hero-content text-center">
      <div className="max-w-md">
        <h1 className=" text-xl text-secondary md:text-6xl font-bold capitalize">
            {header}
         </h1>
 
        <p className="  text-sm py-6 text-slate-600">
            {text}
        </p>
    
        <Link
                href="/user/signup"
                className="btn btn-secondary btn-wide  "
              >
                Get 1 Free Product Check
              </Link>
              <p className='text-sm text-slate-600 text-center mt-2 mb-2'>We only show results from the free searches.</p>
        <div className='flex justify-center'>
        <AvatarRating />
        </div>
       
      </div>
    </div>
  </div>
);
}
export default StartupseocheckHero;