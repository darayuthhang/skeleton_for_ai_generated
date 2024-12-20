"use client";
import React, { useState, useEffect, Suspense } from "react";

import Link from "next/link";

import constant from "@/app/lib/constants";
import { signIn, signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import jwt_decode from "jwt-decode";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import Image from "next/image";
import useFetch from "@/app/lib/axios/useFetch";
import axios from "@/app/lib/axios/Axios";
import StripePayment from "@/app/lib/stripe/Stripe";
import CardPricingModal from "../CardPricingModal/CardPricingModal";
import { FRONT_ENDPOINT } from "@/app/lib/front-end-point";
import { sendFeedBackApi } from "../3dlogo/Dashboard/DashboardApi";
import constants from "@/app/lib/constants";

const Navigation = ({
  searchSymbolInput,
  onChangeSearchSymbolInput,
  handleSearch,
  credit,
  accountType,
  scrollTo,
  subId,
  account,
  scrollToFaq,
  scrollTowallOfLoveRef,
  scrollToDemoRef,
  freeTool,
  isSub,
  isNavFreeTool,
  handleModalUnSub,
  remainRequest,
  explore,
  userId,
}) => {
  const [paymentLoading, setPaymentLoading] = useState(true);
  const stripe = new StripePayment();
  const [feedBack, setFeedBack] = useState("");

  // useEffect(() => {
  //     setPaymentLoading(false);
  //   return () => {

  //   }
  // }, [])

  const { data: session, status } = useSession();

  const router = useRouter();
  if (session?.refreshToken) {
    var decoded = jwt_decode(session?.refreshToken);
    const isToken = decoded?.exp * 1000 < Date.now();
    if (isToken) {
      const logOut = async () => {
        // await signOut({ redirect: false });
        // window.location.href = "/";
        await signOut({ callbackUrl: process.env.NEXT_PUBLIC_AUTH_URL });
      };
      logOut();
    }
  }
  const onClickLogout = async (e) => {
    e.preventDefault();
    // await signOut({ redirect: false });
    // window.location.href = "/";
    await signOut({ callbackUrl: process.env.NEXT_PUBLIC_AUTH_URL });
  };
  const handleBuyCredit = async (e, accountType) => {
    e.preventDefault();
    setPaymentLoading(false);
    try {
      await stripe.handleCheckout("1", accountType);
      //setPaymentLoading(true);
    } catch (error) {
      setPaymentLoading(true);
    }
  };
  const deleteSubById = async () => {
    setPaymentLoading(false);
    try {
      let result = await axios.delete(`/payment/${subId}/unsub`);
      setPaymentLoading(true);
      router.refresh();
      // console.log(result);
    } catch (error) {
      setPaymentLoading(true);
    }
  };
  const handleModalUnSubscribe = (e) => {
    e.preventDefault();
    if (window.confirm("Are you sure you want to unsubscribe?")) {
      deleteSubById();
    }
    //send delete request to back with sub id
    //subId
  };
  const isAuthenticated = status === constant.NEXT_AUTHENTICATE;
  let typeOfAccount = accountType === "Pro" ? "unsubscribed" : "Upgrade To Pro";

  const scrollToId = (id) => {
    return (event) => {
      event.preventDefault();
      document.getElementById(id)?.scrollIntoView({
        behavior: "smooth",
      });
    };
  };
  const isAccountExpert = false;
  const sendFeedBackEmail = async (e) => {
    e.preventDefault();
    if (feedBack) {
      const data = {
        text: feedBack,
      };
      try {
        await sendFeedBackApi(data, userId);
        alert("Feedback sent");
      } catch (error) {
        console.log(error);
      }
    } else {
    }
  };
  const handleChangeFeedBack = (e) => {
    setFeedBack(e.target.value);
  };
  return (
    <div className={`${isAuthenticated ?"bg-gray-100" : (isNavFreeTool ? "bg-tree" :  "bg-gray-100") } `}>
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <CardPricingModal
        handleBuyCredit={handleBuyCredit}
        paymentLoading={paymentLoading}
      />
      <div className="container mx-auto ">
        <div className="navbar">
          <div
            className={`navbar-start ${isAuthenticated && "hidden"}   lg:flex`}
          >
            <Link
              className=" link link-hover btn btn-ghost text-xl border "
              href="/"
            >
              <Image
                src="/image/showcase/logo.webp"
                width={40}
                height={40}
                alt="logo"
                className="rounded-lg"
              />
              {isAuthenticated ? (
                <strong className="  font-bold  md:text-lg">
                  {constants.APP_NAME_FOR_HEADING}
                </strong>
              ) : (
                <strong className="  font-bold text-shadow-3d text-green-100  md:text-lg">
 {constants.APP_NAME_FOR_HEADING}                </strong>
              )}
            </Link>
          </div>

          {isAuthenticated ? (
            <div className="md:navbar-end">
              <ul className="menu menu-horizontal ">
                <div className="dropdown md:dropdown-end">
                  <div tabIndex={0} role="button" className="btn btn-sm">
                    Feedback
                  </div>
                  <div
                    tabIndex={0}
                    className="dropdown-content  z-[1] w-96  bg-neutral border border-neutral p-2"
                  >
                    <textarea
                      placeholder="Idea to improve product."
                      onChange={handleChangeFeedBack}
                      className="textarea textarea-bordered textarea-lg w-full "
                    ></textarea>
                    <div className="flex  ">
                      <div className="text-white">
                        Your feedback is valuable to us.
                      </div>

                      <button
                        onClick={sendFeedBackEmail}
                        className="ml-auto btn btn-secondary btn-sm"
                      >
                        Send
                      </button>
                    </div>
                  </div>
                </div>

                <li className="ml-1 mr-1">
                  {!isSub ? (
                    <button
                      className=" text-white  btn btn-secondary btn-sm"
                      onClick={() =>
                        document
                          .getElementById("card-modal-pricing")
                          .showModal()
                      }
                    >
                      Buy more +
                    </button>
                  ) : (
                    <button
                      className=" text-white  btn btn-secondary btn-sm"
                      onClick={() =>
                        document
                          .getElementById("card-modal-pricing")
                          .showModal()
                      }
                    >
                      Buy more +
                    </button>
                  )}
                </li>

                <li
                  className="z-10 tooltip tooltip-left"
                  // data-tip="Searches will reset at the end of your billing cycle if you are a subscriber."
                >
                  <details>
                    <summary className="btn btn-sm  ">
                      <span>{remainRequest ? remainRequest : 0} </span>
                      credits left{" "}
                    </summary>
                    <ul className="p-2  rounded-t-none">
                      <li>
                        <Link
                          href={FRONT_ENDPOINT.DASHBOARD}
                          className="link link-secondary"
                        >
                          Dashboard
                        </Link>
                      </li>

                      <li>
                        <a
                          class="link link-secondary"
                          href="mailto:darayuthhang12@gmail.com"
                          target="_blank"
                        >
                          Support
                        </a>
                      </li>
                      <li>
                        <Link
                          onClick={onClickLogout}
                          href="#"
                          className="link link-secondary"
                        >
                          LOGOUT
                        </Link>
                      </li>
                    </ul>
                  </details>
                </li>
              </ul>
            </div>
          ) : (
        
            <div className="navbar-center   lg:flex">
              {!isNavFreeTool && 
                <ul className="menu menu-horizontal  ">
                {!explore ? (
                  <>
                  
                    {!freeTool ? (
                      <li>
                        <Link
                          href="#pricing"
                          className=" hidden md:flex link link-neutral  
                                    font-bold  "
                          onClick={scrollTo}
                        >
                          Pricing
                        </Link>
                      </li>
                    ) : (
                      ""
                    )}


                    <li>
                      <Link
                        href="/logos"
                        className="
                         hidden md:flex link link-neutral   
                                        font-bold
                                        "
                      >
                        Explore
                      </Link>
                    </li>

                    {/* <li>
                  <Link 
                    onClick={scrollToDemoRef}
                     href="#demo"
                    className="link link-neutral          
                                        font-bold "
                                            
                  >
                    Demo
                  </Link>
                </li> */}
                    {/* <li>
                      <Link
                        href="/tools"
                        className="
                    
                           hidden md:flex link link-neutral   
                                        font-bold
                    "
                      >
                        Freetool
                      </Link>
                    </li> */}

                    {/* <li>
                      <Link
                    
                        href="/blog"
                        className="
                    
                        hidden md:flex link link-neutral   
                                     font-bold
                 "
                      >
                       Blog
                      </Link>
                    </li> */}
                  </>
                ) : (
                  <></>
                  // <li>
                  //   <Link
                  //     href="/logos"
                  //     className="link link-neutral
                  //                   font-bold "
                  //   >
                  //     Explore
                  //   </Link>
                  // </li>
                )}
              </ul>
              }
              
            </div>
          )}

          {!isAuthenticated && (
            <div className="navbar-end">
              <Link
                href={constant.USER_LOGIN}
                className="btn  btn-sm font-bold   "
              >
                LOG IN
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navigation;
