'use client';
import React, {useState, useEffect} from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { createResentCode } from '../../../features/resentCode/ResentCodeAction';
import { createVerifyUser } from '@/app/features/verifyUser/VerifyUserAction';
import { resetverifyUserError, resetverifyUserStatus } from '@/app/features/verifyUser/VerifyUserReducers';
import constants from '@/app/lib/constants';
import { useRouter, useSearchParams } from 'next/navigation'
import { resetresentCodeError} from '../../../features/resentCode/ResentCodeReducers';

import StripePayment from '@/app/lib/stripe/Stripe';
import { signIn } from "next-auth/react";
import { BEGINNER_LINK_STRIPE, ENTRY_STRIPE_LINK } from '@/app/lib/stripe/stripe-constant';

import helpers from '@/app/lib/helpers';
import { FRONT_ENDPOINT } from '@/app/lib/front-end-point';

const VerifyUser = ({ params }) => {
    const stripe = new StripePayment();
    
    const [verificationCode, setVerification] = useState('');
    const [verifyUserRequest, setVerifyUserRequest] = useState(false);
    const [verifyUserError, setverifyUserError] = useState('');
    const [email, setEmail] = useState(decodeURIComponent(params?.email));
    //const { verifyUserRequest, verifyUserError, verifyUserStatus } = useSelector((state) => state.VerifyUserReducers)
    const dispatch = useDispatch();
    
    const searchParams = useSearchParams();
    const accountType = searchParams.get("accountType")?.trim();
    const isAccountType = searchParams.has("accountType") && (accountType === constants.PRICING.beginner 
        || accountType === constants.PRICING.one_time_entry 
        || accountType === constants.PRICING.one_time_pay_as_u_go
        || accountType === constants.PRICING.one_time_starter);
    

    const router = useRouter();
    const { resentCodeRequest, resentCodeError, resentCodeStatus } = useSelector((state) => state.ResentCodeReducers);

    // if (isAuthenticated) {
    //     router.push(constants.USER_CODE);
    // }

    // useEffect(() => {
    //     const init = async () => {
    //         if (verifyUserStatus === constants.SUCCESS) {
    //             if (isAccountType) {
    //                 //redirect stripe payment
    //                 // await stripe.handleCheckout('1');
    //                 // dispatch(resetverifyUserStatus());
    //             } else {
    //                 dispatch(resetverifyUserStatus());
    //                 router.push(constants.USER_LOGIN)
    //             }

    //         }
    //     }
    //     init();
    //   return () => {
        
    //   }
    // }, [verifyUserStatus])
    
    // const pathname = usePathname()
    // console.log(pathname);
    const onhandleSubmit = (e) => {
        e.preventDefault();
        const nextAuthSignup = async () => {
            setVerifyUserRequest(true);
            const result = await signIn("custom-user-signup-id", { verificationCode, email, redirect: false });
            if (result?.ok) {
                setVerifyUserRequest(false);
                if(isAccountType){
                    const promotekitReferral = window.promotekit_referral
                 await stripe.handleCheckout("1", accountType.trim(), promotekitReferral); // r
                }else{
                    router.push(FRONT_ENDPOINT.DASHBOARD)
                }
            }
            if (result?.error) {
                setVerifyUserRequest(false);
                /**
                 * @Todo handle error 
                 */
                const statusCode = result?.error.match(/\d+/)[0]
                const message = helpers.mapUserVerifyUserStatusCodeToMessage(statusCode ? parseInt(statusCode) : null);
                setverifyUserError(message);
                // setGooglePaymentErrMessage(message)
            }
        }
        nextAuthSignup();     
    }
    const resetStateToDefault = () => {
        if (verifyUserError) setverifyUserError('');
        if (resentCodeStatus) dispatch(resetresentCodeError());
    }
    //submit to code to back-end
    const handleInputChange = (e) => {
        resetStateToDefault();
        const value = e.target.value.slice(0, 6); // Limit to 6 characters
        setVerification(value);
    };
    const onhandleReSentActivateLink = (e) => {
        e.preventDefault();
        e.stopPropagation();
        resetStateToDefault();
        if (email) dispatch(createResentCode({ email }))
    }
    return (
        <div>
            <div className='container mx-auto'>
                <form className='h-screen  flex items-center justify-center' onSubmit={onhandleSubmit}>
                    <div className='flex flex-col items-center  text-center gap-4'>
                      
                        <h1 className=' text-4xl font-bold'> Verify user</h1>
                        <p className=''>We just send message to your email you entered.
                            <br></br>
                            Please enter code you received below.
                        </p>
                      
                        <input
                            type="text"
                            placeholder="verification code"
                            className="input input-bordered w-full max-w-xs "
                            value={verificationCode}
                            onChange={handleInputChange}
                            // onChange={onhandleChangeName}
                            required />
                        <button className='btn btn-neutral btn-wide'>Submit</button>
                        <button
                            onClick={onhandleReSentActivateLink}
                            className='btn btn-neutral '>
                            {resentCodeRequest ? "Loading ..." : "Resent code link"}
                        </button>
                        {verifyUserError && <div className='text-rose-600'>{verifyUserError}</div>}
                        {
                            verifyUserError &&
                            <div className='text-center'>
                                    <div className='text-rose-600'>
                                    Please activate your account
                                </div>
                                
                                {resentCodeError?.status === 429 && <div className='text-pink'>{resentCodeError?.message}</div>}
                                {resentCodeStatus === constants.SUCCESS && <div className='text-indigo-700'>
                                    Please check your email for the code.</div>}
                            </div>
                        }
                    </div>
                    {/* <Row className='h-100  justify-content-center align-items-center '>
                        <Col xs={12} md={5} lg={5}  className="border text-center p-5 text-black" >
                            
                            <InputGroup className="mb-3">
                                <form.Control 
                                    title="verification code"
                                    className={`${styles['form-control']} `}
                                    type="text"
                                    value={verificationCode}
                                    onChange={handleInputChange}
                                    aria-label="Text input with checkbox" 
                                    placeholder='000000'
                                    readOnly={verifyUserRequest ? true : false}
                                    required
                                />
                                <Button 
                                    type="submit"
                                    disabled={verifyUserRequest}
                                    variant="outline-secondary" 
                                    id="button-addon1">
                                    {verifyUserRequest ? "Loading.." : "Submit"}
                                </Button>
                            </InputGroup>
                            {verifyUserError && <div className='text-pink'>{verifyUserError}</div>}
                            {
                                verifyUserError && 
                                <div className='text-center'>
                                    <div className='text-pink'>
                                        Please activate your account
                                    </div>
                                    <button
                                        onClick={onhandleReSentActivateLink}
                                        className='btn btn-dark'>
                                        {resentCodeRequest ? "Loading ..." : "Resent code link"}
                                    </button>
                                    {resentCodeError?.status === 429 && <div className='text-pink'>{resentCodeError?.message}</div>}
                                    {resentCodeStatus === constants.SUCCESS && <div className='text-indigo-700'>Please check your email for the code.</div>}
                                </div>
                            }
                          
                        </Col>
                    </Row> */}
                </form>
            </div>
           
        </div>
    );
};

export default VerifyUser;
