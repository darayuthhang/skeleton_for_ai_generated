"use client";

import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";

import Navigation from "../../Navigation/Navigation";
import useFetch from "@/app/lib/axios/useFetch";
import SubValidationModal from "../../SubValidationModal/SubValidationModal";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import DashboardTab from "./DashboardTap";
import { usePathname } from "next/navigation";
import { FRONT_ENDPOINT } from "@/app/lib/front-end-point";
import { unSub } from "./DashboardApi";
import ImageList from "./ImageList";

const Previous = ({ userId }) => {
  const pathname = usePathname();

  const [subLoading, setSubLoading] = useState(false);

  const keyUrl1 = `/v1/${userId}/sub`;
  const { data: data1, error: error1, isLoading: isLoading1, mutate: mutate1 } = useFetch(keyUrl1);
  
  const isSub = data1?.data?.has_access || null;
  const subId = data1?.data?.stripe_sub_id || null;
  const remainRequest = data1?.remainRequest;


  const handleModalUnSub = () => {
    document.getElementById("sub-validation-modal").showModal();
  };
  const handleUnsub = async (e) => {
    e.preventDefault();
    setSubLoading(true);
    //send to back end with sub id
    const data = { subId };
    try {
      const alertText = `Thank you for your support. Even though you've unsubscribed, you can keep and use your remaining searches. Your searches will reset at the end of your billing cycle. If you have any questions, feel free to contact us.`;
      await unSub(data, userId);
      setSubLoading(false);

      document.getElementById("sub-validation-modal").close();
    } catch (error) {
      console.log(error);
      setSubLoading(false);
    }
  };


  return (
    <div>
      <SubValidationModal
        subId={subId}
        subLoading={subLoading}
        handleUnsub={handleUnsub}
      />
      <ToastContainer />
      <Navigation
        isSub={isSub}
        handleModalUnSub={handleModalUnSub}
        remainRequest={remainRequest}
      />
      <DashboardTab />
      <div className="mt-20">
      <ImageList 
       userId={userId}
       isSub={isSub}
      />
      </div>
      
    </div>
  );
};
export default Previous;
