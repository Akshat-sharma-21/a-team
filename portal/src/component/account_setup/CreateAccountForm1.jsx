import React, { useState } from "react";
import PropTypes from "prop-types";
import { CircularProgress, Snackbar, TextField } from "@material-ui/core";
import { ArrowRightIcon } from "@primer/octicons-react";
import { ReallosModal, ReallosButton, Scaffold } from "../utilities/core";
import ReallosLogo from "../../assets/reallos_white_logo.png";
import { validateFormField } from "../../utils";
import { Alert } from "@material-ui/lab";

function CreateAccountForm1(props) {
  const [showError, setShowError] = useState(false);
  const [mailError, setMailError] = useState(true);
  const [mailErrorText, setMailErrorText] = useState("Email cannot be empty");
  let { onStateChange = () => {}, state = {}, onNext = () => {} } = props;

  /**
   * Handles input change. Sets state
   * and calls `onStateChange`.
   *
   * @param {Event} event
   */
  const handleChange = (event) => {
    setMailError(
      validateFormField(event.target.value, event.target.name).hasError
    );
    setMailErrorText(
      validateFormField(event.target.value, event.target.name).errorText
    );
    onStateChange({
      email: event.target.value,
    });
  };

  const nextStep = () => {
    if (mailError) {
      setShowError(true);
    } else onNext();
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
                onChange={handleChange}
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
              <ReallosButton cta primary fullWidth onClick={nextStep}>
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
          {mailErrorText}
        </Alert>
      </Snackbar>
    </Scaffold>
  );
}

CreateAccountForm1.propTypes = {
  /**
   * State information for current component.
   * Should contain `email` and `isCheckingUserAccess`.
   */
  state: PropTypes.object,

  /**
   * Callback function called when a state change
   * occurs in current component.
   *
   * Typically the function should accept a `state` prop
   * which should be propagated to parent component.
   */
  onStateChange: PropTypes.func,

  /**
   * Callback function called when next screen
   * is requested.
   */
  onNext: PropTypes.func,
};

export default CreateAccountForm1;
