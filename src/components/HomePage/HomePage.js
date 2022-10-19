import React, { useState } from "react";
import RequestForm from "../RequestForm/RequestForm";
import "./HomePage.css";

const HomePage = () => {
  const [showRequestForm, setShowRequestForm] = useState(false);

  return (
    <div className="HomePage">
      <h1>A Better way to enjoy every day</h1>
      <p>Be the first to know when we launch</p>
      <button onClick={() => setShowRequestForm(true)}> Request an invite</button>
      {showRequestForm && <RequestForm />}
    </div>
  );
};

export default HomePage;
