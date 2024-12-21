'use client'
import React from 'react';
import Link from 'next/link';
import { addDashToSpace } from '../lib/app-helpers';
const ListOfCategory = ({heading, list}) => {
return (

<div className='mt-10 mb-10'>
    <div className='text-xl md:text-2xl semi-bold text-center'>{heading}</div>
    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-8 2xl:grid-cols-8 gap-4 p-8 text-gray-700'>
    {list.map((val, index) => 
        <Link className='btn btn-md border border-secondary font-bold' key={index} href={`/free-coloring-pages/${addDashToSpace(val?.toLowerCase())}`}>{val}</Link>
    )}
    </div>
   
</div>
);
}
export default ListOfCategory;