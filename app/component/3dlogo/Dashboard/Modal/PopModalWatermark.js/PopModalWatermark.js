'use client'
import React from 'react';
const PopModalWatermark = () => {
return (
<div>
  <dialog id="pop_modal_water_mark" className="modal modal-bottom sm:modal-middle">
    <div className="modal-box">
      <h3 className="font-bold text-lg">🎉 Thank You for Downloading!</h3>
      <p className="py-4">
        We hope you love your design! 🚀 If you want to download the image without a watermark, please consider buying any of our plans. Unlock premium features and get the best version of your logo!
      </p>
      <div className="modal-action">
        <button className="btn btn-secondary" 
           onClick={() =>
            document
              .getElementById("card-modal-pricing")
              .showModal()
          }
        >
          Upgrade Now
        </button>
        <form method="dialog">
          <button className="btn">Close</button>
        </form>
      </div>
    </div>
  </dialog>
</div>
);
}
export default PopModalWatermark;