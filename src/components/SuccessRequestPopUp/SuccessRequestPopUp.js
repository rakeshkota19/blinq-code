import React from "react";
import "./SuccessRequestPopup.css";

const SuccessRequestPopUp = (props) => {
  return (
    <div className="SuccessPopup">
      <div className="header">
        <p> All done! </p>
        <p>----------</p>
      </div>

      <p> You will one of the first to experience Browell & Co, when we launch</p>

      <button
        onClick={() => {
          props.setShowSuccessPopup(false);
        }}
      >
        Ok
      </button>
    </div>
  );
};

export default SuccessRequestPopUp;
