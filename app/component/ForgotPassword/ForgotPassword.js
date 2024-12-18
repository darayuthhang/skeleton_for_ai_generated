'use client'
import React, { useState } from 'react';
import axios from '../../lib/axios/Axios';
import Link from 'next/link'
import constants from '@/app/lib/constants';
import BackEndPoint from '@/app/lib/BackEndPoint';



const ForgetPassword = () => {
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");
    const [emailRequest, setEmailRequest] = useState(false);
    const [emailSuccess, setEmailSuccess] = useState("");

    const apiPostMethod = async () => {
        setEmailRequest(true);
        try {
            let response = await axios.post(BackEndPoint.USER_RESET_PASSWORD, { email });
            setEmailRequest(false);
            setEmailSuccess("Plese check your email for the link to reset password .")
            //navigate(ReactEndPoint.UPDATE_PASSWORD);
            //redirect
        } catch (error) {
            if (error?.response?.status === 422) setEmailError("Internal error. we will get it fixed.")
            if (error?.response?.status === 400) setEmailError("Internal error. we will get it fixed.")
            if (error?.response?.status === 500) setEmailError("Internal error. we will get it fixed.")
            if (error?.response?.status === 404) setEmailError("Email does not exist")
            setEmailRequest(false);
        }
    }
    const onhandleSubmitEmail = async (e) => {
        e.preventDefault();
        if (email) await apiPostMethod();
    }
    const onhandleChangeEmail = (e) => {
        setEmail(e.target.value)
        if (emailError) setEmailError('')
        if (emailSuccess) setEmailSuccess('')
    }
    return (
        <div className="container mx-auto grid justify-center p-3">
            <h1 className="mt-4 mb-3 font-mono text-4xl font-bold ">Reset Password</h1>
            <div className="">
                <div className=" ">
                    <form onSubmit={onhandleSubmitEmail}>
                        <div className="label">
                            <span className="label-text font-bold ">Email</span>
                        </div>
                        <input 
                        type="email" 
                        placeholder="name@example.com" 
                        className="input 
                        input-bordered min-w-full max-w-xs" 
                        onChange={onhandleChangeEmail}
                            readOnly={emailRequest ? true : false}
                        required />
                        {emailError && <div className='text-pink-700'>{emailError}</div>}
                        {/* <div className="form-group">
                            <label for="email">Email address:</label>
                            <input
                                type="email"
                                className="form-control"
                                onChange={onhandleChangeEmail}
                                id="email"
                                readOnly={emailRequest ? true : false}
                                placeholder="Enter email" required />
                          
                        </div> */}
                        <button
                            type='submit'
                            className='
                             btn btn-outline 
                            mt-3 mb-3 min-w-full text-white'>
                            {emailRequest ? 'Loading ...' : 'Reset password'}
                        </button>
                        {/* <Button
                            className='mt-3 w-100 shadow  rounded '
                            variant="dark"
                            disabled={emailRequest}
                            type="submit"
                        >
                            {emailRequest ? 'Loading ...' : 'Reset password'}
                        </Button> */}
                        {emailSuccess && <div className='text-pink-700'>{emailSuccess}</div>}
                    </form>
                    <div className='flex gap-2 justify-center text-white'>
                        <p>Don't have an account?</p>
                       
                        <Link href={constants.USER_SIGNUP} className='link link-neutral text-white'>
                                {emailRequest ? "Loading ..." : "Sign up"}
                            </Link>
                       
                        
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgetPassword;
