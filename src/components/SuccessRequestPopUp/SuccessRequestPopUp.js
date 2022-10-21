import React from "react";
import { SUCCESS_POPUP } from "../../Constants";
import "./SuccessRequestPopup.css";

const SuccessRequestPopUp = (props) => {
  return (
    <div className="SuccessPopup" data-testid={SUCCESS_POPUP}>
      <div className="header">
        <p> All done! </p>
        <p>----------</p>
      </div>

      <div className="container">
        <p>You will one of the first to experience, Browell & Co when we launch</p>
      </div>

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
