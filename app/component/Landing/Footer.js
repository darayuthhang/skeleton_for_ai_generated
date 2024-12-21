'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import constants from '@/app/lib/constants';
const Footer = () => {
    return (
        <footer className="footer p-10  text-base-content">
            <aside>
                <div className='mt-4 mb-4'>
                    <Image
                        src="/image/showcase/logo.webp"
                        width={90}
                        height={90}
                        alt='logo'
                        className="rounded-lg"
                    />
                    <div className='  font-bold  text-xl'>
                        {constants.APP_NAME_FOR_HEADING}
                        </div>
                </div>
                <div className="flex justify-center">
            {/* <a
              className=""
              href="https://www.indietool.io/indietool/3dlogoai-com"
              target="_blank"
            >
              <img
                src="https://indie-tool.s3.amazonaws.com/embed/feature-indietool-11.png"
                alt="3dlogoai-com"
                style={{ width: "200px", height: "54px" }}
              />
            </a> */}
          </div>
                <p>Copyright © 2024 - All right reserved</p>
                <Link className="hover:bg-sky-700 " tabindex="-1" target="_blank" href="https://twitter.com/DarayuthH">
                    <div className='flex gap-2'>
                        <span className='mt-1'>Built with</span> 
                        <Image 
                            width={25}
                            height={25}
                            alt='sweating'

                            src="/image/sweating.png"
                            className='rounded-full'
                        /> 
                        <span className='mt-1'>by Dhang</span>
                        <Image
                            width={25}
                            height={25}
                            alt='profile'
                            src="/image/my_profile_icon.png"
                            className='rounded-full'
                        />
                    </div>
                   
                </Link>
            </aside>
            {/* <nav>
                <header className="footer-title">Logo 3d Model</header>
                {THREE_D_MODAL.map((val, index) => 
                    <Link key={index} href={`/three-d-models/${val?.toLowerCase().replace(/\s+/g, '')}`} className="link link-hover">{val}</Link>
                )}
            </nav> */}
            {/* <nav>
                <header className="footer-title">Logo styles</header>
                {allStyle.map((val, index) => 
                    <Link key={index} href={`/logo-styles/${val?.toLowerCase().replace(/\s+/g, '')}`} className="link link-hover">{val}</Link>
                )}
            </nav> */}
             
         
           
       
            <nav>
                <header className="footer-title">LEGAL</header>
                <Link href="/term-condition" className="link link-hover">Terms of use</Link>
                <Link href="/privacy-policy" className="link link-hover">Privacy policy</Link>
            </nav>
            <nav>
                <header className="footer-title">Link</header>
                <a  target='__blank' href="https://sprunki-mod.com/">Sprunki Mod</a>
                <a  target='__blank' href="https://whatisaitools.com/" title="What Is Ai Tools">What Is Ai Tools</a>
            </nav>
           


            {/* <nav>
                <header className="footer-title">MORE</header>
                {Object.keys(hashseoKeyWordForExploreIdea).map((keyword) => {
                const seoData = hashseoKeyWordForExploreIdea[keyword];
                return (
                    <Link href={`${keyword}`} className="link link-hover" target='__blank'>
                        {seoData.heading}
                    </Link>
                );
            })}
             
                
            </nav> */}
        </footer>
    );
};

export default Footer;
