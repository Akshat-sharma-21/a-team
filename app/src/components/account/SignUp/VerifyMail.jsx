import React, { useState } from "react";
import { Scaffold, ReallosButton } from "../../utilities/core";
import { TextField } from "@material-ui/core";
import ReallosLogo from "../../../assets/reallos_white_logo.png";
import "./SignUp.css";
import { Email } from "@material-ui/icons";

function VerifyMail() {
  let [verificationCodeList, setVerificationCodeList] = useState(
    Array(4).fill("")
  );

  const handleInputKeyDown = (event, index) => {
    /** @type string */
    let key = event.key;
    let isNumeric = !!key.match(/^\d$/);

    if (isNumeric || ["Backspace", "Delete"].includes(key)) {
      let currentVerificationCodeList = [...verificationCodeList];
      currentVerificationCodeList[index] = isNumeric ? key : "";

      setVerificationCodeList(currentVerificationCodeList);

      if (key !== "Backspace") {
        let nextSibling = event.target.parentElement.parentElement.nextSibling;
        if (nextSibling) nextSibling.querySelector("input").focus();
      } else {
        let prevSibling =
          event.target.parentElement.parentElement.previousSibling;
        if (prevSibling) prevSibling.querySelector("input").focus();
      }
    }
  };

  function renderForm() {
    return (
      <div className="signup-form">
        <div className="verification-code-textfield-group">
          {verificationCodeList.map((code, index) => (
            <TextField
              key={index}
              value={code}
              variant="outlined"
              onKeyDown={(event) => handleInputKeyDown(event, index)}
              onFocus={(event) => event.target.select()}
              inputProps={{
                maxLength: 1,
                autocomplete: "new-password",
              }}
              type="numeric"
              className="verification-code-textfield"
            />
          ))}
        </div>
        <div className="signup-form-sub-text">
          Didn't get the code?{" "}
          <span style={{ color: "#0432FA" }}>Resend it</span>
        </div>
        <ReallosButton primary fullWidth>
          <div className="form-btn-text">
            <Email />
            &nbsp;&nbsp; Verify Email
          </div>
        </ReallosButton>
      </div>
    );
  }

  return (
    <Scaffold className="signup-page-root">
      <div className="signup-reallos-decoration">
        <img src={ReallosLogo} alt="" />
      </div>

      <div className="signup-body-root">
        <div className="signup-page-title">
          <h1>Verify Email</h1>
          <h2>Please Verify your email</h2>
        </div>
        {renderForm()}
      </div>
    </Scaffold>
  );
}

export default VerifyMail;
