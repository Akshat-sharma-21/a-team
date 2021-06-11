import React, { useState } from "react";
import { Scaffold, ReallosButton } from "../../utilities/core";
import { Snackbar, TextField } from "@material-ui/core";
import { ArrowRightIcon } from "@primer/octicons-react";
import ReallosLogo from "../../../assets/reallos_white_logo.png";
import LockIconImg from "../../../assets/LockIconImg.svg";
import { passwordResetLink } from "../../../actions/userActions";
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
    },
    dispatch
  );
};

function CreatePasword(props) {
  const [email, setEmail] = useState("");
  const [showError, setShowError] = useState(false);
  const [mailError, setMailError] = useState(true);
  const [mailErrorText, setMailErrorText] = useState("Email cannot be empty");

  const handleChange = (event) => {
    setMailError(
      validateFormField(event.target.value, event.target.name).hasError
    );
    setMailErrorText(
      validateFormField(event.target.value, event.target.name).errorText
    );
    setEmail(event.target.value);
  };

  const onSubmit = () => {
    if (!mailError) {
      props.passwordResetLink(email);
    } else setShowError(true);
  };

  function renderForm() {
    return (
      <div className="signup-form">
        <div className="signup-form-fields">
          <TextField
            value={email}
            fullWidth
            variant="outlined"
            label="Email"
            type="email"
            onChange={(event) => {
              handleChange(event);
            }}
          />
        </div>
        <div className="reset-password-divider-div"></div>
        <div className="signup-form-action-group">
          <ReallosButton
            primary
            disabled={props.utils.loading}
            fullWidth
            onClick={onSubmit}
          >
            Next
            <span style={{ marginLeft: 10 }}>
              <ArrowRightIcon size={21} />
            </span>
          </ReallosButton>
        </div>
      </div>
    );
  }

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
            <h1>Reset Password</h1>
            <h2>Enter your registered email for the password reset link</h2>
          </div>
          <img
            src={LockIconImg}
            alt="Lock Img"
            style={{ marginLeft: "10px", height: "50px", width: "50px" }}
          />
        </div>

        {renderForm()}
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
          {mailErrorText}
        </Alert>
      </Snackbar>
    </Scaffold>
  );
}

export default connect(mapStateToProps, mapActionToProps)(CreatePasword);
