import React, { useState } from "react";
import { ReallosModal, ReallosButton, Scaffold } from "../utilities/core";
import { EyeClosedIcon, EyeIcon } from "@primer/octicons-react";
import ReallosLogo from "../../assets/reallos_white_logo.png";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { login } from "../../actions/userActions";
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
  return bindActionCreators({ login }, dispatch);
};

function SignIn(props) {
  let [isPasswordFieldVisible, setPasswordFieldVisibility] = useState(false);
  let [email, setEmail] = useState(null);
  let [password, setPassword] = useState(null);
  let [remember, setRemeber] = useState(false);
  const [showError, setShowError] = useState(false);
  const [mailError, setMailError] = useState(true);
  const [mailErrorText, setMailErrorText] = useState("Email cannot be empty");
  let mail = { hasError: true, errorText: null };

  const handleChange = (event) => {
    setMailError(
      validateFormField(event.target.value, event.target.name).hasError
    );
    setMailErrorText(
      validateFormField(event.target.value, event.target.name).errorText
    );
    if (event.target.id === "account-sigin-email-textfield") {
      setEmail(event.target.value);
    } else if (event.target.id === "account-sigin-password-textfield") {
      setPassword(event.target.value);
    } else {
      setRemeber(!remember);
    }
  };

  const onSubmit = () => {
    if (mailError) {
      setShowError(true);
    } else {
      props.login({ email, password });
      setTimeout(() => {
        console.log(props.utils.errors);
        if (props.utils.errors.code === "auth/wrong-password") {
          setMailErrorText("Password is incorrect");
          setShowError(true);
        }

        if (props.utils.errors.code === "auth/invalid-email") {
          setMailErrorText("Email is invalid");
          setShowError(true);
        }

        if (props.utils.errors.code === "auth/user-not-found") {
          setMailErrorText("User not found");
          setShowError(true);
        }

        if (props.utils.errors.code === "auth/user-disabled") {
          setMailErrorText("User is disabled");
          setShowError(true);
        }

        if (props.utils.errors.code === "auth/too-many-requests") {
          setMailErrorText("Too many requests");
          setShowError(true);
        }
      }, 2000);
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
                onChange={handleChange}
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
                onChange={handleChange}
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
                      onChange={handleChange}
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
                onClick={onSubmit}
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

export default connect(mapStateToProps, mapActionsToProps)(SignIn);
