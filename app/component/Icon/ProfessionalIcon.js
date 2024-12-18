'use client'
import React from 'react';
import Image from 'next/image';
const ProfessionalIcon = () => {
return (
<div>
    <Image 
        width={25}
        height={25}
        src="/image/invoice-receipt.png"
        alt='invoice receipt'
    />
</div>
);
}
export default ProfessionalIcon;