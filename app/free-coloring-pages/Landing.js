'use client'
import React from 'react';
import Navigation from '../component/Navigation/Navigation';
import constants from '../lib/constants';
import Link from 'next/link';
import ListOfCategory from './ListOfCategory';
import { categoryOfAnimals, popularCartoonCharacters, fantasyAnimals } from '../lib/app-constant';
import Breadcrumbs from '../component/Landing/BreadCrump';
const Landing = ({h1, p}) => {
return (
<div>
    <Navigation 
        explore={true}
    />
<div className="hero  ">
  <div className="hero-content text-center">
    <div className="max-w-lg">
        <div className='flex justify-center'>
        <Breadcrumbs />
        </div>
      
      <h1 className="text-5xl font-bold">{h1}</h1>
      <p className="py-6">
        {p}
      </p>

      <div className="mt-4">
            {constants.IS_SCROLL_PAY_PLAN ? (
              <Link
                href="#pricing"
                onClick={scrollTo}
                className="btn bg-redRose text-white "
              >
                &#9997; {constants.BTN_TEXT.GET_STARTED}
              </Link>
            ) : (
              <Link href="/user/signup" className="btn bg-redRose text-white ">
                &#9997; {constants.BTN_TEXT.GET_STARTED}
              </Link>
            )}
          </div>

       
    </div>
  </div>
</div>


<ListOfCategory 
            list={categoryOfAnimals}
            heading="The most popular category of animals"
        />
        <ListOfCategory 
            list={popularCartoonCharacters}
            heading="The most popular category of Cartoon Characters"
        />
    <ListOfCategory 
            list={fantasyAnimals}
            heading="The most popular category of fantasy animals"
        />


</div>
);
}
export default Landing;