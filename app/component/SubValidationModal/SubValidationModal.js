'use client'
import React from 'react';
const SubValidationModal = ({subId, subLoading, handleUnsub}) => {
return (
<dialog id="sub-validation-modal" className="modal">
  <div className="modal-box">
    <h3 className="font-bold text-lg">Confirm Unsubscription</h3>
    <p className="py-4">Are you sure you want to unsubscribe from our service?</p>
    <div className="modal-action">
      <form method="dialog">
        {/* if there is a button in form, it will close the modal */}
        <button onClick={handleUnsub} type="submit" className="btn btn-primary" disabled={subLoading}>
            {subLoading ? "Loading ... " :
            
            "Yes, Unsubscribe"}
            
        </button>
      </form>
      <form method="dialog">
        <button className="btn">No, Stay Subscribed</button>
      </form>
    </div>
  </div>
</dialog>

);
}
export default SubValidationModal;