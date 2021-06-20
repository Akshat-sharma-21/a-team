import React, { useState } from "react";
import { Scaffold, ReallosButton } from "../../utilities/core";
import { Snackbar, TextField, IconButton } from "@material-ui/core";
import { ArrowLeftIcon } from "@primer/octicons-react";
import { ArrowRightIcon } from "@primer/octicons-react";
import ReallosLogo from "../../../assets/reallos_white_logo.png";
import LockIconImg from "../../../assets/LockIconImg.svg";
import { passwordResetLink } from "../../../actions/userActions";
import { clearErrors } from "../../../actions/utilsActions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import "./SignUp.css";
import { validateFormField } from "../../../utils";
import { Alert } from "@material-ui/lab";

const mapStateToProps = (state) => ({
  utils: state.utils,
});

const mapActionToProps = (dispatch) => {
  return bindActionCreators(
    {
      passwordResetLink,
      clearErrors,
    },
    dispatch
  );
};

function CreatePassword(props) {
  let [email, setEmail] = useState("");
  let [showError, setShowError] = useState(false);
  let [errorText, setErrorText] = useState("");

  if (props.utils.errors && !showError) {
    // if there is error and the showError modal is not open
    if (props.utils.errors.code === "auth/user-not-found") {
      setShowError(true);
      setErrorText("No Account linked to the Email");
    }
  }

  const submit = () => {
    let validEmail = validateFormField(email, "email");
    if (validEmail.hasError) {
      setShowError(true);
      setErrorText(validEmail.errorText);
    } else {
      // if there are no error
      props.passwordResetLink(email);
    }
  };

  return (
    <Scaffold className="signup-page-root">
      <div className="signup-reallos-decoration">
        <img src={ReallosLogo} alt="" />
      </div>
      <div className="signup-back-button">
        <IconButton
          disabled={props.utils.loading}
          onClick={() => (window.location.href = "/signin")}
        >
          <ArrowLeftIcon size={30} className="signup-back-button-style" />
        </IconButton>
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
            <h1>Reset Password</h1>
            <h2>Enter your registered email for the password reset link</h2>
          </div>
          <img
            src={LockIconImg}
            alt="Lock Img"
            style={{ marginLeft: "10px", height: "50px", width: "50px" }}
          />
        </div>

        <div className="signup-form">
          <div className="signup-form-fields">
            <TextField
              value={email}
              fullWidth
              variant="outlined"
              label="Email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="reset-password-divider-div"></div>
          <div className="signup-form-action-group">
            <ReallosButton
              primary
              disabled={props.utils.loading}
              fullWidth
              onClick={() => submit()}
            >
              Next
              <span style={{ marginLeft: 10 }}>
                <ArrowRightIcon size={21} />
              </span>
            </ReallosButton>
          </div>
        </div>
      </div>

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

export default connect(mapStateToProps, mapActionToProps)(CreatePassword);
