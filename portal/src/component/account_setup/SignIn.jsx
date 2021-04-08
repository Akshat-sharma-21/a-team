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
  const [showError, setShowError] = useState(true);
  let mail = { hasError: true, errorText: null };

  const handleChange = (event) => {
    if (event.target.id === "account-sigin-email-textfield") {
      mail = validateFormField(event.target.value, event.target.name);
      if (!mail.hasError) {
        setEmail(event.target.value);
      } else setShowError(true);
    } else if (event.target.id === "account-sigin-password-textfield") {
      setPassword(event.target.value);
    } else {
      setRemeber(!remember);
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
                onClick={() => props.login({ email, password })}
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
          severity="error"
          variant="filled"
        >
          {mail.hasError ? mail.errorText : null}
        </Alert>
      </Snackbar>
    </Scaffold>
  );
}

export default connect(mapStateToProps, mapActionsToProps)(SignIn);
