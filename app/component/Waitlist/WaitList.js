"use client";
import React from "react";

import { addEmail } from "@/app/action";

import { ToastContainer, toast } from "react-toastify";
import { useFormStatus, useFormState } from "react-dom";

const initialState = {
  message: "",
};
const WaitList = () => {
  const url = `/image/mid-journey.webp`;
  const [state, formAction] = useFormState(addEmail, initialState);
  const status = useFormStatus();

  return (
    <div className="container mx-auto">
      {/* <Navigation /> */}
      <ToastContainer />
      <div className="flex justify-center  ">
        <form action={formAction} method="POST">
          <div className="join ">
            <input
              name="email"
              className="input input-bordered join-item"
              placeholder="Email"
              required
            />
            <button
              className="btn btn-success join-item rounded-r-full"
              type="submit"
              disabled={status?.pending}
            >
              {state?.pending ? "Submitting..." : "Joinwaitlist"}
            </button>
          </div>
          <div className="text-green-600">{state?.message}</div>
        </form>
      </div>
    </div>
  );
};

export default WaitList;
