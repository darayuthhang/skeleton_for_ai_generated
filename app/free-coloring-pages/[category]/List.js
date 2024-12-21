"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
const List = ({ imageUrl, promptDes, altText, domain_slug }) => {
  // Assuming 'promptDes' is used for the dynamic text and 'imageUrl' for the image source
  // You may want to process the 'promptDes' to shorten it or display a full description

  // Generate a dynamic URL based on the description or use 'addDashToSpace' helper
  const dynamicUrl = `/${domain_slug}`;

  return (
    <Link href={dynamicUrl} className="p-4 bg-white  rounded">

        <Image
          src={imageUrl}
          alt={altText}
          title={altText}
          width={250}
          height={250}
        
        />


        <p className="text-xs text-gray-600  text-center  	"> {promptDes}</p>
  
    </Link>
  );
};

export default List;
