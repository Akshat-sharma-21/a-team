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
  incrementStepAction,
  decrementStepAction,
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
      incrementStepAction,
      decrementStepAction,
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

  render() {
    if (this.props.register.step === 0)
      return (
        <CreateAccountForm1
          state={{
            email: this.state.email,
            loading: this.props.utils.loading,
          }}
          onStateChange={(state) => this.setState(state)}
          onNext={() => this.props.addEmail(this.state.email)}
        />
      );
    else if (
      this.props.register.step === 1 &&
      this.props.register.email === true
    )
      return (
        <CreateAccountForm2
          state={{
            password: this.state.password,
            loading: this.props.utils.loading,
          }}
          onStateChange={(state) => this.setState(state)}
          onPrev={() => this.props.decrementStepAction()}
          onNext={() =>
            this.props.setPassword(this.state.email, this.state.password)
          }
        />
      );
    else if (
      this.props.register.step === 2 &&
      this.props.register.password === true
    )
      return (
        <EmailVerification
          state={{
            loading: this.props.utils.loading,
            hash: this.props.register.emailHash,
          }}
          onPrev={() => this.props.decrementStepAction()}
          onNext={this.props.verifyEmail}
        />
      );
    else if (
      this.props.register.step === 3 &&
      this.props.register.emailVerified === true
    )
      return (
        <PhoneVerification
          state={{
            loading: this.props.utils.loading,
          }}
          onStateChange={(state) => this.setState(state)}
          onPrev={() => this.props.decrementStepAction()}
          onNext={this.props.verifyPhone}
        />
      );
    else if (
      this.props.register.step === 4 &&
      this.props.register.phoneVerified === true
    ) {
      {
        return <SignIn />;
      }
    } else
      return (
        <AccessDeny
          state={{ email: this.state.email }}
          onPrev={() => this.props.decrementStepAction()}
        />
      );
  }
}

export default connect(
  mapStateToProps,
  mapActionsToProps
)(React.memo(AccountSetup));
