"use client";
import React, { useState } from "react";
import { sendLogoThroughEmail } from "./ModalApi";
const EmailModal = ({ userId, imageUrl }) => {
  const [email, setemail] = useState("");
  const [feedBackloading, setFeedBackLoading] = useState(false);
  const [feedBackMsg, setFeedBackMsg] = useState("");
  const sendEmail = async (e) => {
    e.preventDefault();
    setFeedBackLoading(true);
    if (email) {
        
      const data = {
        imageUrl,
        email
      };
      try {
        await sendLogoThroughEmail(data, userId);
        setFeedBackMsg(
          "Logo sent. Please check your spam if you do not see it."
        );
        setFeedBackLoading(false);
        // toast.success("Feedback sent", { autoClose: 1000 });
      } catch (error) {
        setFeedBackLoading(false);
        console.log(error);
      }
    } else {
    }
  };
  const handleChangeFeedBack = (e) => {
    if (feedBackMsg) setFeedBackMsg("");
    setemail(e.target.value);
  };

  return (
    <dialog id="email_modal" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Send a logo To: </h3>
        {/* <p className="py-4">
          We'd love to hear your ideas on how we can improve{" "}
          <span> &#128591;</span>
        </p> */}
        <div className="flex flex-col mt-2 gap-3">
            <input
              onChange={handleChangeFeedBack}
              type="email"
              placeholder="Type in email"
              className="input input-bordered  w-full max-w-lg"
            />
         

          {feedBackMsg && <div className="text-green-600">{feedBackMsg}</div>}
          <button
            onClick={sendEmail}
            className="btn btn-sm btn-secondary "
          >
            {feedBackloading ? "...Loading" : "Send"}
          </button>
        </div>

        <div className="modal-action">
          <form method="dialog">
            <button className="btn">Close</button>
          </form>
        </div>
      </div>
    </dialog>
  );
};
export default EmailModal;
