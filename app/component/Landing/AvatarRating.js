import constants from '@/app/lib/constants';
import React from 'react';

const imageList = [
    // {
    //     image_url:"/image/testimony/testi-1.jpg"
    // },
    {
        image_url:"/image/testimony/testi-2.jpeg"
    },
    {
        image_url:"/image/testimony/testi-3.jpg"
    },
    {
        image_url:"/image/testimony/testi-4.png"
    },
    // {
    //     image_url:"/image/testimony/testi-5.jpg"
    // },
    {
        image_url:"/image/testimony/testi-6.jpg"
    },
    {
        image_url:"/image/testimony/testi-7.jpg"
    },
    
]
const AvatarRating = () => {
    return (
        <div className="flex flex-col items-center   gap-3 mt-5">
            <div className="-space-x-5 avatar-group justify-start">
                {imageList?.map((val, index) => 
                      <div className="avatar w-12 h-12">
                      <img
                          alt="Lennard"
                          fetchpriority="high"
                          width="400"
                          height="400"
                          decoding="async"
                          data-nimg="1"
                          style={{ color: "transparent" }}
                          src={val?.image_url}
                      />
                     
                  </div>
                )}
              
           
                {/* <div className="avatar w-12 h-12">
                    <img
                        alt="Darrell"
                        fetchpriority="high"
                        width="400"
                        height="400"
                        decoding="async"
                        data-nimg="1"
                        style={{ color: "transparent" }}
                        src="/image/testimony/testi-4.jpeg"
                    />

                </div>
                <div className="avatar w-12 h-12">
                    <img
                        alt="Jipe"
                        fetchpriority="high"
                        width="400"
                        height="400"
                        decoding="async"
                        data-nimg="1"
                        style={{ color: "transparent" }}
                        src="/image/testimony/testi-5.jpg"
                    />

                </div> */}
                {/* <div className="avatar w-12 h-12">
                    <img
                        alt="Lennard"
                        fetchpriority="high"
                        width="400"
                        height="400"
                        decoding="async"
                        data-nimg="1"
                        style={{ color: "transparent" }}
                        src="/image/icon.png"
                    />

                </div>
                <div className="avatar w-12 h-12">
                    <img
                        alt="Lennard"
                        fetchpriority="high"
                        width="400"
                        height="400"
                        decoding="async"
                        data-nimg="1"
                        style={{ color: "transparent" }}
                        src="/image/icon.png"
                    />

                </div> */}
                {/* Repeat similar blocks for other avatars */}
            </div>
            <div className="flex flex-col  md:items-start gap-1">
                <div className="rating">
                    {[...Array(5)].map((_, index) => (
                        <svg
                            key={index}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="w-5 h-5 text-yellow-500"
                        >
                            <path
                                fillRule="evenodd"
                                d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                                clipRule="evenodd"
                            ></path>
                        </svg>
                    ))}
                </div>
                <div className="text-base text-gray">
                    <span className="font-semibold text-gray">
                        {constants.userCountOrLogo?.userCount}
                        </span>  customers  love it
                </div>
            </div>
        </div>
    );
};

export default AvatarRating;
