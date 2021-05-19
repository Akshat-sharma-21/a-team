import React from "react";
import { Scaffold, ReallosButton } from "../../utilities/core";
import { TextField } from "@material-ui/core";
import ReallosLogo from "../../../assets/reallos_white_logo.png";
import "./SignUp.css";
import { Phone } from "@material-ui/icons";

class VerifyPhone extends React.Component {
  constructor() {
    super();

    this.state = {
      verificationCodeList: ["", "", "", ""],
    };
  }
  renderForm() {
    return (
      <div className="signup-form">
        <div className="verification-code-textfield-group">
          {this.state.verificationCodeList.map((code, index) => (
            <TextField
              key={index}
              variant="outlined"
              onFocus={(event) => event.target.select()}
              inputProps={{
                maxLength: 1,
                autocomplete: "new-password",
              }}
              type="numeric"
              className="verification-code-textfield"
            />
          ))}
        </div>
        <div className="signup-form-sub-text">
          Didn't get the code?{" "}
          <span style={{ color: "#0432FA" }}>Resend it</span>
        </div>
        <ReallosButton primary fullWidth>
          <div className="form-btn-text">
            <Phone />
            &nbsp; &nbsp; Verify Phone
          </div>
        </ReallosButton>
      </div>
    );
  }

  render() {
    return (
      <Scaffold className="signup-page-root">
        <div className="signup-reallos-decoration">
          <img src={ReallosLogo} alt="" />
        </div>

        <div className="signup-body-root">
          <div className="signup-page-title">
            <h1>Verify Phone</h1>
            <h2>Please Verify your phone</h2>
          </div>

          {this.renderForm()}
        </div>
      </Scaffold>
    );
  }
}

export default VerifyPhone;
