'use client'
import React from 'react';
import { threeDModel } from '@/app/lib/3d-logo-constant';
import Image from 'next/image';
import { COLOR_BLACK_OR_WHITE_AND_FULL_COLOR } from '@/app/lib/3d-logo-constant';

const ColorModal = ({handleClick, data = []}) => {
return (
<div>
<dialog id="color_modal" className="modal">
  <div className="modal-box">
    <h3 className="font-bold text-lg">Select your color</h3>
    <div className='grid grid-cols-2 gap-3 '>
          {COLOR_BLACK_OR_WHITE_AND_FULL_COLOR.map((val, index) => 
          <div         
          key={val?.id} 
          onClick={(e) => handleClick(e, val.valueForBackEnd)}
          className={`border hover:border-secondary 
            rounded-md cursor-pointer flex flex-col 
          items-center justify-center`}>
             <Image 
      
              width={200}
              height={200}
              
              alt="color"
              className=' rounded-md w-full'
              src={val?.image_url}
            />
            <span className='text-center'>{val.value}</span>
         
        </div>
         )}
           
    </div>
    {/* <div className='py-4'>
        <div className='grid grid-cols-3 gap-3'>
        {data?.map((val, index) => 
           <button 
           onClick={(e) => handleClick(e, val)}
           className='btn  btn-sm border-2 border-slate-200 '
           style={{background:val}}
           ></button>
       
        )}
        </div>
      
    </div> */}
    {/* <p className="py-4">Press ESC key or click the button below to close</p> */}
    <div className="modal-action">
      <form method="dialog">
        {/* if there is a button in form, it will close the modal */}
        <button className="btn">Close</button>
      </form>
    </div>
  </div>
</dialog>
</div>
);
}
export default ColorModal;