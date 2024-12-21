'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

const Breadcrumbs = ({isBg}) => {
  // Get the current pathname from the Next.js app router
  const pathname = usePathname();

  // Split the pathname into parts and filter out empty strings
  const pathArray = pathname.split('/').filter(Boolean);

  return (
    <div className={`breadcrumbs ${isBg ? "bg-tree text-white" : "text-gray-500" } `}>
      <ul>
        <li>
          <Link href="/" className=''>Home</Link>
        </li>
        {pathArray.map((path, index) => {
          // Create the cumulative href for each breadcrumb
          const href = '/' + pathArray.slice(0, index + 1).join('/');

          return (
            <li key={index} className=''>
              <Link href={href} >
                {path.charAt(0).toUpperCase() + path.slice(1)} {/* Capitalize */}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Breadcrumbs;