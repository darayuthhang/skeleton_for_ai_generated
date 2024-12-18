'use client'
import React, { useEffect, useState } from 'react';

import Image from 'next/image'
import Link from 'next/link'
import { signIn } from "next-auth/react";

import gmail from '../../asset/gmail.png'
import indexConstant from '@/app/lib/constants';
import useUserForm from '@/app/hook/useUserForm';
import helpers from '@/app/lib/helpers';
import styles from './signup.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { createUser } from '@/app/features/userSignup/UserSignupAction';
import { createResentCode } from '@/app/features/resentCode/ResentCodeAction';
import { useGoogleLogin } from '@react-oauth/google';
import { createGoogleUser } from '@/app/features/googleUser/GoogleUserAction';
import { useRouter, useSearchParams } from 'next/navigation'
import { useSession } from "next-auth/react";
import { resetuserSignupError } from '@/app/features/userSignup/UserSignupReducers';
import { resetgoogleUserError } from '@/app/features/googleUser/GoogleUserReducers';
import { resetresentCodeError } from '@/app/features/resentCode/ResentCodeReducers';
import StripePayment from '@/app/lib/stripe/Stripe';
import { FRONT_ENDPOINT } from '@/app/lib/front-end-point';


const stripe = new StripePayment();
/**
 * 
 * @returns The pathname string has been removed and is replaced by usePathname()
The query object has been removed and is replaced by useSearchParams() router.events is not currently supported.
 */
