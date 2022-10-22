import React, { useState } from "react";
import {
  AUTH_URL,
  CONFIRM_EMAIL_REQUEST_FORM,
  EMAIL_INPUT_REQUEST_FORM,
  NAME_INPUT_REQUEST_FORM,
  REQUEST_FORM,
  SUBMIT_REQUEST_FORM,
} from "../../Constants";
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
      .then(async (res) => {
        if (res.status === 200) {
          requestForm(false);
          setShowSuccessPopup(true);
        } else {
          let msg = await res.json();
          throw msg.errorMessage;
        }
      })
      .catch((err) => {
        console.log(err);
        setErrorMsg(err);
      })
      .finally(() => {
        setIsSending(false);
      });

    e.preventDefault();
  };

  return (
    <div className={`RequestCard`}>
      <button className="close-btn" onClick={() => requestForm(false)}>
        &#10006;
      </button>

      <div className="formHeader">
        <p> Request an invite</p>
        <span> --------- </span>
      </div>

      <form data-testid={REQUEST_FORM} onSubmit={(e) => submitHandler(e)}>
        <div className="inputContainer">
          <input
            type="text"
            placeholder="Full Name"
            required
            value={fullName}
            data-testid={NAME_INPUT_REQUEST_FORM}
            onChange={(e) => setFullName(e.target.value)}
          />

          <input
            type="email"
            required
            placeholder="Email"
            value={email}
            data-testid={EMAIL_INPUT_REQUEST_FORM}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="email"
            required
            // todo  pattern
            placeholder="Confirm Email"
            value={confirmEmail}
            data-testid={CONFIRM_EMAIL_REQUEST_FORM}
            onChange={(e) => setConfirmMail(e.target.value)}
          />
        </div>

        {isSending ? (
          <button type="submit" disabled>
            Sending, Please Wait
          </button>
        ) : (
          <button type="submit" data-testid={SUBMIT_REQUEST_FORM}>
            Send
          </button>
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
