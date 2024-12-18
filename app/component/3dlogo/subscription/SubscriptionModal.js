"use client";
import { useEffect, useState } from "react";
import { createValidateIdeaData } from "./SubscriptonApi";

const SubscriptionModal = ({
  handleEmailChange,
  handleCheckboxChange,
  selectedPlan,
  email
}) => {
  //   useEffect(() => {
  //     // Check if the user has previously responded
  //     const hasResponded = localStorage.getItem('formalInvoiceSubscriptionResponse');
  //     if (!hasResponded) {
  //       document.getElementById('my_modal_6').checked = true;
  //     }
  //   }, []);

  const handleResponse = async (response) => {
 
    // Store the user's response in local storage
    if(response ===  "yes"){
        const hash = localStorage.getItem("oneTimeUser");
        if (!hash) {
          localStorage.setItem("oneTimeUser", true);
          localStorage.setItem("selectedPlan", selectedPlan);
          localStorage.setItem("email", email);
    
          if (response === "yes") {
            const data = {selectedPlan , email,  oneTimeUser: true }
            alert("Thank you for subscribing to the Product!");
            await createValidateIdeaData(data)
          }
        }
    }
 
    document.getElementById("check-box").checked = false;
    document.getElementById("subscriptionModal").close();
  };

  return (
    <div>
      <input type="checkbox" id="check-box" className="modal-toggle" />
      <dialog id="subscriptionModal" className="modal" >
        <div className="modal-box">
          <div className="card bg-base-100 shadow-xl p-4">
            <div className="card-body">
              <h3 className="font-bold text-lg text-center">
                Would you like to subscribe to the premium features of the
                Product?
              </h3>
              <ul className="list-disc list-inside mt-4">
                <li>Advanced keyword search</li>
                <li>Backlink analysis</li>
                <li>Keyword SEO suggestions based on product description </li>
              </ul>
              <div className="mt-4">
                <h5 className="text-center font-bold">Please pick plans:</h5>
                <ul className="list-none mt-2">
                  <li className="bg-base-200 p-2 rounded-lg shadow-md my-2 flex items-center">
                    <input
                      type="checkbox"
                      className="form-checkbox mr-2"
                      checked={selectedPlan === "Basic"}
                      onChange={() => handleCheckboxChange("Basic")}
                    />
                    <div>
                      <h6 className="text-center font-semibold">Basic Plan</h6>
                      <p className="text-center">$9 per month for 50 searches</p>
                    </div>
                  </li>
                  <li className="bg-base-200 p-2 rounded-lg shadow-md my-2 flex items-center">
                    <input
                      type="checkbox"
                      className="form-checkbox mr-2"
                      checked={selectedPlan === "Standard"}
                      onChange={() => handleCheckboxChange("Standard")}
                    />
                    <div>
                      <h6 className="text-center font-semibold">
                        Standard Plan
                      </h6>
                      <p className="text-center">$15 per month for 100 searches</p>
                    </div>
                  </li>
                  <li className="bg-base-200 p-2 rounded-lg shadow-md my-2 flex items-center">
                    <input
                      type="checkbox"
                      className="form-checkbox mr-2"
                      checked={selectedPlan === "Premium"}
                      onChange={() => handleCheckboxChange("Premium")}
                    />
                    <div>
                      <h6 className="text-center font-semibold">
                        Premium Plan
                      </h6>
                      <p className="text-center">$29 per month for 200 searches</p>
                    </div>
                  </li>
                </ul>
                <label className="text-sm">Please enter your email if you like to get update when our product launch </label>
                  <input
                    onChange={handleEmailChange}
                    className="input input-bordered w-full max-w-xs "
                    placeholder="Please enter your email. "
                  />
                
                <p className="text-center mt-4">
                  Your honest feedbacks are important to us.
                </p>
              </div>
            </div>
          </div>

          <div className="modal-action">
            <button className="btn" onClick={() => handleResponse("yes")}>
              Yes
            </button>
            <button className="btn" onClick={() => handleResponse("no")}>
              No
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default SubscriptionModal;
