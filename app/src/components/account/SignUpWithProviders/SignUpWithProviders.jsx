import React, { useState } from "react";
import { Scaffold, ReallosButton } from "../../utilities/core";
import { TextField, Snackbar, IconButton } from "@material-ui/core";
import { ArrowLeftIcon } from "@primer/octicons-react";
import { Alert } from "@material-ui/lab";
import ReallosLogo from "../../../assets/reallos_white_logo.png";
import "../SignUp/SignUp.css";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { signupWithProvider } from "../../../actions/userActions";
import { validateFormField } from "../../../utils";

const mapStateToProps = (state) => ({
  utils: state.utils,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ signupWithProvider }, dispatch);
};

function SignUpWithProviders(props) {
  let [name, setName] = useState("");
  let [phone, setPhone] = useState("");
  let [showError, setShowError] = useState(false);
  let [errorText, setErrorText] = useState("");

  const submit = () => {
    let validName = validateFormField(name, "name");
    let validPhone = validateFormField(phone, "phone");

    if (validName.hasError) {
      setShowError(true);
      setErrorText(validName.errorText);
    } else if (validPhone.hasError) {
      setShowError(true);
      setErrorText(validPhone.errorText);
    } else {
      // if there are no errors
      props.signupWithProvider({
        email: localStorage.Email,
        name: name,
        phone: "+1" + phone, // Adding the country code
      });
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

      <div className="signup-body-root">
        <div className="signup-page-title">
          <h1>Create Account</h1>
          <h2>Tell us about yourself</h2>
        </div>

        <div className="signup-form">
          <div className="signup-form-fields">
            <TextField
              value={name}
              fullWidth
              variant="outlined"
              label="Name"
              type="text"
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              value={localStorage.Email}
              fullWidth
              variant="outlined"
              label="Email"
              type="email"
              disabled={
                true
                // This is always true becase user signed up with a provider
              }
            />
            <TextField
              value={phone}
              fullWidth
              variant="outlined"
              label="Phone no."
              type="tel"
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="signup-form-action-group">
            <ReallosButton
              primary
              fullWidth
              onClick={() => submit()}
              disabled={props.utils.loading}
            >
              Create Account
              <span style={{ marginLeft: 10 }}></span>
            </ReallosButton>
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
      </div>
    </Scaffold>
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUpWithProviders);
