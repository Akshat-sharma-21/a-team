import React from "react";
import PropTypes from "prop-types";
import { ReallosModal, ReallosButton, Scaffold } from "../utilities/core";
import DeniedLogo from "../../assets/deny.png";
import ReallosLogo from "../../assets/reallos_white_logo.png";

function AccessDeny(props) {
  let { onPrev = () => {}, state = {} } = props;

  return (
    <Scaffold className="account-setup-root account-setup-verification-root">
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
              <img
                src={DeniedLogo}
                alt=""
                width="70px"
                height="70px"
                style={{ marginTop: 30, marginBottom: 10 }}
              ></img>

              <h1 style={{ marginTop: 20 }}>Access Denied</h1>

              <p>
                We are a closed platform and your email
                <strong>&nbsp;"{state.email}"&nbsp;</strong>
                doesn't seem to be in our list. To be a part of our platform,
                fill out a form at
                <a href="#" style={{ marginLeft: 5, fontWeight: "bold" }}>
                  reallos.com
                </a>
              </p>
            </div>

            <div className="account-setup-action-footer-group">
              <ReallosButton cta fullWidth onClick={onPrev}>
                Go Back
              </ReallosButton>
            </div>
          </div>
        </div>
      </ReallosModal>
    </Scaffold>
  );
}

AccessDeny.propTypes = {
  /**
   * State information for current component.
   * Should contain `email`
   */
  state: PropTypes.object,

  /**
   * Callback function called when previous screen
   * is requested.
   */
  onPrev: PropTypes.func,
};

export default AccessDeny;
