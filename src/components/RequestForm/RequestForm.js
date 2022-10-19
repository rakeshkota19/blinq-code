import React, { useState } from "react";
import { AUTH_URL } from "../../Constants";
import "./RequestForm.css";

const RequestForm = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmMail] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

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
    }

    var data = {
      email: email,
      name: fullName,
    };

    fetch(AUTH_URL, {
      method: "POST",
      body: JSON.stringify(data),
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {});
  };

  return (
    <div className="RequestCard">
      <form>
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

        <input
          type="submit"
          value="Send"
          onSubmit={(e) => {
            submitHandler();
          }}
        />

        {errorMsg && <p> {errorMsg} </p>}
      </form>
    </div>
  );
};

export default RequestForm;
