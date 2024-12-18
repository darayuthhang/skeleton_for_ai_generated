import React from 'react';
import Image from 'next/image';
const NextJsImage = ({ imageUrl , width, height, alt, 
    className = ''
}) => {
    return (
        <Image
            src={imageUrl}
            width={width}
            height={height}
            alt={alt}
            className={className}
            />
    );
};

export default NextJsImage;
