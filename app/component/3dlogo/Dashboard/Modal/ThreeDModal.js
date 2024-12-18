'use client'
import Image from 'next/image';
import React from 'react';

const ThreeDModal = ({handleClick, data = []}) => {
return (
<div>
<dialog id="three_d_modal" className="modal">
  <div className="modal-box">
    <h3 className="font-bold text-lg">Select your 3d Model</h3>
    <div className='py-4'>
        <div className='grid grid-cols-3 gap-3'>
        {data?.map((val, index) => 
       
            <div className=" " key={index}   onClick={(e) => handleClick(e, val?.text)}>
              <Image 
                width={100}
                height={100}
                alt={val?.text}
                src={val?.image_url}
              />
            <button 
              
                className='btn btn-sm '>
                {val?.text}
            </button>
          
        </div>
       
        )}
        </div>
    </div>
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
export default ThreeDModal;