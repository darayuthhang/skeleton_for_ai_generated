'use client'
import React from 'react';
import Image from 'next/image';

const ShowoffImageList = ({
    header,
    imageList
}) => {
return (
<div className='py-10  sm:py-16 lg:py-24 mt-10 mb-10 border-t-2 bg-tree'>
<div className='text-3xl text-white font-bold leading-tight  sm:text-4xl lg:text-5xl text-center mb-10'>{header}</div>

    <div className='grid  grid-cols-2 border-neutral md:grid-cols-4 lg:grid-cols-5 bg-neutral'>
        {imageList?.map((val, index) => 
        <>
        <div>
        <Image 
            key={index}
            width={250}
            height={250}
            // lazy="priority"
            src={val?.image_url}
            alt={val?.alt}
        />
        <div className='p-4 text-white'>{val.text}</div>
        </div>
    
        </>
         
        )}
        
    </div>
</div>
);
}
export default ShowoffImageList;