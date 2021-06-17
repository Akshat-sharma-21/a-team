import React, { useState } from "react";
import CreateAccountForm1 from "./CreateAccountForm1";
import CreateAccountForm2 from "./CreateAccountForm2";
import EmailVerification from "./EmailVerification";
import PhoneVerification from "./PhoneVerification";
import AccessDeny from "./AccessDeny";
import SignIn from "./SignIn";
import {
  addEmail,
  setPassword,
  sendEmailOTP,
  verifyEmail,
  sendPhoneOTP,
  verifyPhone,
  decrementStepAction,
} from "../../actions/registartionActions";
import { clearErrors } from "../../actions/utilActions";
import { connect } from "react-redux";
import "./AccountSetup.css";
import "./VerificationForm.css";
import { bindActionCreators } from "redux";

const mapStateToProps = (state) => ({
  // mapping the state to props
  register: state.register,
  utils: state.utils,
});

const mapActionsToProps = (dispatch) => {
  // mapping the dispatch to props
  return bindActionCreators(
    {
      addEmail,
      setPassword,
      sendEmailOTP,
      verifyEmail,
      sendPhoneOTP,
      verifyPhone,
      decrementStepAction,
      clearErrors,
    },
    dispatch
  );
};

function AccountSetup(props) {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  if (props.register.step === 0)
    return (
      <CreateAccountForm1
        state={{ email: email, loading: props.utils.loading }}
        onStateChange={(state) => setEmail(state)}
        onNext={() => props.addEmail(email)}
      />
    );
  else if (props.register.step === 1 && props.register.email === true) {
    return (
      <CreateAccountForm2
        state={{
          password: password,
          loading: props.utils.loading,
          errors: props.utils.errors,
        }}
        onStateChange={(state) => setPassword(state)}
        onPrev={() => props.decrementStepAction()}
        onNext={() => props.setPassword(email, password)}
        clearError={() => props.clearErrors()}
      />
    );
  } else if (props.register.step === 2 && props.register.password === true) {
    return (
      <EmailVerification
        state={{
          email: email,
          loading: props.utils.loading,
          hash: props.register.emailHash,
        }}
        onPrev={() => props.decrementStepAction()}
        onNext={props.verifyEmail}
        sendEmailOTP={props.sendEmailOTP}
      />
    );
  } else if (
    props.register.step === 3 &&
    props.register.emailVerified === true
  ) {
    return (
      <PhoneVerification
        state={{
          loading: props.utils.loading,
          hash: props.register.phoneHash,
        }}
        onPrev={() => props.decrementStepAction()}
        onNext={props.verifyPhone}
        sendPhoneOTP={props.sendPhoneOTP}
      />
    );
  } else if (
    props.register.step === 4 &&
    props.register.phoneVerified === true
  ) {
    return <SignIn />;
  } else {
    return (
      <AccessDeny
        state={{ email: email }}
        onPrev={() => props.decrementStepAction()}
      />
    );
  }
}

export default connect(mapStateToProps, mapActionsToProps)(AccountSetup);
