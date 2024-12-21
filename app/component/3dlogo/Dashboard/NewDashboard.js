"use client";

import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";

import { createCollectData, createRegenerate, getInngest } from "./DashboardApi";
import Navigation from "../../Navigation/Navigation";
import useFetch from "@/app/lib/axios/useFetch";
import SubValidationModal from "../../SubValidationModal/SubValidationModal";
import { createNewPrompts, createPrivateImage, unSub } from "./DashboardApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DashboardTab from "./DashboardTap";
import { usePathname, useSearchParams } from "next/navigation";

import { generateRandom3DLogoIdea } from "@/app/lib/app-helpers";
import Image from "next/image";


import GenerateLogo from "./GenerateLogo";
import PrivateImage from "./PrivateImage";
import LoadingModal from "./Modal/LoadingModal";
import FeedbackModal from "./Modal/FeedbackModal";


// Import Konva filters


import axios from "axios";
import { saveAs } from "file-saver";
import Swal from "sweetalert2";

import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  WhatsappIcon,
  RedditIcon,
  RedditShareButton,
} from "react-share";
import EmailModal from "./Modal/EmailModal";
import PickStyle from "./PickStyle";
import StyleModal from "./Modal/StyleModal";

const PROMPT_TYPE = {
  PROMPT_1: "PROMPT_1",
  PROMPT_2: "PROMPT_2",
  PROMPT_3: "PROMPT_3",
  PROMPT_4: "PROMPT_4_NO_COLOR_PICK",
};
const IMAGE_SHOWCASE="/image/showcase/slogan.png"
const TAB_3D_LOGO = false;
const TAB_2D_LOGO = true;

