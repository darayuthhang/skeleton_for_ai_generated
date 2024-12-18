'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
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
                    <div className='text-rose-400  font-bold text-shadow-3d text-xl'>3D Logo ai</div>
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
                <header className="footer-title">Create logo with AI </header>

                <Link target='__blank' href="/bakery-logo" >Bakery logo</Link>
                <Link target='__blank' href="/youtube-logo" >Youtube logo</Link>
                <Link target='__blank' href="/tiktok-logo" >Tiktok logo</Link>
                <Link target='__blank' href="/school-logo" >School logo</Link>

              
            </nav>
           
            <nav>
                <header className="footer-title">Free Tools</header>
                <Link href="/tools/business-name-generator" className="link link-hover">Business name generator</Link>
                <Link href="/tools/youtube-video-description-generator" className="link link-hover">Youtube video description generator</Link>
                <Link href="/tools/tiktok-hashtag-generator" className="link link-hover">Tiktok hashtag generator</Link>
                <Link href="/tools/startup-cost-calculator" className="link link-hover">Startup cost calculator</Link>

            </nav>
            <nav>
                <header className="footer-title">Join Affiliates</header>
                <Link
                    
                    href="https://3dlogoai.promotekit.com/"
            className="link link-hover"
                  >
                    Affiliates (30%)
                  </Link>            </nav>
            {/* <nav className=''>
                <header className="footer-title"> Get Stunning Logos Weekly!</header>
                <div className='text-sm'>
                    We will send you prompts and five new beautiful, 
                
                    stunning logos for commercial use every week.
                    <br></br>
                    💌 No spam.
                    </div>
                <div
      dangerouslySetInnerHTML={{
        __html: `
  <iframe src="https://embeds.beehiiv.com/710ad031-0a80-4f72-b6c3-04761c3c56b8?slim=true" data-test-id="beehiiv-embed" height="52" frameborder="0" scrolling="no" style="margin: 0; border-radius: 0px !important; background-color: transparent;"></iframe>

        `,
      }}
    />            
    
    </nav>
           */}
            <nav>
                <header className="footer-title">LEGAL</header>
                <Link href="/term-condition" className="link link-hover">Terms of use</Link>
                <Link href="/privacy-policy" className="link link-hover">Privacy policy</Link>
            </nav>
            <nav>
                <header className="footer-title">Link</header>
                <Link href="https://www.imgtoprompts.com/" className="link link-hover" target="_blank">imgtoprompts</Link>
                <Link href="https://www.indietool.io/" className="link link-hover" target="_blank">Indietool</Link>
            
                <Link target='__blank' href="https://fluxai.pro/" title="Flux AI Pro">Flux AI Pro</Link>
                <Link target='__blank' href="https://whatisaitools.com/" title="What Is Ai Tools">What Is Ai Tools</Link>
                <a target='__blank' href='https://aitooltrek.com' title='AI Tool Trek'> AI Tool Trek </a>
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
