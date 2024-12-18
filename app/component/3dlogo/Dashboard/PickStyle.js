'use client'
import React from 'react';
const PickStyle = ({defaultValue, pickStyleError}) => {
return (
    <div className="pick-a-style ">
    <div className="label-text mb-1 ">Pick a style</div>
    <button
      onClick={(e) => {
        e.preventDefault();
        document.getElementById("style_modal").showModal();
      }}
      className="flex btn btn-outline btn-wide  w-full max-w-xs btn-sm"
    >
      {defaultValue}
      <svg
        viewBox="0 0 24 24"
        className="h-6 w-6"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
          {" "}
          <path
            d="M15 8L19 12M19 12L15 16M19 12H5"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
          ></path>{" "}
        </g>
      </svg>
    </button>
    {pickStyleError && <div className='text-rose-600'>{pickStyleError}</div>}
  </div>
);
}
export default PickStyle;