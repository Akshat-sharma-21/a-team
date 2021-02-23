import React from "react";
import { CircularProgress, TextField } from "@material-ui/core";
import { ArrowRightIcon } from "@primer/octicons-react";
import { ReallosModal, ReallosButton, Scaffold } from "../utilities/core";
import ReallosLogo from "../../assets/reallos_white_logo.png";

function SignIn(props) {
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
            <div className="account-setup-content-form-main">
              <h1>Sign In</h1>

              <TextField
                fullWidth
                variant="outlined"
                id="account-setup-email-textfield"
                label="Email"
                type="email"
                style={{ marginTop: 75 }}
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
                id="account-setup-email-textfield"
                label="Password"
                type="Password"
                InputProps={{
                  endAdornment: false && (
                    <div style={{ height: 20 }}>
                      <CircularProgress size={20} />
                    </div>
                  ),
                }}
              />
            </div>

            <div className="account-setup-action-footer-group">
              <ReallosButton cta primary fullWidth>
                Sign In
              </ReallosButton>
            </div>
          </div>
        </div>
      </ReallosModal>
    </Scaffold>
  );
}

export default SignIn;
