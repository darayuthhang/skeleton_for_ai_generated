'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
const link = {
    xUrl:`https://x.com/DarayuthH/status/1811294854640554291`,
    redditUrl:`https://www.reddit.com/r/SideProject/comments/1e0jjyw/i_made_the_app_to_help_users_create_3d_logo/`,
    productHuntUrl:"https://www.producthunt.com/posts/3dlogoai",
    hackerNewsUrl:"https://news.ycombinator.com/item?id=40934573#40935243",
    aiForthat:"https://theresanaiforthat.com/ai/3d-logo-ai/?ref=suggest",
    toolify:"https://www.toolify.ai/tool/3dlogoai"
};
const AsSeenIn = () => {
    return (
        <section className='mt-10 mb-10 flex items-center bg-white'>
            <div className='container mx-auto ' >
                <div className='flex flex-col gap-2 items-center md:flex-row md:gap-5 justify-center'>
                    <div className='mt-3 text-xs text-[12px] text-black text-slate-500'>As seen on</div>
                    <Link
                        href={link?.aiForthat}
                        className={`d-flex text-decoration-none `}
                        target="_blank">
                        <Image 
                            width={250}
                            height={250}
                            src="/image/showcase/ai.webp"
                            alt='aiforthat'
                            
                        />
              
                    </Link>
                    <Link
                        href={link?.toolify}
                        className={`d-flex text-decoration-none  `}
                        target="_blank">
                        <Image 
                            width={200}
                            height={200}
                            src="/image/showcase/toolify.webp"
                            alt='toolify'
                            
                        />
              
                    </Link>
                    <Link 
                        href={link.productHuntUrl} 
                        target="_blank" rel="noreferrer" 
                            className=' mb-1 flex hover:opacity-50 hover:saturate-100 hover:contrast-100 duration-100'
                        title="Featured on Product Hunt"
                        >
                        <svg className="w-8 md:w-9 contrast-50 opacity-80 hover:opacity-50 hover:saturate-100 hover:contrast-100 duration-100 cursor-pointer" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="a"><stop stop-color="#DA552F" offset="0%" /><stop stop-color="#D04B25" offset="100%" /></linearGradient></defs><g fill="none" fill-rule="evenodd"><path d="M128 256c70.694 0 128-57.306 128-128S198.694 0 128 0 0 57.306 0 128s57.306 128 128 128z" fill="url(#a)" /><path d="M96 76.8v102.4h19.2v-32h29.056c19.296-.512 34.944-16.16 34.944-35.2 0-19.552-15.648-35.2-34.944-35.2H96zm48.493 51.2H115.2V96h29.293c8.563 0 15.507 7.168 15.507 16s-6.944 16-15.507 16z" fill="#FFF" /></g></svg>
                       <div className='flex ml-2 items-center font-bold md:text-xl'>
                            <div>Product Hunt</div>
                       </div>
                    </Link>
                    <Link 
                        href={link.hackerNewsUrl} 
                        target="_blank" rel="noreferrer" 
                        className=' mb-1  flex  hover:opacity-50 hover:saturate-100 hover:contrast-100 duration-100 '
                        title="Featured on Hackers New">
                        <svg className="w-8 md:w-8  contrast-50 opacity-80" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="hacker-news"><path fill="#F36003" d="M24 2.571A2.572 2.572 0 0 0 21.429 0H2.571A2.572 2.572 0 0 0 0 2.571v18.857A2.572 2.572 0 0 0 2.571 24h18.857A2.572 2.572 0 0 0 24 21.429V2.571zm-11.186 10.88v5.406h-1.682v-5.502L6.856 5.143h1.998c2.812 5.266 2.635 5.422 3.177 6.728.659-1.447.311-1.307 3.247-6.728h1.864l-4.329 8.309h.001z"></path></svg>
                        <div className='flex ml-2 items-center font-bold md:text-xl'>
                            <div>Hacker news</div>
                        </div>
                    </Link>
                    <Link
                        href={link?.xUrl}
                        className={`flex`}
                        target="_blank" rel="noopener noreferrer">
                        <svg class="w-8 md:w-9 contrast-50 opacity-80 hover:opacity-50 hover:saturate-100 hover:contrast-100 duration-100 cursor-pointer" viewBox="0 0 252 252" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_177_29)"><path d="M126 250.793C195.036 250.793 251 194.875 251 125.897C251 56.9181 195.036 1 126 1C56.9644 1 1 56.9181 1 125.897C1 194.875 56.9644 250.793 126 250.793Z" fill="black" stroke="white" stroke-miterlimit="10"></path><path d="M48.9999 53.5352L108.748 133.357L48.6233 198.256H62.1561L114.797 141.435L157.327 198.256H203.377L140.265 113.945L196.23 53.5352H182.697L134.219 105.865L95.0494 53.5352H48.9999ZM68.9004 63.4941H90.0554L183.474 188.297H162.319L68.9004 63.4941Z" fill="white"></path></g><defs><clipPath id="clip0_177_29"><rect width="252" height="252" fill="white"></rect></clipPath></defs></svg>
                    </Link>
                    <Link
                        href={link?.redditUrl}
                        className={`d-flex text-decoration-none `}
                        target="_blank" rel="noopener noreferrer">
                        <svg className=' mt-1 mb-1 w-8 md:w-9 contrast-50 opacity-80 hover:opacity-50 hover:saturate-100 hover:contrast-100 duration-100 cursor-pointer' viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="128" cy="128" r="128" fill="#FF4500" />
                            <path fill="#FFF" d="M213.15 129.22c0-10.376-8.391-18.617-18.617-18.617a18.74 18.74 0 0 0-12.97 5.189c-12.818-9.157-30.368-15.107-49.9-15.87l8.544-39.981l27.773 5.95c.307 7.02 6.104 12.667 13.278 12.667c7.324 0 13.275-5.95 13.275-13.278c0-7.324-5.95-13.275-13.275-13.275c-5.188 0-9.768 3.052-11.904 7.478l-30.976-6.562c-.916-.154-1.832 0-2.443.458c-.763.458-1.22 1.22-1.371 2.136l-9.464 44.558c-19.837.612-37.692 6.562-50.662 15.872a18.74 18.74 0 0 0-12.971-5.188c-10.377 0-18.617 8.391-18.617 18.617c0 7.629 4.577 14.037 10.988 16.939a33.598 33.598 0 0 0-.458 5.646c0 28.686 33.42 52.036 74.621 52.036c41.202 0 74.622-23.196 74.622-52.036a35.29 35.29 0 0 0-.458-5.646c6.408-2.902 10.985-9.464 10.985-17.093ZM85.272 142.495c0-7.324 5.95-13.275 13.278-13.275c7.324 0 13.275 5.95 13.275 13.275s-5.95 13.278-13.275 13.278c-7.327.15-13.278-5.953-13.278-13.278Zm74.317 35.251c-9.156 9.157-26.553 9.768-31.588 9.768c-5.188 0-22.584-.765-31.59-9.768c-1.371-1.373-1.371-3.51 0-4.883c1.374-1.371 3.51-1.371 4.884 0c5.8 5.8 18.008 7.782 26.706 7.782c8.699 0 21.058-1.983 26.704-7.782c1.374-1.371 3.51-1.371 4.884 0c1.22 1.373 1.22 3.51 0 4.883Zm-2.443-21.822c-7.325 0-13.275-5.95-13.275-13.275s5.95-13.275 13.275-13.275c7.327 0 13.277 5.95 13.277 13.275c0 7.17-5.95 13.275-13.277 13.275Z" />
                        </svg>
              
                    </Link>
             
             
                   
                   
                </div>
            </div>
        </section>
       
    );
};

export default AsSeenIn;
