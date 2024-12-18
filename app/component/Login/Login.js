"use client";
import React, { useState, useEffect } from "react";

import Image from "next/image";
import Link from "next/link";
import gmail from "../../asset/gmail.png";
import constants from "@/app/lib/constants";
import { useGoogleLogin } from "@react-oauth/google";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import helpers from "@/app/lib/helpers";
import { createResentCode } from "@/app/features/resentCode/ResentCodeAction";
import { resetresentCodeError } from "@/app/features/resentCode/ResentCodeReducers";
import { FRONT_ENDPOINT } from "@/app/lib/front-end-point";

const Login = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const [statusCodeCustomLogin, setStatusCodeCustomLogin] = useState("");
  const [customLoginLoading, setCustomLoginLoading] = useState(false);
  const [customErrorMessage, setCustomErrorMessage] = useState("");

  const [googleLoading, setGoogleLoading] = useState(false);
  const [statusCodeGmail, setStatusCodeGmail] = useState("");
  const [googleErrorMessage, setGoogleErrorMessage] = useState("");
  const [redirect, setRedirect] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  //fix button
  const { resentCodeRequest, resentCodeError, resentCodeStatus } = useSelector(
    (state) => state.ResentCodeReducers
  );

  useEffect(() => {
    if (resentCodeStatus === constants.SUCCESS) {
      //switch route
      router.push(`/user/${encodeURIComponent(email)}/verifyuser`);
      dispatch(resetresentCodeError());
    }
    return () => {};
  }, [resentCodeStatus]);
  const handleGoogleLoginSuccess = async (response) => {
    const googleTokenExist = response?.access_token;
    if (googleTokenExist) {
      setGoogleLoading(true);
      const result = await signIn("google-login-id", {
        googleToken: googleTokenExist,
        signUpOrLogin: "login",
        redirect: false,
        //callbackUrl: `${process.env.NEXT_PUBLIC_AUTH_URL}/stock-markets/dashboard`, // already check in layout
      });

      if (result?.ok) {
        switchRoute();
      }
      if (result?.error) {
        const statusCode = result?.error.match(/\d+/)[0];
        const message = helpers.mapGoogleUserStatusCodeToMessage(
          statusCode ? parseInt(statusCode) : null
        );
        setStatusCodeGmail(statusCode);
        // const message = helpers.mapGoogleUserStatusCodeToMessage(parseInt(result?.error))
        setGoogleErrorMessage(message);
        setGoogleLoading(false);
      } else {
        //router.push(constants.USER_CODE)  // already check in layout
        setGoogleLoading(false);
      }
    } else {
      console.log("Google token does not exist. ");
    }
  };
  const GoogleApiLogin = useGoogleLogin({
    onSuccess: (tokenResponse) => handleGoogleLoginSuccess(tokenResponse),
  });
  const switchRoute = () => {
    router.push(`${FRONT_ENDPOINT.DASHBOARD}`);
  };
  const onhandleSubmit = async (e) => {
    e.preventDefault();
    try {
      setCustomLoginLoading(true);
      const result = await signIn("custom-user-login-id", {
        email: email,
        password: password,
        redirect: false,
        //callbackUrl: `${process.env.NEXT_PUBLIC_AUTH_URL}/stock-markets/dashboard`,
      });
      if (result?.ok) {
        switchRoute();
      }
      if (result?.error) {
        setStatusCodeCustomLogin(parseInt(result?.error));
        const message = helpers.mapUserLoginStatusCodeToMessage(
          parseInt(result?.error)
        );
        setCustomErrorMessage(message);
        setCustomLoginLoading(false);
      } else {
        setCustomLoginLoading(false);
        // router.push(constants.USER_CODE)
      }
    } catch (error) {
      setCustomLoginLoading(true);
    }
  };
  const onhandleChangeEmail = (e) => {
    resetInputStateTodefault();
    setEmail(e.target.value);
  };
  const onhandleChangePassword = (e) => {
    resetInputStateTodefault();
    setPassword(e.target.value);
  };
  const resetInputStateTodefault = () => {
    if (googleErrorMessage) setGoogleErrorMessage("");
    if (customErrorMessage) setCustomErrorMessage("");
    if (statusCodeCustomLogin) setStatusCodeCustomLogin("");
    if (statusCodeCustomLogin) setStatusCodeCustomLogin("");
    if (resentCodeStatus || resentCodeError) dispatch(resetresentCodeError());
    if (redirect) setRedirect(false);
  };

  const onhandleReSentActivateLink = () => {
    if (email) dispatch(createResentCode({ email }));
  };

  return (
    <div>
      <div className="container  mx-auto  flex justify-center ">
        <div className="flex items-center min-h-screen w-96 p-3">
          <div
            className="flex flex-col w-full 
                            border-opacity-50 
                        
                            p-6 rounded-md
                            border-2  shadow-md"
          >
            <div
              className="grid 
                rounded-box place-items-center min-w-full"
            >
              <h1 className="text-xl font-sans mr-auto font-bold mb-2 ">
                LOGIN
              </h1>
              <form className=" min-w-full " onSubmit={onhandleSubmit}>
                <div className="label">
                  <span className="label-text font-bold ">Email</span>
                </div>
                <input
                  type="email"
                  placeholder="name@example.com"
                  onChange={onhandleChangeEmail}
                  className="input input-bordered w-full max-w-xs text-base"
                  required
                />

                <div className="label">
                  <span className="label-text font-bold ">
                    Password
                  </span>
                </div>
                <input
                  type="password"
                  placeholder="Password"
                  className="input input-bordered w-full max-w-xs"
                  onChange={onhandleChangePassword}
                  required
                />
                <button className="btn btn-outline min-w-full mt-3 ">
                  {customLoginLoading ? "Loading" : "LOGIN"}
                </button>
              </form>
              <div className="ms-auto mt-2 mb-2">
                <Link
                  className="link link-base "
                  href={constants.USER_FORGET_PASSWORD}
                >
                  Forgot password
                </Link>
              </div>
              <div className="flex justify-center mt-3 mb-1">
                <div className="mr-2 ">Need an account?</div>
                {"" ? (
                  "Loading"
                ) : (
                  <Link
                    className="link link-base "
                    href={constants.USER_SIGNUP}
                  >
                    Sign up
                  </Link>
                )}
              </div>
            </div>
            <div className="divider">OR</div>
            <div className="grid h-20   rounded-box place-items-center">
              <button
                className="btn btn-outline min-w-full  "
                onClick={(e) => {
                  e.stopPropagation();
                  GoogleApiLogin();
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="50"
                  height="25"
                  viewBox="0 0 48 48"
                >
                  <path
                    fill="#FFC107"
                    d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                  ></path>
                  <path
                    fill="#FF3D00"
                    d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                  ></path>
                  <path
                    fill="#4CAF50"
                    d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                  ></path>
                  <path
                    fill="#1976D2"
                    d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                  ></path>
                </svg>
                LOGIN WITH GOOGLE
              </button>
              {googleErrorMessage && (
                <div className="text-rose-600">{googleErrorMessage}</div>
              )}
              {customErrorMessage && (
                <div className="text-rose-600">{customErrorMessage}</div>
              )}

              {(statusCodeGmail === 500 || statusCodeCustomLogin === 500) && (
                <div className="text-center">
                  <div className="text-rose-600">
                    Please activate your account
                  </div>
                  <button
                    onClick={onhandleReSentActivateLink}
                    className="btn btn-dark "
                  >
                    {resentCodeRequest ? "Loading ..." : "Resent activate link"}
                  </button>
                  {resentCodeError?.status === 429 && (
                    <div className="text-rose-600">
                      {resentCodeError?.message}
                    </div>
                  )}
                  <br></br>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
