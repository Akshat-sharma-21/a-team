import React, { useState } from "react";
import { Scaffold, ReallosButton } from "../../utilities/core";
import { Snackbar, TextField } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import ReallosLogo from "../../../assets/reallos_white_logo.png";
import UnlockIconImg from "../../../assets/UnlockIconImg.svg";
import "./SignUp.css";
import { validateFormField } from "../../../utils";

function CreatePasword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState(true);
  const [confirmPasswordError, setConfirmPasswordError] = useState(true);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState(
    "Passowrd cannot be left empty"
  );
  const [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] =
    useState("Passowrd did not match");
  const [showError, setShowError] = useState(false);

  function handleChange(event) {
    if (event.target.name === "password") {
      setPasswordError(
        validateFormField(event.target.value, event.target.name).hasError
      );
      setPasswordErrorMessage(
        validateFormField(event.target.value, event.target.name).errorText
      );
      setPassword(event.target.value);
    }

    if (event.target.name === "confirmPassword") {
      if (password !== confirmPassword) {
        setConfirmPasswordError(true);
        setConfirmPasswordErrorMessage("Password did not match");
      } else setConfirmPasswordError(false);
      setConfirmPassword(event.target.value);
    }
  }

  function onSubmit() {
    if (!passwordError && !confirmPasswordError) {
    } else {
      setShowError(true);
    }
  }

  function renderForm() {
    return (
      <div className="signup-form">
        <div className="signup-form-fields">
          <TextField
            value={password}
            fullWidth
            variant="outlined"
            label="Create Password"
            name="password"
            type="password"
            onChange={(event) => {
              handleChange(event);
            }}
          />
          <TextField
            value={confirmPassword}
            fullWidth
            variant="outlined"
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            onChange={(event) => {
              handleChange(event);
            }}
          />
        </div>
        <div className="create-password-divider-div"></div>
        <div className="signup-form-action-group">
          <ReallosButton primary fullWidth onClick={onSubmit}>
            Confirm
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
            <h1>Create Password</h1>
            <h2>Create a new password for your account</h2>
          </div>
          <img
            src={UnlockIconImg}
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
          {passwordError ? passwordErrorMessage : confirmPasswordErrorMessage}
        </Alert>
      </Snackbar>
    </Scaffold>
  );
}

export default CreatePasword;
