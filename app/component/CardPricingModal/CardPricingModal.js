import React from "react";
import constants from "@/app/lib/constants";
import Link from "next/link";
const CardPricingModal = ({ handleBuyCredit, paymentLoading }) => {
  return (
    <dialog id="card-modal-pricing" className="modal">
      <div className="modal-box max-w-6xl">
        <div className="flex justify-end">
          <form method="dialog">
            <button className="btn">Close</button>
          </form>
        </div>
        <h3 className="font-bold text-lg">Choose your pricing!</h3>
 
        <div className="relative md:p-8 space-y-12 overflow-hidden lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-x-8 rounded-xl">
          {constants.CARD_PRICING_DES.map((val, index) => (
            <div className="relative flex flex-col p-8 border  shadow-lg shadow-cyan-500/10 rounded-2xl ">
              <div className="flex-1 ">
                <h3 className="text-xl font-semibold  ">{val?.header} {val.savePricing === true && <span className='link link-accent text-sm'>save $2.00</span> }</h3>
                <div className="flex items-baseline mt-4  gap-2">
                  <del className="text-xl md:text-2xl">$20</del>
                  <span className="text-xl md:text-5xl font-extrabold tracking-tight">
                    {val?.pricing}
                  </span>
                  {/* <span>usd</span> */}
                  <span className="ml-1 text-xl font-semibold">/ one time</span>
                </div>
                {/* <p className="mt-6 text-gray-500">Once</p> */}

                <ul role="list" className="pt-6 mt-6 space-y-6 border-t">
                  <span className="text-lg font-semibold ">
                    What's included?
                  </span>
                  {val?.offer?.map((val2, index) => 
                                     <li className="flex" key={index}>
                                     <div className="inline-flex items-center w-6 h-6 bg-lime-600 rounded-xl">
                                         <svg className="flex-shrink-0 w-4 h-4 mx-auto " xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                         </svg>
                                     </div>
                                     <span className="ml-3 ">{val2}</span>
                                     {index === 0 && 
                                        <div className="mt-[3px] ml-1 tooltip" data-tip={val?.tool_tip}>
                                        <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" font-size="20px" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0V0z"></path><path d="M11 7h2v2h-2V7zm0 4h2v6h-2v-6zm1-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"></path></svg>
                                        </div>
                                     }
                                     
                                     
                                 </li>
                            )}
                
                 
                </ul>
              </div>
              <div className="mt-6 rounded-lg">
                {/* <button
                  onClick={(e) =>
                    handleBuyCredit(e, val.card_pricing)
                  }
                  type="highlight"
                  className="btn btn-neutral w-full items-center text-white font-medium text-center"
                >
                  {val?.button_text}
                </button> */}
        <button
                  onClick={(e) =>
                    handleBuyCredit(e, val.card_pricing)
                  }
                  type="highlight"
                  className="btn btn-neutral w-full items-center text-white font-medium text-center"
                >
                  {val?.button_text}
                </button>
                <p className="mt-6 ">One-time payment. No subscription</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </dialog>
  );
};

export default CardPricingModal;

//cmt
/***
 *
 *
 *
 */
