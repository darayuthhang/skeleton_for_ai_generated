'use client'
import React from 'react';
const NotFound = () => {
return (
<div  class="bg-gray-100 flex items-center justify-center h-screen">
<div class="text-center p-6 bg-white rounded-lg shadow-lg max-w-md mx-auto">
    <h1 class="text-6xl font-bold text-red-600">404</h1>
    <p class="text-xl font-semibold text-gray-700 mt-4">Page Not Found</p>
    <p class="text-gray-600 mt-2">Sorry, the page you are looking for doesn't exist.</p>
    <a href="/" class="mt-6 inline-block px-6 py-3 bg-blue-500 text-white font-medium text-sm leading-tight uppercase rounded shadow-md hover:bg-blue-600 hover:shadow-lg focus:bg-blue-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-700 active:shadow-lg transition duration-150 ease-in-out">
      Go Home
    </a>
  </div>
</div>
);
}
export default NotFound;