import React from "react";
import RequestForm from "../RequestForm/RequestForm";
import SuccessRequestPopUp from "../SuccessRequestPopUp/SuccessRequestPopUp";
import "./HomePage.css";

const HomePage = ({ requestForm, showRequestForm, showSuccessPopup, setShowSuccessPopup }) => {
  return (
    <div className="HomePage">
      <h1>A Better way to enjoy every day</h1>
      <p>Be the first to know when we launch</p>
      <button onClick={() => requestForm(true)}> Request an invite</button>
      {showRequestForm && (
        <RequestForm requestForm={requestForm} setShowSuccessPopup={setShowSuccessPopup} />
      )}
      {showSuccessPopup && <SuccessRequestPopUp setShowSuccessPopup={setShowSuccessPopup} />}
    </div>
  );
};

export default HomePage;
