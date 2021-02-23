import React from "react";
import CreateAccountForm1 from "./CreateAccountForm1";
import CreateAccountForm2 from "./CreateAccountForm2";
import EmailVerification from "./EmailVerification";
import PhoneVerification from "./PhoneVerification";
import AccessDeny from "./AccessDeny";
import SignIn from "./SignIn";
import {
  addEmail,
  setPassword,
  verifyEmail,
  verifyPhone,
} from "../../actions/registartionActions";
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
      verifyEmail,
      verifyPhone,
    },
    dispatch
  );
};

class AccountSetup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      step: 0,
      email: "",
      password: "",
    };
  }

  /**
   * Checks if the user has access to the
   * service. Returns `true` if user has access,
   * else `false`.
   *
   * @param {string} email
   * Email ID of the user
   */
  checkUserAccess(email) {
    this.props.addEmail(email); // to check if the user has access to the email
    this.setState({
      // incrementing the step
      step: 1,
    });
  }

  setPassword(password) {
    this.props.setPassword(password);
    this.setState({
      // incrementing the step
      step: 2,
    });
  }

  render() {
    if (this.state.step === 0)
      return (
        <CreateAccountForm1
          state={{
            email: this.state.email,
            isCheckingUserAccess: this.state.isCheckingUserAccess,
          }}
          onStateChange={(state) => this.setState(state)}
          onNext={() => this.checkUserAccess(this.state.email)}
        />
      );
    else if (this.state.step === 1 && this.props.register.email === true)
      return (
        <CreateAccountForm2
          state={{ password: this.state.password }}
          onStateChange={(state) => this.setState(state)}
          onPrev={() => this.setState({ step: 0 })}
          onNext={() => this.setPassword(this.state.password)}
        />
      );
    else if (this.state.step === 2 && this.props.register.password === true)
      return (
        <EmailVerification
          state={{
            email: this.state.emailCode,
          }}
          onStateChange={(state) => this.setState(state)}
          onPrev={() => this.setState({ step: 1 })}
          onNext={this.props.verifyEmail}
        />
      );
    else if (
      this.state.step === 3 &&
      this.props.register.emailVerified === true
    )
      return (
        <PhoneVerification
          state={{
            phone: this.state.phoneCode,
          }}
          onStateChange={(state) => this.setState(state)}
          onPrev={() => this.setState({ step: 2 })}
          onNext={this.props.verifyPhone}
        />
      );
    else if (
      this.state.step === 4 &&
      this.props.register.phoneVerified === true
    ) {
      {
        return <SignIn />;
      }
    } else
      return (
        <AccessDeny
          state={{ email: this.state.email }}
          onPrev={() => this.setState({ step: 0 })}
        />
      );
  }
}

export default connect(
  mapStateToProps,
  mapActionsToProps
)(React.memo(AccountSetup));
