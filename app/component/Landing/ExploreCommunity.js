'use client'
import React from 'react';

import Link from 'next/link';
import Image from 'next/image';
const ExploreCommunity = ({imageUrls}) => {
return (
<div className='text-center mt-10 mb-10'>
    <div className='text-xl md:text-3xl mb-2'> Explore what our community creates</div>
    <div className=" grid  grid-cols-2 border md:grid-cols-4 lg:grid-cols-6 ">
        {imageUrls?.map((val, index) => (
          <div
            // href={`/logos/${val?.domain_slug}`}
            key={index}
            className="border rounded-lg "
          >
            <Image
              src={val?.image_url}
              alt="logo"
              lazy="loading"
              width={250}
              height={250}
              // className="transition-transform duration-300 transform hover:scale-105"
            />
          </div>
        ))}
    </div>
    <Link href="/logos" className='btn btn-secondary font-bold mt-5'>Explore community</Link>
</div>
);
}
export default ExploreCommunity;