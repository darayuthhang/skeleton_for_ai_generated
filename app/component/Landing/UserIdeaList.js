'use client'
import React from 'react';
import Link from 'next/link';

const UserIdeaList = ({userListIdeas}) => {
return (
<div className=''>
    <div className='text-center text-xl'>Check what problems the other 23 founders are searching for.</div>
    <p className='text-sm text-slate-600 text-center mt-2'>We only show results from the free search.</p>
    <div className="mt-10 grid lg:grid-cols-6 gap-4">
        {userListIdeas?.map((val, index) => 
          <figure className="relative h-full w-full max-w-[550px] p-6 rounded-xl border border-base-content/20 bg-base-100">
          <blockquote className="relative">
            <div className="text-base xl:text-sm text-base-content">
              {val?.prompt?.replace(/-/g, ' ')}
            </div>
          </blockquote>
          <figcaption className="relative flex items-center justify-start gap-4 pt-4 mt-4 border-t border-base-content/10">
            <div className="w-full flex items-end justify-between gap-2">
              <div>
                <div className="text-sm font-medium text-base-content">
                @founder {val?.user?.name}
                </div>
                <div className="mt-0.5 text-sm text-base-content/60"></div>
              </div>
            </div>
          </figcaption>
        </figure>
        )}
      </div>
    <div className='flex justify-center mt-5'>
    <Link className='btn btn-secondary' href="/startupideas">Explore Startup idea </Link>
    </div>
    
</div>
);
}
export default UserIdeaList;