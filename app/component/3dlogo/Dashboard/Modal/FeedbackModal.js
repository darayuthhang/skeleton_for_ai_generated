"use client";
import React, { useState } from "react";
import { sendFeedBackApi } from "../DashboardApi";
const FeedbackModal = ({userId}) => {
  const [feedBack, setFeedBack] = useState("");
  const [feedBackloading, setFeedBackLoading] = useState(false);
  const [feedBackMsg, setFeedBackMsg] = useState('');
  const sendFeedBackEmail = async (e) => {
  
    e.preventDefault();
    setFeedBackLoading(true)
    if (feedBack) {
      const data = {
        text: feedBack,
      };
      try {
        await sendFeedBackApi(data, userId);
        setFeedBackMsg("Feedback sent. Thanks for your time. Enjoy your next journey.");
        setFeedBackLoading(false)
        // toast.success("Feedback sent", { autoClose: 1000 });
      } catch (error) {
        setFeedBackLoading(false)
        console.log(error);
      }
    } else {
    }
  };
  const handleChangeFeedBack = (e) => {
    if(feedBackMsg) setFeedBackMsg('');
    setFeedBack(e.target.value);
  };

  return (
    <dialog id="feed_back_modal" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">We Value Your Feedback</h3>
        <p className="py-4">
          We'd love to hear your ideas on how we can improve{" "}
          <span> &#128591;</span>
        </p>
        <div className="flex flex-col">
          <textarea
            onChange={handleChangeFeedBack}
            placeholder="Your suggestions"
            className="textarea textarea-bordered textarea-lg w-full "
          ></textarea>
          {feedBackMsg && <div className="text-green-600">{feedBackMsg}</div>}
          <button 
          onClick={sendFeedBackEmail}
          className="btn btn-sm btn-secondary mt-10">
            {feedBackloading ? "...Loading" : "Send"}    
        </button>
        </div>

        <div className="text-md text-rose-500 mt-5">
        Your credit has reached 0. To continue using our service, 
        please buy credits.
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
export default FeedbackModal;
