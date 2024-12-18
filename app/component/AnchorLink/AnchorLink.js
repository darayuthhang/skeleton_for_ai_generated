"use client";
import React from 'react';
import Link from 'next/link';

const AnchorLink = ({
    link,
    text,
    title
}) => {
    return (
        <Link   
            href={link}
            className="text-decoration-none text-primary-emphasis"
            title={title}
        >{text}</Link>
    );
};

export default AnchorLink;
