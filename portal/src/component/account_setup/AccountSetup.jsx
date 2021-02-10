import React from "react";
import CreateAccountForm1 from "./CreateAccountForm1";
import CreateAccountForm2 from "./CreateAccountForm2";
import EmailVerification from "./EmailVerification";
import PhoneVerification from "./PhoneVerification";
import AccessDeny from "./AccessDeny";
import { checkUser } from "../../actions/userActions";
import { connect } from "react-redux";
import "./AccountSetup.css";
import "./VerificationForm.css";
import { bindActionCreators } from "redux";

const mapStateToProps = (state) => ({
  // mapping the state to props
  user: state.user,
  utils: state.utils,
});

const mapActionsToProps = (dispatch) => {
  // mapping the dispatch to props
  return bindActionCreators(
    {
      checkUser,
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
      isEmailVerified: false,
      isPhoneVerified: false,
      isCheckingUserAccess: false,
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
    this.props.checkUser(email); // to check if the user has access to the emai
    this.setState({
      // incrementing the step
      step: 1,
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
    else if (this.state.step === 1 && this.props.utils.access === true)
      return (
        <CreateAccountForm2
          state={{ password: this.state.password }}
          onStateChange={(state) => this.setState(state)}
          onPrev={() => this.setState({ step: 0 })}
          onNext={() => this.setState({ step: 2 })}
        />
      );
    else if (this.state.step === 2)
      return (
        <EmailVerification
          state={{
            email: this.state.email,
            isEmailVerified: this.state.isEmailVerified,
          }}
          onStateChange={(state) => this.setState(state)}
          onPrev={() => this.setState({ step: 1 })}
          onNext={() => this.setState({ step: 3 })}
        />
      );
    else if (this.state.step === 3)
      return (
        <PhoneVerification
          state={{
            // phone: this.state.phone,
            isPhoneVerified: this.state.isPhoneVerified,
          }}
          onStateChange={(state) => this.setState(state)}
          onPrev={() => this.setState({ step: 2 })}
        />
      );
    else if (this.props.utils.access === false)
      return (
        <AccessDeny
          state={{ email: this.state.email }}
          onPrev={() => this.setState({ step: 0 })}
        />
      );
    else return <React.Fragment />;
  }
}

export default connect(
  mapStateToProps,
  mapActionsToProps
)(React.memo(AccountSetup));
