import Link from 'next/link';
import React from 'react';
import constants from '@/app/lib/constants';
import Image from 'next/image';
import myProfile from '../../asset/my_profile_icon.png';
const BuildWithLove = () => {
    return (
        <div>
            <div className='text-white'>Built with <span className='text-danger'>&hearts;</span> by
                <Link href={constants.TWITTER_URL} className='ms-2 text-success'>
                    Yuth
                    <Image
                        className='rounded-circle ms-1'
                        src={myProfile}
                        alt="User"
                    // width={60}
                    // height={30}
                    />
                </Link>
            </div>
        </div>
    );
};

export default BuildWithLove;
