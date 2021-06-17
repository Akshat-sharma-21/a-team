import React, { useState, useEffect } from "react";
import { TextField } from "@material-ui/core";
import { ArrowRightIcon } from "@primer/octicons-react";
import { ReallosModal, ReallosButton, Scaffold } from "../utilities/core";
import VerifiedLogo from "../../assets/verified.png";
import ReallosLogo from "../../assets/reallos_white_logo.png";

function EmailVerification(props) {
  let { onNext, onPrev, state = {}, sendEmailOTP } = props;

  useEffect(() => {
    sendEmailOTP(state.email);
  }, []);

  let [verificationCodeList, setVerificationCodeList] = useState(
    Array(4).fill("")
  );

  const handleInputKeyDown = (event, index) => {
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

  function setCodeAndNext(emailCode) {
    onNext(emailCode, state.hash); // send the hash and the email code
  }

  return (
    <Scaffold className="account-setup-root account-setup-verification-root">
      <ReallosModal
        visible
        rawModal
        disableBackdropBlur
        className="account-setup-modal"
      >
        <div className="account-setup-content-root">
          <div className="reallos-account-setup-decoration">
            <img src={ReallosLogo} alt="" />
          </div>

          <div className="account-setup-content-form">
            <div className="account-setup-content-form-main">
              <img src={VerifiedLogo} alt="" width={70} height={70} />

              <h1 style={{ marginTop: 20, marginBottom: 10 }}>
                Email Verification
              </h1>

              <p>
                A confirmation code has sent to your email. Please enter it to
                proceed.
              </p>

              <div className="account-setup-verification-code-textfield-group">
                {verificationCodeList.map((code, index) => (
                  <TextField
                    key={index}
                    value={code}
                    variant="outlined"
                    aria-label={`Verification code digit ${index + 1}`}
                    onKeyDown={(event) => handleInputKeyDown(event, index)}
                    onFocus={(event) => event.target.select()}
                    inputProps={{
                      maxLength: 1,
                      autocomplete: "new-password",
                    }}
                    type="numeric"
                  />
                ))}
              </div>

              <p>
                Didn't get the code?
                <a style={{ marginLeft: 8, cursor: "pointer" }}>Resend it</a>
              </p>
            </div>

            <div className="account-setup-action-footer-group">
              <ReallosButton cta fullWidth onClick={onPrev}>
                Back
              </ReallosButton>

              <ReallosButton
                cta
                primary
                fullWidth
                disabled={state.loading}
                onClick={() =>
                  setCodeAndNext(
                    verificationCodeList.toString().replace(/,/g, "")
                  )
                }
              >
                Next
                <span style={{ marginLeft: 5 }}>
                  <ArrowRightIcon size={18} />
                </span>
              </ReallosButton>
            </div>
          </div>
        </div>
      </ReallosModal>
    </Scaffold>
  );
}

export default EmailVerification;
