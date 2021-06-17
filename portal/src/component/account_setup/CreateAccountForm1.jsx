import React, { useState } from "react";
import { CircularProgress, Snackbar, TextField } from "@material-ui/core";
import { ArrowRightIcon } from "@primer/octicons-react";
import { ReallosModal, ReallosButton, Scaffold } from "../utilities/core";
import ReallosLogo from "../../assets/reallos_white_logo.png";
import { validateFormField } from "../../utils";
import { Alert } from "@material-ui/lab";

function CreateAccountForm1(props) {
  let [showError, setShowError] = useState(false);
  let [errorText, setErrorText] = useState("");
  let { onStateChange = () => {}, state = {}, onNext = () => {} } = props;

  const nextStep = () => {
    let validEmail = validateFormField(state.email, "email");
    if (validEmail.hasError) {
      setShowError(true);
      setErrorText(validEmail.errorText);
    } else {
      // if there are no errors
      onNext();
    }
  };

  return (
    <Scaffold className="account-setup-root">
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
              <h1>Account Setup</h1>

              <p style={{ marginBottom: 40 }}>
                We will use your email to connect your account. You will be
                required to pre-register with your email to access the service.
              </p>

              <TextField
                fullWidth
                error={showError}
                variant="outlined"
                id="account-setup-email-textfield"
                label="Email"
                name="email"
                type="email"
                value={state.email}
                onChange={(e) => onStateChange(e.target.value)}
                InputProps={{
                  endAdornment: state.loading && (
                    <div style={{ height: 20 }}>
                      <CircularProgress size={20} />
                    </div>
                  ),
                }}
              />
            </div>

            <div className="account-setup-action-footer-group">
              <ReallosButton cta primary fullWidth onClick={() => nextStep()}>
                Next
                <span style={{ marginLeft: 5 }}>
                  <ArrowRightIcon size={18} />
                </span>
              </ReallosButton>
            </div>
          </div>
        </div>
      </ReallosModal>
      <Snackbar
        open={showError}
        autoHideDuration={6000}
        onClose={() => setShowError(false)}
      >
        <Alert
          onClose={() => setShowError(false)}
          severity="warning"
          variant="filled"
        >
          {errorText}
        </Alert>
      </Snackbar>
    </Scaffold>
  );
}
export default CreateAccountForm1;
