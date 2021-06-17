import React, { useState } from "react";
import { TextField, IconButton, Snackbar } from "@material-ui/core";
import { ReallosModal, ReallosButton, Scaffold } from "../utilities/core";
import { ArrowRightIcon, EyeClosedIcon, EyeIcon } from "@primer/octicons-react";
import { Alert } from "@material-ui/lab";
import ReallosLogo from "../../assets/reallos_white_logo.png";
import { validateFormField } from "../../utils";

function CreateAccountForm2(props) {
  let [isCreatePasswordFieldVisible, setCreatePasswordFieldVisibility] =
    useState(false);
  let [isConfirmPasswordFieldVisible, setConfirmPasswordFieldVisibility] =
    useState(false);
  let [confirmPassword, setConfirmPassword] = useState("");
  let [errorText, setErrorText] = useState("");
  let [showError, setShowError] = useState(false);

  let {
    onStateChange = () => {},
    state = {},
    onNext = () => {},
    onPrev = () => {},
    clearError = () => {},
  } = props;

  const nextStep = () => {
    // function to move to the next step
    let validPassword = validateFormField(state.password, "password");
    if (validPassword.hasError) {
      setShowError(true);
      setErrorText(validPassword.errorText);
    } else if (state.password !== confirmPassword) {
      setShowError(true);
      setErrorText("Passwords do not match");
    } else {
      onNext();
    }
  };

  if (state.errors && !showError) {
    if (state.errors.code === "auth/email-already-in-use") {
      setShowError(true);
      setErrorText("Account Already Setup! Please Sign in");
    }
  }

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

              <TextField
                fullWidth
                variant="outlined"
                label="Create Password"
                id="account-setup-create-account-textfield"
                spellCheck={false}
                value={state.password}
                onChange={(e) => onStateChange(e.target.value)}
                type={isCreatePasswordFieldVisible ? "text" : "password"}
                InputProps={{
                  endAdornment: (
                    <IconButton
                      aria-label={
                        isCreatePasswordFieldVisible
                          ? "Hide Password"
                          : "Show Password"
                      }
                      onClick={() =>
                        setCreatePasswordFieldVisibility(
                          !isCreatePasswordFieldVisible
                        )
                      }
                    >
                      {isCreatePasswordFieldVisible ? (
                        <EyeClosedIcon />
                      ) : (
                        <EyeIcon />
                      )}
                    </IconButton>
                  ),
                }}
              />

              <TextField
                fullWidth
                variant="outlined"
                label="Confirm Password"
                id="account-setup-confirm-account-textfield"
                spellCheck={false}
                value={confirmPassword}
                onChange={(event) =>
                  setConfirmPassword(event.currentTarget.value)
                }
                type={isConfirmPasswordFieldVisible ? "text" : "password"}
                InputProps={{
                  endAdornment: (
                    <IconButton
                      aria-label={
                        isConfirmPasswordFieldVisible
                          ? "Hide Password"
                          : "Show Password"
                      }
                      onClick={() =>
                        setConfirmPasswordFieldVisibility(
                          !isConfirmPasswordFieldVisible
                        )
                      }
                    >
                      {isConfirmPasswordFieldVisible ? (
                        <EyeClosedIcon />
                      ) : (
                        <EyeIcon />
                      )}
                    </IconButton>
                  ),
                }}
              />
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
                onClick={() => nextStep()}
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
      <Snackbar
        open={showError}
        autoHideDuration={6000}
        onClose={() => {
          setShowError(false);
          clearError();
        }}
      >
        <Alert
          onClose={() => {
            setShowError(false);
            clearError();
          }}
          severity="warning"
          variant="filled"
        >
          {errorText}
        </Alert>
      </Snackbar>
    </Scaffold>
  );
}

export default CreateAccountForm2;
