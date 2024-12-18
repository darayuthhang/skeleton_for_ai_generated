'use client';
import React from 'react';
import Image from 'next/image';

import VerticalHero from './VerticalHero';
import Hero from './Hero';
const Header = () => {
    return (
        <div className='container mx-auto'>
            <Hero />
          
            {/* <VerticalHero 
                header="Find keywords with low competition based on your product description."
                placeholderText="Type in your product description"
            /> */}
        </div>
    );
};

export default Header;
