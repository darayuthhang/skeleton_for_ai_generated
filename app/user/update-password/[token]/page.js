'use client'
import React, { useState } from 'react';
import axios from '../../../lib/axios/Axios';
import BackEndPoint from '@/app/lib/BackEndPoint';
import helpers from '@/app/lib/helpers';
import { useRouter } from 'next/navigation'
import constants from '@/app/lib/constants';

const UpdatePassword = ({ params }) => {
    const [updatePasswordError, setupdatePasswordError] = useState("");
    const [updatePasswordRequest, setupdatePasswordRequest] = useState(false);
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordNotMatch, setPasswordNotMatch] = useState(false);
    const router = useRouter();
    const token = params?.token;


    const apiPostMethod = async () => {
        if (!token) return;

        setupdatePasswordRequest(true);
        //set token to back-end
        // setupdatePasswordRequest(true);
        try {
            let response = await axios.put(
                BackEndPoint.USER_UPDATE_PASSWORD, { token, password });
            setupdatePasswordRequest(false);
            router.push(constants.USER_LOGIN);
            // navigate(ReactEndPoint.LOGIN);
            // navigate(ReactEndPoint.VERIFY_USER);
            //redirect
        } catch (error) {
            if (error?.response?.status === 500) setupdatePasswordError("Email does not exist .")
            if (error?.response?.status === 404) setupdatePasswordError("Unable to find user .")
            if (error?.response?.status === 400) setupdatePasswordError("An error occurred. .")
            setupdatePasswordRequest(false);
        }
    }
    const onhandleSubmit = (e) => {
        e.preventDefault();

        if (confirmPassword === password) {
            apiPostMethod()
        } else {
            setPasswordNotMatch(true);
        }
    }
    const onhandleChangeNewPassword = (e) => {
        setPassword(e.target.value)
        setPasswordError(helpers.checkForPasswordError(e.target.value))
        resetStateToDefault();
    }
    const onhandleChangeConfirmPassword = (e) => {
        setConfirmPassword(e.target.value)
        resetStateToDefault()
    }
    const resetStateToDefault = () => {
        if (updatePasswordError) setupdatePasswordError('');
        if (passwordNotMatch) setPasswordNotMatch(false);
        if (updatePasswordRequest) setupdatePasswordRequest(false);
    }
    return (
        <div className="container mx-auto">
            <div className="flex flex-col justify-center items-center h-screen">
                <form onSubmit={onhandleSubmit} className=''>
                    <h1 className="text-4xl">Update Password</h1>
                    <div className="label">
                        <span className="label-text font-bold ">New password:</span>
                    </div>
                    <input
                        type="password"
                        className="input input-bordered w-full max-w-xs "
                        onChange={onhandleChangeNewPassword}
                        id="password"
                        placeholder="New password" required />
                    {passwordError && <div className='text-rose-600'>{passwordError}</div>}
                    <div className="label">
                        <span className="label-text font-bold ">Confirm password:</span>
                    </div>
                    <input
                        type="password"
                        onChange={onhandleChangeConfirmPassword}
                        id="password"
                        className="input input-bordered w-full max-w-xs "
                        placeholder="Confirm password" required />
                    {passwordNotMatch && <div className='text-rose-600'>Cannot Update password</div>}
                    <button
                        className='btn btn-neutral mt-3'
                        // disabled={updatePasswordRequest}
                        type="submit"
                    >
                        {updatePasswordRequest ? 'Loading' : 'Update password'}
                    </button>
                    {updatePasswordError && <div className='text-rose-600'>Cannot Update password</div>}
                </form>
            </div>
        </div>
    );
};

export default UpdatePassword; 
