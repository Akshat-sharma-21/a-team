import React, { useState } from "react";
import { Scaffold, ReallosButton } from "../../utilities/core";
import { IconButton, TextField, Snackbar } from "@material-ui/core";
import ReallosLogo from "../../../assets/reallos_white_logo.png";
import "./SignUp.css";
import {
  ArrowRightIcon,
  EyeClosedIcon,
  EyeIcon,
  ArrowLeftIcon,
} from "@primer/octicons-react";
import { Alert } from "@material-ui/lab";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { signup } from "../../../actions/userActions";
import { clearErrors } from "../../../actions/utilsActions";
import { validateFormField } from "../../../utils";

const mapStateToProps = (state) => ({
  utils: state.utils,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ signup, clearErrors }, dispatch);
};

function SignUp(props) {
  let [step, setStep] = useState(0); // To set the step
  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [phone, setPhone] = useState("");
  let [password, setPassword] = useState("");
  let [confirmPassword, setConfirmPassword] = useState("");
  let [inputTextVisibility, setInputTextVisibility] = useState({
    password: false,
    confirmPassword: false,
  });
  let [showError, setShowError] = useState(false);
  let [errorText, setErrorText] = useState("");

  if (props.utils.errors && !showError) {
    // if there is error and the showError modal is not open
    if (props.utils.errors.code === "auth/email-already-in-use") {
      setShowError(true);
      setErrorText("Email is already registered");
    }
  }

  const nextStep = () => {
    // function to move to the next step
    let validName = validateFormField(name, "name");
    let validEmail = validateFormField(email, "email");
    let validPhone = validateFormField(phone, "phone");

    if (validName.hasError) {
      setShowError(true);
      setErrorText(validName.errorText);
    } else if (validEmail.hasError) {
      setShowError(true);
      setErrorText(validEmail.errorText);
    } else if (validPhone.hasError) {
      setShowError(true);
      setErrorText(validPhone.errorText);
    } else {
      // if there are no errors
      setStep(1);
    }
  };
  const submit = () => {
    // function to perform the submit action
    let validPassword = validateFormField(password, "password");

    if (validPassword.hasError) {
      setShowError(true);
      setErrorText(validPassword.errorText);
    } else if (password !== confirmPassword) {
      setShowError(true);
      setErrorText("Passwords do not match");
    } else {
      if (
        props.location &&
        props.location.state &&
        props.location.state.professional
      ) {
        // if a professional link was used
        props.signup(
          {
            email: email,
            name: name,
            password: password,
            phone: "+1" + phone, // adding the country code
          },
          props.location.state.professional
        );
      } else {
        props.signup(
          {
            email: email,
            name: name,
            password: password,
            phone: "+1" + phone, // adding the country code
          },
          null // sending null for professional if no connection link was used
        );
      }
    }
  };

  const renderForm = () => {
    if (step === 0) {
      return (
        <div className="signup-form">
          <div className="signup-form-fields">
            <TextField
              fullWidth
              variant="outlined"
              name="name"
              label="Name"
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <TextField
              fullWidth
              variant="outlined"
              name="email"
              label="Email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <TextField
              fullWidth
              variant="outlined"
              name="phone"
              label="Phone No."
              type="number"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
              }}
            />
          </div>
          <div className="signup-form-action-group">
            <ReallosButton primary fullWidth onClick={() => nextStep()}>
              Next
              <span style={{ marginLeft: 10 }}>
                <ArrowRightIcon size={21} />
              </span>
            </ReallosButton>
          </div>
        </div>
      );
    } else {
      return (
        <div className="signup-form">
          <div className="signup-form-fields">
            <TextField
              fullWidth
              variant="outlined"
              name="password"
              label="Create password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type={inputTextVisibility.password ? "text" : "password"}
              InputProps={{
                endAdornment: (
                  <IconButton
                    aria-label={
                      inputTextVisibility.password
                        ? "Hide Password"
                        : "Show Password"
                    }
                    onClick={() => {
                      setInputTextVisibility({
                        password: !inputTextVisibility.password,
                        confirmPassword: inputTextVisibility.confirmPassword,
                      });
                    }}
                  >
                    {inputTextVisibility.password ? (
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
              name="confirmPassword"
              label="Confirm password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
              type={inputTextVisibility.confirmPassword ? "text" : "password"}
              InputProps={{
                endAdornment: (
                  <IconButton
                    aria-label={
                      inputTextVisibility.confirmPassword
                        ? "Hide Password"
                        : "Show Password"
                    }
                    onClick={() => {
                      setInputTextVisibility({
                        password: inputTextVisibility.password,
                        confirmPassword: !inputTextVisibility.confirmPassword,
                      });
                    }}
                  >
                    {inputTextVisibility.confirmPassword ? (
                      <EyeClosedIcon />
                    ) : (
                      <EyeIcon />
                    )}
                  </IconButton>
                ),
              }}
            />
          </div>
          <div className="signup-form-action-group">
            <ReallosButton onClick={() => setStep(0)}>Back</ReallosButton>
            <ReallosButton
              primary
              disabled={props.utils.loading}
              onClick={() => submit()}
            >
              Create Account
            </ReallosButton>
          </div>
        </div>
      );
    }
  };

  return (
    <Scaffold className="signup-page-root">
      <div className="signup-reallos-decoration">
        <img src={ReallosLogo} alt="" />
      </div>
      {step === 0 && (
        <div className="signup-back-button">
          <IconButton
            disabled={props.utils.loading}
            onClick={() => (window.location.href = "/signin")}
          >
            <ArrowLeftIcon size={30} className="signup-back-button-style" />
          </IconButton>
        </div>
      )}

      <div className="signup-body-root">
        <div className="signup-page-title">
          <h1>Create Account</h1>
          <h2>Tell us about yourself</h2>
        </div>
        {renderForm()}
        <Snackbar
          open={showError}
          autoHideDuration={6000}
          onClose={() => {
            setShowError(false);
            props.clearErrors();
          }}
        >
          <Alert
            onClose={() => {
              setShowError(false);
              props.clearErrors();
            }}
            severity="warning"
            variant="filled"
          >
            {errorText}
          </Alert>
        </Snackbar>
      </div>
    </Scaffold>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
