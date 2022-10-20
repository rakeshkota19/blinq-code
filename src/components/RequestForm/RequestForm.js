import React, { useState } from "react";
import { AUTH_URL } from "../../Constants";
import "./RequestForm.css";

const RequestForm = ({ requestForm, setShowSuccessPopup }) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmMail] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isSending, setIsSending] = useState(false);

  const submitHandler = (e) => {
    let msg = "";
    if (fullName?.length === 0) {
      msg = "Full Name can't be empty \n";
    }

    if (email !== confirmEmail) {
      msg = msg + "Both are emails are not same, please check";
    }

    if (msg?.length > 0) {
      setErrorMsg(msg);
      e.preventDefault();
      return;
    }

    var data = {
      email: email,
      name: fullName,
    };

    setIsSending(true);
    fetch(AUTH_URL, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        console.log(res);
        requestForm(false);
        setShowSuccessPopup(true);
      })
      .catch((err) => {
        console.log(err);
        setIsSending(false);
        setErrorMsg(msg);
      });

    e.preventDefault();
  };

  return (
    <div className="RequestCard">
      <div className="formHeader">
        <p> Request an invite</p>
        <span> --------- </span>
      </div>

      <form onSubmit={(e) => submitHandler(e)}>
        <div className="inputContainer">
          <input
            type="text"
            placeholder="Full Name"
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />

          <input
            type="email"
            required
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="email"
            required
            placeholder="Confirm Email"
            value={confirmEmail}
            onChange={(e) => setConfirmMail(e.target.value)}
          />
        </div>

        {isSending ? (
          <button type="submit" disabled>
            Sending, Please Wait
          </button>
        ) : (
          <button type="submit">Send</button>
        )}

        {errorMsg && (
          <div className="errorMsg">
            <p> {errorMsg} </p>
          </div>
        )}
      </form>
    </div>
  );
};

export default RequestForm;
