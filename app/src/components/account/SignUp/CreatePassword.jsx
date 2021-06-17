import React, { useState } from "react";
import { Scaffold, ReallosButton } from "../../utilities/core";
import { Snackbar, TextField, IconButton } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import ReallosLogo from "../../../assets/reallos_white_logo.png";
import UnlockIconImg from "../../../assets/UnlockIconImg.svg";
import { handlePasswordReset } from "../../../actions/userActions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import "./SignUp.css";
import { validateFormField } from "../../../utils";
import { EyeClosedIcon, EyeIcon } from "@primer/octicons-react";

const mapStateToProps = (state) => ({
  utils: state.utils,
});

const mapActionToProps = (dispatch) => {
  return bindActionCreators({ handlePasswordReset }, dispatch);
};

function CreatePassword(props) {
  let [password, setPassword] = useState("");
  let [confirmPassword, setConfirmPassword] = useState("");
  let [showError, setShowError] = useState(false);
  let [errorText, setErrorText] = useState("");
  let [inputTextVisibility, setInputTextVisibility] = useState({
    password: false,
    confirmPassword: false,
  });

  const submit = () => {
    let validPassword = validateFormField(password, "password");
    if (validPassword.hasError) {
      setShowError(true);
      setErrorText(validPassword.errorText);
    } else if (password !== confirmPassword) {
      setShowError(true);
      setErrorText("Passwords do not match");
    } else {
      // if there are no errors
      props.handlePasswordReset(password, window.location.href);
    }
  };

  return (
    <Scaffold className="signup-page-root">
      <div className="signup-reallos-decoration">
        <img src={ReallosLogo} alt="" />
      </div>

      <div className="signup-body-root" style={{ padding: "20px 25px" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div className="signup-page-title">
            <h1>Create Password</h1>
            <h2>Create a new password for your account</h2>
          </div>
          <img
            src={UnlockIconImg}
            alt="Lock Img"
            style={{ marginLeft: "10px", height: "50px", width: "50px" }}
          />
        </div>

        <div className="signup-form">
          <div className="signup-form-fields">
            <TextField
              value={password}
              fullWidth
              variant="outlined"
              label="Create Password"
              name="password"
              type={inputTextVisibility.password ? "text" : "password"}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
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
              value={confirmPassword}
              fullWidth
              variant="outlined"
              label="Confirm Password"
              name="confirmPassword"
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
          <div className="create-password-divider-div"></div>
          <div className="signup-form-action-group">
            <ReallosButton
              primary
              disabled={props.utils.loading}
              fullWidth
              onClick={() => submit()}
            >
              Confirm
            </ReallosButton>
          </div>
        </div>
      </div>

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

export default connect(mapStateToProps, mapActionToProps)(CreatePassword);
