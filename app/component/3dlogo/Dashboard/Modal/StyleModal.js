'use client'
import React from 'react';
import Image from 'next/image';

const StyleModal = ({handleClick, data = []}) => {
return (
<div>
<dialog id="style_modal" className="modal">
  <div className="modal-box">
    <h3 className="font-bold text-black text-lg">Select your styles</h3>
    <div className='py-4'>
        <div className='flex flex-wrap gap-4'>
        {data?.map((val, index) => 

<div className="cursor-pointer " key={index}   onClick={(e) => handleClick(e, val?.value)}>
<Image 
   width={100}
   height={100}
  alt="style image"
  src={val?.imageUrl}
/>
<button 

  className='btn btn-sm '>
  {val?.value}
</button>

</div>

          //  <button 
          //  onClick={(e) => handleClick(e, val)}
          //  className='btn  btn-sm border-2 border-slate-500 '>{val}</button>
       
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
export default StyleModal;