'use client'
import React from 'react';
import Image from 'next/image';

const data = [
    {
        image_url:"/image/icon.png"
    },
    {
        image_url:"/image/icon.png"
    },
    {
        image_url:"/image/icon.png"
    },
    {
        image_url:"/image/icon.png"
    },
    {
        image_url:"/image/icon.png"
    },
    {
        image_url:"/image/icon.png"
    },
    {
        image_url:"/image/icon.png"
    },
    {
        image_url:"/image/icon.png"
    },
    {
        image_url:"/image/icon.png"
    }
]
const SampleLogo = () => {
return (
<div className='mb-20'>
    <p className='text-center  text-white text-3xl mb-10 mt-10 lg:text-5xl font-bold'>Over 18 3d logo styles to choose from</p>
    <div className=' grid justify-center grid-cols-2  gap-1 md:grid-cols-3 lg:grid-cols-9'>
        {data?.map((val, index) => 
            <div>
                        <Image 
             src={val?.image_url}
             width={500}
             height={500}
             className='border-2'
         />
         <div>Desscribe image</div>
            </div>
        
        
         
        )}
           
    </div>

</div>
);
}
export default SampleLogo;