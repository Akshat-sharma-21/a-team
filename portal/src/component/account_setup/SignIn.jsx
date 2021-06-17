import React, { useState } from "react";
import { ReallosModal, ReallosButton, Scaffold } from "../utilities/core";
import { EyeClosedIcon, EyeIcon } from "@primer/octicons-react";
import ReallosLogo from "../../assets/reallos_white_logo.png";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { login } from "../../actions/userActions";
import { clearErrors } from "../../actions/utilActions";
import { validateFormField } from "../../utils";

import {
  CircularProgress,
  TextField,
  IconButton,
  Checkbox,
  FormControlLabel,
  Snackbar,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";

const mapStateToProps = (state) => ({
  user: state.user,
  utils: state.utils,
});

const mapActionsToProps = (dispatch) => {
  return bindActionCreators({ login, clearErrors }, dispatch);
};

function SignIn(props) {
  let [isPasswordFieldVisible, setPasswordFieldVisibility] = useState(false);
  let [email, setEmail] = useState(null);
  let [password, setPassword] = useState(null);
  let [remember, setRemeber] = useState(false);
  let [showError, setShowError] = useState(false);
  let [errorText, setErrorText] = useState("");

  if (props.utils.errors && !showError) {
    if (props.utils.errors.code === "auth/wrong-password") {
      setShowError(true);
      setErrorText("Password is Incorrect");
    } else if (props.utils.errors.code === "auth/user-not-found") {
      setShowError(true);
      setErrorText("User doesn't exist");
    } else if (props.utils.errors.code === "auth/too-many-requests") {
      setShowError(true);
      setErrorText("Too many requests! Please wait for a while");
    }
  }

  const submit = () => {
    // function to login the user
    let validEmail = validateFormField(email, "email");
    if (validEmail.hasError) {
      setShowError(true);
      setErrorText(validEmail.errorText);
    } else if (password === "" || password === null) {
      setShowError(true);
      setErrorText("Password cannot be empty");
    } else {
      props.login({
        email: email,
        password: password,
      });
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
            <form className="account-setup-content-form-main">
              <h1>Sign In</h1>
              <TextField
                fullWidth
                variant="outlined"
                id="account-sigin-email-textfield"
                label="Email"
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ marginTop: 40 }}
                InputProps={{
                  endAdornment: false && (
                    <div style={{ height: 20 }}>
                      <CircularProgress size={20} />
                    </div>
                  ),
                }}
              />

              <TextField
                fullWidth
                variant="outlined"
                label="Password"
                id="account-sigin-password-textfield"
                spellCheck={false}
                type={isPasswordFieldVisible ? "text" : "password"}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                InputProps={{
                  endAdornment: (
                    <IconButton
                      aria-label={
                        isPasswordFieldVisible
                          ? "Hide Password"
                          : "Show Password"
                      }
                      onClick={() =>
                        setPasswordFieldVisibility(!isPasswordFieldVisible)
                      }
                    >
                      {isPasswordFieldVisible ? <EyeClosedIcon /> : <EyeIcon />}
                    </IconButton>
                  ),
                }}
              />

              <div
                style={{
                  marginTop: 15,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      id="account-signin-checkbox"
                      value={remember}
                      onChange={() => setRemeber(!remember)}
                      color="primary"
                    />
                  }
                  label="Remember me"
                />
                <a href="#">Forgot Password?</a>
              </div>
            </form>

            <div style={{ marginTop: 20 }}>
              <ReallosButton
                cta
                primary
                fullWidth
                disabled={props.utils.loading}
                onClick={() => submit()}
              >
                Sign In
              </ReallosButton>
            </div>

            <div style={{ marginTop: 10, marginBottom: -18 }}>
              <p>
                Want to be a part of the platform?
                <a href="/signup" style={{ marginLeft: 6 }}>
                  Register Now
                </a>
              </p>
            </div>
          </div>
        </div>
      </ReallosModal>
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
    </Scaffold>
  );
}

export default connect(mapStateToProps, mapActionsToProps)(SignIn);
