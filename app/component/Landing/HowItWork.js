'use client';
import React from 'react';
import YoutubeVideo from './YoutubeVideo';
import { Suspense } from 'react'

const HowItWork = () => {
    return (
        <section className='container mx-auto  p-20' id="demo">
            <div className='flex justify-center '>
                <h2 className='md:text-5xl font-bold mt-20 mb-20  '>How does it work?</h2>
            </div>
            {/* <div className='mt-4 mb-4 ' >
                <Suspense fallback={<p>Loading video...</p>}>
                    <YoutubeVideo />
                </Suspense>
            </div> */}
          
        </section>
    );
};

export default HowItWork;
