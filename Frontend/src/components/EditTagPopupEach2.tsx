import React from "react";
import EditTagPopupEach from "./EditTagPopupEach";

const EditTagPopup2 = ({ onClose, campgroundId }: any) => {
  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg p-6 z-50">
      <EditTagPopupEach onClose={onClose} campgroundId={campgroundId} />
    </div>
  );
};

export default EditTagPopup2;
