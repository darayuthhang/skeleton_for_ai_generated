'use client'
import React from 'react';
import Link from 'next/link';
const AlertMarketing = (
  // {
  //   text='Design your 3D logo without designer.',
  //   link='https://www.3dlogoai.com/',
  //   tryText="3Dlogoai"
  // }
  // {
  //   text='Generate social media content ideas in seconds .',
  //   link='https://www.contentideapro.com/',
  //   tryText="Contentideapro"
  // }

  // {
  //   text='Increase traffics to your start up.',
  //   link='https://www.indietool.io/',
  //   tryText="Indietool"
  // }
  {
    text='Our server is down right now because of heavy volume.',
    link='',
    tryText="Indietool"
  }
  // {
  //   text='Boost your SEO.',
  //   link='https://www.altcheckerai.io/',
  //   tryText="Altchecker"
  // }
  // {
  //   text='Get professional business headshots in minutes',
  //   link='https://www.headshotpro.com?via=darayuth',
  //   tryText="Headshotpro"
  // }
  // {
  //   text='Turn image into prompt.',
  //   link='https://www.imgtoprompts.com',
  //   tryText="Image to prompt"
  // }
) => {
return (
  <div role="alert" className="  alert alert-primary  
  text-lg w-full font-bold">
  <div></div>
  <span className="w-full text-center">
  {text}
     {/* <Link className="m-1 btn btn-sm btn-primary font-bold" href={link} target="__blank">Try it now!</Link> */}
  
  </span>
</div>
);
}
export default AlertMarketing;