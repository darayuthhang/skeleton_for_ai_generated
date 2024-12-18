'use client';
import React from 'react';

const ComparisonBenefit = () => {
  return (
    <section className="text-center">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:px-6">
        <h2 className="mb-8 text-3xl tracking-tight font-bold text-gray-900">
          Struggling to design a professional logo for your brand?
        </h2>
        <div className="flex flex-col md:flex-row justify-center items-center md:items-start gap-8 md:gap-12">
             {/* 3DLogo */}
             <div className="bg-green-100/75 text-green-700 p-8 md:p-12 rounded-lg w-full max-w-md">
            <h3 className="font-bold text-lg mb-4">3DLogo by AI</h3>
            <ul className="list-disc list-inside space-y-1.5">
              {[
                'Affordable pricing (starting at $10)',
                'Instantly generate stunning logos',
                'Unlimited revisions at no extra cost',
                'Available 24/7 to suit your schedule',
                'Fully customizable to match your brand',
              ].map((item, index) => (
                <li key={index} className="flex gap-2 items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="w-4 h-4 shrink-0 opacity-75"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  {item.includes('Affordable') ? (
                    <span>
                      Affordable{' '}
                      <a className="underline" href="#pricing">
                        pricing plans
                      </a>
                    </span>
                  ) : (
                    item
                  )}
                </li>
              ))}
            </ul>
          </div>
          {/* Professional Designer */}
          <div className="bg-blue-100/75 text-blue-700 p-8 md:p-12 rounded-lg w-full max-w-md">
            <h3 className="font-bold text-lg mb-4">Professional Designer</h3>
            <ul className="list-disc list-inside space-y-1.5">
              {[
                'High upfront costs ($500-$2000)',
                'Weeks of back-and-forth communication',
                'Limited revisions without additional fees',
                'Depends on designer’s availability',
                'Risk of misaligned vision',
              ].map((item, index) => (
                <li key={index} className="flex gap-2 items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="w-4 h-4 shrink-0 opacity-75"
                  >
                    <path d="M5.28 4.22a.75.75 0 0 0-1.06 1.06L6.94 8l-2.72 2.72a.75.75 0 1 0 1.06 1.06L8 9.06l2.72 2.72a.75.75 0 1 0 1.06-1.06L9.06 8l2.72-2.72a.75.75 0 0 0-1.06-1.06L8 6.94 5.28 4.22Z"></path>
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>
       
        </div>
      </div>
    </section>
  );
};

export default ComparisonBenefit;
