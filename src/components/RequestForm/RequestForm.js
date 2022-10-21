import React, { useState } from "react";
import { AUTH_URL } from "../../Constants";
import {
  buildRequestInvitePostBody,
  checkEmailRequestForm,
  validateFullNameRequestForm,
} from "../../Util";
import "./RequestForm.css";

const RequestForm = ({ requestForm, setShowSuccessPopup }) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmMail] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isSending, setIsSending] = useState(false);

  const submitHandler = (e) => {
    let msg = "";

    msg += validateFullNameRequestForm(fullName);
    msg += checkEmailRequestForm(email, confirmEmail);

    if (msg?.length > 0) {
      setErrorMsg(msg);
      e.preventDefault();
      return;
    }

    var data = buildRequestInvitePostBody(fullName, email);

    setIsSending(true);
    fetch(AUTH_URL, {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        console.log(res.status);

        if (res.status === 200) {
          console.log(res);
          requestForm(false);
          setShowSuccessPopup(true);
        } else {
          console.log(res);
        }
      })
      .catch((err) => {
        console.log(err);
        setErrorMsg(msg);
      })
      .finally(() => {
        setIsSending(false);
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
            <pre> {errorMsg} </pre>
          </div>
        )}
      </form>
    </div>
  );
};

export default RequestForm;
