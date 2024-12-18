'use client'
import React from 'react';
const IndustryModal = ({handleClick, data = []}) => {
return (
<div>
<dialog id="industry_modal" className="modal">
  <div className="modal-box">
    <h3 className="font-bold text-lg">Select Industry</h3>
    <div className='py-4'>
        <div className='grid grid-cols-3 gap-3'>
        {data?.map((val, index) => 
           <button 
           onClick={(e) => handleClick(e, val)}
           className='btn  btn-sm border-2 border-slate-200 '
           
           >{val}</button>
       
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
export default IndustryModal;