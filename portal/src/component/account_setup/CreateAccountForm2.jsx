import React, { useState } from "react";
import PropTypes from "prop-types";
import { TextField, IconButton } from "@material-ui/core";
import { ReallosModal, ReallosButton, Scaffold } from "../utilities/core";
import { ArrowRightIcon, EyeClosedIcon, EyeIcon } from "@primer/octicons-react";
import ReallosLogo from "../../assets/reallos_white_logo.png";

function CreateAccountForm2(props) {
  let [
    isCreatePasswordFieldVisible,
    setCreatePasswordFieldVisibility,
  ] = useState(false);
  let [
    isConfirmPasswordFieldVisible,
    setConfirmPasswordFieldVisibility,
  ] = useState(false);
  let [confirmPassword, setConfirmPassword] = useState("");

  let {
    onStateChange = () => {},
    state = {},
    onNext = () => {},
    onPrev = () => {},
  } = props;

  /**
   * Handles input change. Sets state
   * and calls `onStateChange`.
   *
   * @param {Event} event
   */
  const handleChange = (event) => {
    onStateChange({
      password: event.target.value,
    });
  };

  /**
   * Checks if user can proceed to next screen
   */
  const canUserProceed = () => {
    // @TODO: Can use a strict password validation regex
    return (
      state.password.trim().length >= 8 && confirmPassword === state.password
    );
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

              <TextField
                fullWidth
                variant="outlined"
                label="Create Password"
                id="account-setup-create-account-textfield"
                spellCheck={false}
                value={state.password}
                onChange={handleChange}
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
                disabled={!canUserProceed()}
                onClick={onNext}
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

CreateAccountForm2.propTypes = {
  /**
   * State information for current component.
   * Should contain `password`
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

  /**
   * Callback function called when previous screen
   * is requested.
   */
  onPrev: PropTypes.func,
};

export default CreateAccountForm2;