const NewDashboard = ({ userId, isPrivateImg, isSub }) => {
  const searchParams = useSearchParams();

  const searchImageUrl = searchParams.get("url");
  const searchIndustry = searchParams.get("industry");

  const [switchTab, setSwitchTab] = useState(TAB_3D_LOGO);

  const keyUrl = `/v1/${userId}/sub`;
  const { data, error, isLoading, mutate } = useFetch(keyUrl);

  const {
    formState: { errors },
    handleSubmit,
    register,
    watch,
    setValue,
  } = useForm({
    defaultValues: {

      inngestId: null,


      isPrivate: isPrivateImg,
    },
  });

  let threeDModal = watch("threeDModal");
  let industry = watch("industry");

  let inngestId = watch("inngestId");
  const isPrivate = watch("isPrivate");

  const [subLoading, setSubLoading] = useState(false);

  const pathname = usePathname();

  const subId = data?.data?.stripe_sub_id || null;
  const remainRequest = data?.remainRequest || null;



  const imageNodeRef = useRef(null);

  const [imageUrl, setImageUrl] = useState(
    searchImageUrl ? searchImageUrl : IMAGE_SHOWCASE
  );






  // useEffect(() => {
  //   if (imageNodeRef.current) {
  //     imageNodeRef.current.cache();
  //     imageNodeRef.current.getLayer().batchDraw();
  //   }
  // }, [
  //   brightness,
  //   contrast,
  //   blurRadius,
  //   saturation,
  //   hue,
  //   imageRadius,
  //   rotation, // Add rotation to dependency array
  //   image,
  // ]);

  const openFeedBackLoading = () => {
    document.getElementById("feed_back_modal")?.showModal();
  };
  const handleModalUnSub = () => {
    document.getElementById("sub-validation-modal").showModal();
  };
  const closeCoffeeLoading = () => {
    document.getElementById("loading_modal").close();
  };
  const openCoffeeLoading = () => {
    document.getElementById("loading_modal").showModal();
  };

  // useEffect(() => {
  //   const fetch = async () => {
  //     if (inngestId) {
  //       const ifFailRetry = async () => {
  //         const eventId = inngestId;
  //         let res = await getInngest(eventId, userId);

  //         let runs = res?.data;

  //         while (
  //           runs[0]?.status !== "Completed" &&
  //           runs[0]?.status !== "Failed" &&
  //           runs[0]?.status !== "Cancelled"
  //         ) {
  //           await new Promise((resolve) => setTimeout(resolve, 1000));
  //           const resTwo = await getInngest(eventId, userId);

  //           runs = resTwo?.data;
  //         }

  //         if (runs[0]?.status === "Completed") {
  //           return runs[0];
  //         } else {
  //           throw new Error(`Function run ${runs[0]?.status}`);
  //         }
  //       };
  //       try {
  //         let res = await ifFailRetry();

  //         if (res?.output) {
  //           closeCoffeeLoading();
  //           setImageUrl(res?.output?.imageUrl);
  //           res.output = null;
  //         }
  //       } catch (error) {
  //         console.log(error);

  //         const errorMessage = `Server is overloaded. Please wait a minute and try again.`;
  //         toast.error(errorMessage, { autoClose: 2000 });
  //         closeCoffeeLoading();
  //       }
  //     }
  //   };
  //   fetch();
  // }, [inngestId]);
  const openCollectData = async (imageUrl) => {
    const result = await Swal.fire({
      title: "Do you like the logo?",
      text: "As a free user, we’d love to hear your feedback! If you choose to upgrade, you’ll enjoy an uninterrupted experience without any pop-ups.",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: `
        <i class="fa fa-thumbs-up"></i> Yes!
      `,
      confirmButtonAriaLabel: "Thumbs up, great!",
      cancelButtonText: `
        <i class="fa fa-thumbs-down"></i> No
      `,
      cancelButtonAriaLabel: "Thumbs down",
      customClass: {
        confirmButton: "btn btn-primary btn-sm mr-2", // Use DaisyUI primary button style
        cancelButton: "btn btn-primary btn-sm", // Use DaisyUI secondary button style
      },
      buttonsStyling: false, // Disable SweetAlert2's default button styling
    });
    const yes = result?.isConfirmed;
    let feedCount = 0;
    // If the user clicks "Yes", send feedback to backend
    if (yes) {
      feedCount = 1;
    }
    const data = {
      feedCount,
      imageUrl,
      promptType: PROMPT_TYPE.PROMPT_4,
    };
    await createCollectData(data, userId);
  };
  const handleUnsub = async (e) => {
    e.preventDefault();
    setSubLoading(true);
    const data = { subId };
    try {
      await unSub(data, userId);
      setSubLoading(false);
      document.getElementById("sub-validation-modal").close();
    } catch (error) {
      console.log(error);
      setSubLoading(false);
    }
  };
  const onSubmit = async (formData) => {
    


    openCoffeeLoading();


    try {
      let res = null;
      res = await createNewPrompts(formData, userId);

      setImageUrl(res?.imageUrl);
      closeCoffeeLoading();
      // if (!isSub) {
      //   setTimeout(() => {
      //     openFeedBackLoading();
      //     // openCollectData(res?.imageUrl); // Show collect feedback popup after the delay
      //   }, 5000);
      // }

      //if user not sub , we are going to ask for feedback.

      // setValue("inngestId", res?.inngestId);
    } catch (error) {
      const statusCode = error?.response?.status;
      handleErrorGenerateLogo(statusCode)
      closeCoffeeLoading();
    }
  };
  const handleErrorGenerateLogo = (statusCode) => {
    if (statusCode === 404) {
      const errorMessage = `Your credit is 0. Please upgrade your plan to continue.`;
      toast.error(errorMessage, { autoClose: 2000 });
      //ask user for feedback
      // if(remainRequest <= 0){
      //   openFeedBackLoading();
      // }
    } else {
      toast.error("An error occurred. Please try again later.", {
        autoClose: 2000,
      });
    }
  }
  const handleChangeThreeDmodel = (e, val) => {
    setValue("threeDModal", val, { shouldValidate: true });
    closeModal("three_d_modal");
  };

  const handleClickIndustry = (e, val) => {
    setValue("industry", val);
    setShowIndustryError(false);
    closeModal("industry_modal");
  };

  const closeModal = (val) => {
    document.getElementById(val).close();
  };
  const handleChangePrivate = async (e) => {
    try {
      setValue("isPrivate", e.target.checked);
      const data = {
        checked: e.target.checked,
      };
      await createPrivateImage(data, userId);
    } catch (error) {}
  };





  const handleRandomIdea = () => {
    setValue("prompts", generateRandom3DLogoIdea());
  };



  const handleDownload = async () => {
    try {
      const response = await fetch(imageUrl, { mode: "cors" }); // Ensure CORS mode
    
      const blob = await response.blob();
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "downloaded-coloring-page.png";
      link.click();
    } catch (error) {
      console.log(error);
      
    }
   
  };
  const handleGenerate = async () => {
 
 
    if(imageUrl === IMAGE_SHOWCASE){

      return;
    }else{
      openCoffeeLoading();
      try {
        const data = {
   
          imageUrl
        }
        let res = await createRegenerate(data, userId);
        setImageUrl(res?.imageUrl);
        closeCoffeeLoading();
      } catch (error) {
        const statusCode = error?.response?.status;
        handleErrorGenerateLogo(statusCode)
        closeCoffeeLoading();
      }
    } 
    
  }

  const openEmailModal = () => {
    document.getElementById("email_modal").showModal();

  }
  const handleEmail = async () => {
    if(imageUrl === IMAGE_SHOWCASE){
      return;
    }else{
      openEmailModal();
    }

  }
  const isDisable = imageUrl === IMAGE_SHOWCASE;
  return (
    <>
      <div className="bg-gray-100">
        <LoadingModal />

        <EmailModal 
        IMAGE_SHOWCASE={IMAGE_SHOWCASE}
        userId={userId}
        imageUrl={imageUrl}
        />
      

        <SubValidationModal
          subId={subId}
          subLoading={subLoading}
          handleUnsub={handleUnsub}
        />
        <FeedbackModal userId={userId} />
        <ToastContainer />

        <Navigation
          isSub={isSub}
          userId={userId}
          handleModalUnSub={handleModalUnSub}
          remainRequest={remainRequest}
        />

        <div
          className="
                          flex flex-col bg-gray-100	 md:flex-row w-full 
                          flex-1 md:overflow-hidden max-w-[2250px] mx-auto 
                      "
        >
          <div className="flex flex-col border-2 w-full md:w-[340px] rounded-md shadow-lg  md:flex-row">
            <div className="">
              {/* <div className="flex  gap-2 mb-2 ">
                <div
                  onClick={handleSwitch}
                  className={` ${!switchTab && "btn-secondary"} btn btn-sm `}
                >
                  3D LOGO
                </div>

                <div
                  onClick={handleSwitch}
                  className={`${switchTab && "btn-secondary"} btn btn-sm `}
                >
                  2D LOGO
                </div>
              </div> */}
              <form
                className="flex flex-col p-4 gap-4"
                onSubmit={handleSubmit(onSubmit)}
              >
                {/* <h1 className="text-sm font-bold  border-b-2">
                  Describe your color page
                </h1> */}
                            <label className="form-control">
              <div className="label">
                <span className="label-text">Describe your color page</span>
              </div>
              <textarea {...register("prompt", {required:true}) } className="textarea textarea-bordered textarea-md w-full max-w-xs  h-40" placeholder="Spider man coloring page"></textarea>
              {errors.prompt && <span>This field is required</span>}
            </label>

                <GenerateLogo />
                <PrivateImage
                  isPrivate={isPrivate}
                  isSub={isSub}
                  handleChangePrivate={handleChangePrivate}
                />
              </form>
            </div>
          </div>

          <div className=" flex  flex-col items-center w-full rounded-md 
          shadow-lg border-2">
            <div className=" flex justfiy-start flex-row w-full ">
              <DashboardTab />
            </div>
            {/* <Link href="https://senja.io/p/indietool/r/SxqaQK" className="link mb-4">
              Get 3 free credits by leaving a testimonial once it's approve.
            </Link> */}
            {/* Social Media Sharing Buttons */}
            <div className="flex flex-col gap-4 md:flex-row">
              <div
                className="flex flex-col  bg-white p-2"
    
              >
              
                <div className="flex gap-1 mb-2">
         
                        <button
                    onClick={handleEmail}
                    className="btn btn-sm  btn-outline"
                    disabled={isDisable}
                  >
                    {" "}
                    Send
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-[18px] h-[18px] fill-white/10 group-hover:translate-x-0.5 group-hover:fill-white/20 transition-transform duration-200"><path d="m3 3 3 9-3 9 19-9Z"></path><path d="M6 12h16"></path></svg>
                  </button>
                  <button
                    onClick={handleDownload}
                    className="ml-auto btn btn-sm  btn-outline"
                  >
                    {" "}
                    Download
                  </button>
                </div>

                <Image
                  ref={imageNodeRef}
                  src={imageUrl}
                  width={500}
                  height={500}
                  className="mt-1 mb-1 rounded-md"
                  alt="Adjustable"
                />

                <div className="">
                  <button className="btn btn-sm btn-neutral" onClick={handleGenerate}>
                    {" "}
                    Regenerate
                  </button>
                </div>
              </div>
    
            </div>

        
          </div>

   
        </div>
      </div>
    </>
  );
};

export default NewDashboard;
