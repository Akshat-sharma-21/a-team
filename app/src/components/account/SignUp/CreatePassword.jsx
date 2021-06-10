import React, { useState } from "react";
import { Scaffold, ReallosButton } from "../../utilities/core";
import { TextField } from "@material-ui/core";
import ReallosLogo from "../../../assets/reallos_white_logo.png";
import UnlockIconImg from "../../../assets/UnlockIconImg.svg";
import { handlePasswordReset } from "../../../actions/userActions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import "./SignUp.css";

const mapStateToProps = (state) => ({
  utils: state.utils,
});

const mapActionToProps = (dispatch) => {
  return bindActionCreators({ handlePasswordReset }, dispatch);
};

function CreatePasword(props) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  function renderForm() {
    return (
      <div className="signup-form">
        <div className="signup-form-fields">
          <TextField
            value={password}
            fullWidth
            variant="outlined"
            label="Create Password"
            type="password"
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
          <TextField
            value={confirmPassword}
            fullWidth
            variant="outlined"
            label="Confirm Password"
            type="password"
            onChange={(event) => {
              setConfirmPassword(event.target.value);
            }}
          />
        </div>
        <div className="create-password-divider-div"></div>
        <div className="signup-form-action-group">
          <ReallosButton
            primary
            fullWidth
            disabled={props.utils.loading}
            onClick={() =>
              props.handlePasswordReset(password, window.location.href)
            }
          >
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
    </Scaffold>
  );
}

export default connect(mapStateToProps, mapActionToProps)(CreatePasword);
