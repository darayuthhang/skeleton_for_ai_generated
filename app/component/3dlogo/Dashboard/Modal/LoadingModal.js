'use client';
import React from 'react';
import SkeletonLoading from '@/app/component/SkeletonLoading/SkeletonLoading';

const LoadingModal = ({ handleClick, data = [] }) => {
  return (
    <div>
      <dialog id="loading_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            Please wait while we are working hard to load your content. Feel free to grab a coffee in the meantime!
          </h3>
          <div className='py-4'>
            <span className="loading loading-dots loading-xs"></span>
            <span className="loading loading-dots loading-sm"></span>
            <span className="loading loading-dots loading-md"></span>
            <span className="loading loading-dots loading-md"></span>
            <span className="loading loading-dots loading-md"></span>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default LoadingModal;