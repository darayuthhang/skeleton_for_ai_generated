import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
const ShowCase = () => {
    return (
        <section className='container mx-auto mt-20 mb-20' id="image-quality">
            <h2 className='text-6xl font-bold text-center '> Image Quality</h2>
            <p class=" text-center mt-10 mb-10 text-gray-500">Experience stunning visuals with our high-quality images that bring your content to life.</p>
            <div className='flex flex-col items-center md:flex-row  md:justify-center gap-5 mt-20  md:flex md: '> 
                <div>
                    <Image
                        width={500}
                        height={500}
                        src="/image/hd-quality.png"
                        alt="God"

                    />
                    <p>1024x1024, HD quality(what we offer), natural look</p>
                </div>
                <div>
                    <Image
                        width={500}
                        height={500}
                        src="/image/standard-1.png"
                        alt="God"
                    />
                    <p>1024x1024, standard quality(come from Bing), natural look</p>
                </div>
               
                {/* <Image
                    width={500}
                    height={500}
                    src="/image/generated-image-5.webp"
                    alt="Panda"
                /> */}
            </div>
            <div className='flex justify-center mt-4 mb-20 active:text-blue-800'> <Link 
                target="_blank"
            className="text-center active:text-blue-800 text-blue-600 underline" 
            href="https://cookbook.openai.com/articles/what_is_new_with_dalle_3?fbclid=IwAR3lu_SMtE0IX2qws22v9PXNxs-ZFI2290ulQqBtlgAP-rLn79F3H8hh4tw">
                Dalle-3 explained...</Link></div>

        </section>
    );
};

export default ShowCase;
