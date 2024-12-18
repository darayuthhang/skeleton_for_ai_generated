"use client";
import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const PrivateImage = ({ isSub, isPrivate, handleChangePrivate }) => {
  return (
    <div className={`form-control ${!isSub && `tooltip tooltip-info tooltip-bottom`}`} data-tip={isSub ? "": "You need to become one-time user to set logos to private." }>
      <label className="label cursor-pointer ">
     
        {isSub ? (
          <input
            type="checkbox"
            className="toggle toggle-accent  "
            checked={isPrivate}
            onChange={handleChangePrivate}
          />
        ) : (
          <input
            type="checkbox"
            className="toggle toggle-accent"
            disabled

            // checked={isPrivate}
            // onChange={handleChangePrivate}
          />
        )}
           <span className="label-text ml-2">
          Make my design private
        </span>
      </label>
    </div>
  );
};
export default PrivateImage;
