import React, { useState } from "react";
import { Scaffold, ReallosButton } from "../../utilities/core";
import { TextField } from "@material-ui/core";
import { ArrowRightIcon } from "@primer/octicons-react";
import ReallosLogo from "../../../assets/reallos_white_logo.png";
import LockIconImg from "../../../assets/LockIconImg.svg";
import "./SignUp.css";

function CreatePasword() {
  const [email, setEmail] = useState("");

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
              setEmail(event.target.value);
            }}
          />
        </div>
        <div style={{ height: "140px" }}></div>
        <div className="signup-form-action-group">
          <ReallosButton primary fullWidth>
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
    </Scaffold>
  );
}

export default CreatePasword;