const Signup = () => {
    const { data: session, status } = useSession();
    const router = useRouter();
 
    const dispatch = useDispatch();

    const [name, onhandleChangeName] = useUserForm('');
    const [email, onhandleChangeEmail, paymentLoginErrMessage, setPaymentLoginErrMessage] = useUserForm('');
    const [showSignUpWithEmail, setShowSignUpWIthEmail] = useState(false);

    const [password, onhandleChangePassword, passwordError, setPasswordError] = useUserForm('');
    const { resentCodeRequest, resentCodeError, resentCodeStatus } = useSelector((state) => state.ResentCodeReducers);
    const [googlePaymentErrMessage, setGooglePaymentErrMessage] = useState('');


    const { userSignupRequest, userSignupError, userSignupStatus } = useSelector((state) => state.UserSignupReducers);
    const { googleUserRequest, googleUserError, googleUserStatus } = useSelector((state) => state.GoogleUserReducers);

    const searchParams = useSearchParams();
    const isAccountType = searchParams.has("accountType");
    const accountType = searchParams.get("accountType")

    useEffect(() => {
        const init = async () => {
            if (userSignupStatus === indexConstant.SUCCESS ||
                resentCodeStatus === indexConstant.SUCCESS) {
                if (isAccountType) {
                    // redirect user to checkout stripe payment
                    resetAllStateToDefault();
                    router.push(`/user/${encodeURIComponent(email)}/verifyuser?accountType=${accountType}`);
                } else {
                    //switch route
                    resetAllStateToDefault();
                    router.push(`/user/${encodeURIComponent(email)}/verifyuser`);
                }
            }
            if (googleUserStatus === indexConstant.SUCCESS) {
                router.push(`${indexConstant.USER_LOGIN}`)
                resetAllStateToDefault();
            }
            //resetAllStateToDefault();
        }
        //resetAllStateToDefault();
        init();
        return () => { }
    }, [userSignupStatus, resentCodeStatus, googleUserStatus])

    //prevent issues related to URL parsing and interpretation
    const onhandleSubmit = (e) => {
        e.preventDefault();
        let passMessageError = helpers.checkForPasswordError(password);
        if (passMessageError) {
            setPasswordError(passMessageError);
            return;
        }
       
        /**
         * @Remember 
         *    - If user sign up with custom sign up
         *      with stripe payment, we return token
         *      in verify user page.
         */
        dispatch(createUser({ name, email, password }));
    }
    const onhandleReSentActivateLink = () => {
        if (email) dispatch(createResentCode({ email }))
    }
    const handleGoogleLoginSuccess = async (response) => {
        const googleTokenExist = response?.access_token;
     
        const isUserSignUpWithGoogleAndPayment = isAccountType && googleTokenExist

        //if (isUserSignUpWithGoogleAndPayment) {
        if (googleTokenExist) {
            const nextAuthGoogleLogin = async () => {
                const result = await signIn("google-login-id", {
                    googleToken: googleTokenExist,
                    signUpOrLogin: indexConstant.GOOGLE_PARAM_SIGN_UP,
                    accountType: indexConstant.PRICING.basic,//dont touch it 
                    redirect: false,
                    //callbackUrl: `${process.env.NEXT_PUBLIC_AUTH_URL}/stock-markets/dashboard`, // already check in layout
                });
                if (result?.ok) {
                    if (isUserSignUpWithGoogleAndPayment) {
                                                //make payment with google account
                        const promotekitReferral = window.promotekit_referral
                        await stripe.handleCheckout("1", accountType, promotekitReferral);
                    } 
                    // else if(isAccountType){
                    //     //make payment with custom account
                    //     await stripe.handleCheckout("1", accountType);

                    // }
                     else {
                        router.push(`${FRONT_ENDPOINT.DASHBOARD}`)
                        // router.push(`${frontEndPoint.STOCK_MARKET_DASHBOARD}`)
                    }

                }
                if (result?.error) {
                    const statusCode = result?.error.match(/\d+/)[0]
                    const message = helpers.mapGoogleUserStatusCodeToMessage(statusCode ? parseInt(statusCode) : null);
                    setGooglePaymentErrMessage(message)
                }

            }
            await nextAuthGoogleLogin();
        } else {
            console.log("Google token does not exist. ");
        }

    };

    const GoogleApiLogin = useGoogleLogin({
        onSuccess: tokenResponse => handleGoogleLoginSuccess(tokenResponse),
    });
    const resetAllStateToDefault = () => {
        if (userSignupStatus) dispatch(resetuserSignupError());
        if (resentCodeStatus) dispatch(resetresentCodeError());
        if (googleUserStatus) dispatch(resetgoogleUserError());
        if (googlePaymentErrMessage) setGooglePaymentErrMessage('');
        if (paymentLoginErrMessage) setPaymentLoginErrMessage('');
    }
    const handleshowSignUpWithEmail = () => {
        resetAllStateToDefault();
        if (showSignUpWithEmail === true) {

            setShowSignUpWIthEmail(false)
        } else {

            setShowSignUpWIthEmail(true);
        }
    } 
    return (
        <div className='container  mx-auto  flex justify-center '>
            <div className='flex items-center min-h-screen w-96 p-3'>
                <div className="flex flex-col w-full 
                            border-opacity-50 
                            p-6 rounded-md
                            border-2  shadow-md">
                    <h1 className='text-xl font-sans mr-auto font-bold mb-2 '>SIGN UP</h1>
                    <div className="grid h-20   rounded-box place-items-center">
                        <button
                            className='btn btn-outline min-w-full '
                            onClick={(e) => {
                                e.stopPropagation();
                                GoogleApiLogin()
                            }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="25" viewBox="0 0 48 48">
                                <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
                            </svg>
                            SIGN UP WITH GOOGLE
                        </button>
                    </div>
                    <div className=" divider divider-accent ">OR</div>

                    <div className="grid 
                rounded-box place-items-center min-w-full">
                    
                        <form
                            className=' min-w-full '
                            onSubmit={onhandleSubmit}>
                            <div className="label">
                                <span className="label-text font-bold ">Email</span>
                            </div>
                            <input 
                                type="email" 
                                placeholder="name@example.com" 
                                className="input input-bordered w-full max-w-xs" 
                                onChange={onhandleChangeEmail}
                                required/>
                            {userSignupError?.status === 404 && <div className='text-pink-700'>{userSignupError?.message}</div>}
                            {paymentLoginErrMessage && <div className='text-pink-700'>{paymentLoginErrMessage}</div>}
                            
                            <div className="label">
                                <span className="label-text font-bold ">Name</span>
                            </div>
                            <input 
                                type="text" 
                                placeholder="Name" 
                                className="input input-bordered w-full max-w-xs " 
                                onChange={onhandleChangeName}
                                required/>
                            
                            <div className="label">
                                <span className="label-text font-bold ">Password</span>
                            </div>
                            <input 
                                type="password" 
                                placeholder="Password" 
                                className="input input-bordered w-full max-w-xs" 
                                onChange={onhandleChangePassword}
                                required/>
                            {passwordError && <div className='text-pink-700'>{passwordError}</div>}
                            
                            <button
                                className='btn btn-outline min-w-full mt-3 '
                            >
                                {userSignupRequest ? 'Loading' : 'SIGN UP'}
                            </button>
                        </form>
                        {googlePaymentErrMessage && <div className='text-pink-700'>{googlePaymentErrMessage}</div>}
                        {(googleUserError?.status === 404 || googleUserError?.status === 500) && <div className='text-pink-700'>{googleUserError?.message}</div>}
                        {(googleUserError?.status === 409) && <div className='text-pink-700'>{googleUserError?.message}</div>}
                    </div>
                    <div className="divider"></div>
                    <div className='flex justify-center'>
                        <div className='mr-2 '>Already a user?</div>
                        {userSignupRequest ? "Loading" : <Link className='link link-base ' href={indexConstant.USER_LOGIN}>Login</Link>}
                    </div>
                    
                    {userSignupError?.status === 400 &&
                        <div className='text-center mt-2'>
                            <div className='text-pink-700 mb-1'>
                                Please activate your account
                            </div>
                            <button
                                onClick={onhandleReSentActivateLink}
                                className='btn btn-outline '>
                                {resentCodeRequest ? "Loading ..." : "Resent activate link"}
                            </button>
                            {resentCodeError?.status === 429 && <div className='text-pink-700'>{resentCodeError?.message}</div>}
                        </div>
                    }
                </div>
            </div>
        </div>



    );
};

export default Signup;
