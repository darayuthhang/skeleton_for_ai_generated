import React from "react";
import Link from "next/link";
import AvatarRating from "./AvatarRating";
import Image from "next/image";
import constants from "@/app/lib/constants";
const Hero = ({ addEmail, title, description }) => {
  const badgeHTML = `<a href="https://www.producthunt.com/posts/image-to-prompts?embed=true&utm_source=badge-featured&utm_medium=badge&utm_souce=badge-image&#0045;to&#0045;prompts" target="_blank"><img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=465150&theme=light" alt="Image&#0032;to&#0032;prompts - Turn&#0032;your&#0032;images&#0032;into&#0032;prompts | Product Hunt" style="width: 250px; height: 54px;" width="250" height="54" /></a>`;
  
  return (
    <div className="hero  ">
      <div className="hero-content py-20 grid  lg:grid-cols-2 ">
        <div className="order-2 flex justify-center    ">
        <Image 
        src="/image/hero-image.png" 
        alt="icon" 
        width={500} 
        height={500} 
        className="border rounded-md"/>
        {/* <section class="relative w-full lg:w-auto max-w-full flex-[50%]">
                 
                    </section> */}
    
        </div>

        <form method="POST">
          <div className="mt-2 mb-3">
            <h1
              className="text-3xl
              capitalize
                                text-center
                                md:text-left
                                md:text-6xl 
                                font-bold Monaco
                                text-white
                               
                                 "
            >
             &#9997; {title}
            </h1>

            <div className="text-center md:text-start mt-10 mb-10 leading-relaxed text-white font-bold text-lg">
             {description}
             </div>

             {/* <div className="text-center md:text-start mt-10 mb-10 leading-relaxed text-white font-bold text-lg">
             Then, sell your unique prompts on <Link href="https://promptbase.com/" target="_blank" className="link link-primary">promptbase.com</Link> and you may start earning!           
             </div> */}

            <div className="flex justify-center mb-2 md:justify-start lg:justify-start">
              {constants.IS_SCROLL_PAY_PLAN ? 
                  <Link
                  href="#pricing"
                  onClick={scrollTo}
                  className="btn btn-secondary btn-wide  "
                >
                  &#9997; {constants.BTN_TEXT.GET_STARTED}
                </Link>
                :
                <Link
                href="/user/signup"
              
                className="btn btn-secondary btn-wide  "
              >
                &#9997; {constants.BTN_TEXT.GET_STARTED}
              </Link>

              }
            
            </div>
            {/* <Link
              href="https://buy.stripe.com/test_28odQU27XcE82xGcMM"
            >
              Get link
            </Link> */}
            <div className="flex justify-center md:justify-start lg:justify-start mt-4 mb-4 gap-2" >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    class="mt-[2px] w-5 h-5 text-green-500"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <div className="">No credit card required </div>
                  
            </div>
            <AvatarRating />
            <br></br>
            {/********** Product hunt Badge ************/}
            <div className="flex justify-center md:justify-start lg:justify-start " >
            <div dangerouslySetInnerHTML={{ __html: badgeHTML }} />
              </div>
       

            {/* <div className=" grid ">
              <div className="lg:col-span-1 flex gap-4 flex-col mt-2 mb-2 "> */}

            {/* <div className="flex gap-3 justify-center md:justify-start">
                  <div className="text-sm md:text-lg opacity-80 leading-relaxed">
                    {" "}
                    Create invoices
                  </div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    class="w-5 h-5 text-green-500"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </div>
                <div className="flex gap-3 justify-center md:justify-start">
                  <div className="text-sm md:text-lg opacity-80 leading-relaxed">
                    {" "}
                    Send invoices via email {" "}
                  </div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    class="w-5 h-5 text-green-500"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </div>
                <div className="flex gap-3 justify-center md:justify-start">
                  <div className="text-sm md:text-lg opacity-80 leading-relaxed">
                    {" "}
                    Save invoices for future audit{" "}
                  </div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    class="w-5 h-5 text-green-500"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </div> */}

        
          </div>
        </form>
      </div>
    </div>
  );
};

export default Hero;
