import React from "react";
import RequestForm from "../../components/RequestForm/RequestForm";
import SuccessRequestPopUp from "../../components/SuccessRequestPopUp/SuccessRequestPopUp";
import { REQUEST_FORM_INVITE_BUTTON } from "../../Constants";
import "./HomePage.css";

const HomePage = ({ requestForm, showRequestForm, showSuccessPopup, setShowSuccessPopup }) => {
  return (
    <section className="HomePage">
      <h1>A Better way to enjoy every day</h1>
      <p>Be the first to know when we launch</p>
      <button
        data-testid={REQUEST_FORM_INVITE_BUTTON}
        onClick={() => {
          requestForm(true);
        }}
      >
        Request an invite
      </button>
      {showRequestForm && (
        <RequestForm requestForm={requestForm} setShowSuccessPopup={setShowSuccessPopup} />
      )}
      {showSuccessPopup && <SuccessRequestPopUp setShowSuccessPopup={setShowSuccessPopup} />}
    </section>
  );
};

export default HomePage;
