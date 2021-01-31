import React from "react";
import CreateAccountForm1 from "./CreateAccountForm1";
import CreateAccountForm2 from "./CreateAccountForm2";
import EmailVerification from "./EmailVerification";
import PhoneVerification from "./PhoneVerification";
import AccessDeny from "./AccessDeny";
import "./AccountSetup.css";
import "./VerificationForm.css";

class AccountSetup extends React.Component {
  constructor() {
    super();

    this.state = {
      step: 0,
      email: '',
      password: '',
      isEmailVerified: false,
      isPhoneVerified: false,
      isCheckingUserAccess: false
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
    // @TODO: Add logic to check if a user is
    // invited/registered to use the Reallos service

    // Additional backend code should be added to
    // prevent any client-side vulnerability.

    // Simulate server response using promise
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email.endsWith('gmail.com')) resolve(true);
        else resolve(false);
      }, 1000);
    });
  }

  render() {
    switch (this.state.step) {
      case 0:
        return <CreateAccountForm1
          state={{
            email: this.state.email,
            isCheckingUserAccess: this.state.isCheckingUserAccess
          }}
          onStateChange={(state) => this.setState(state)}
          onNext={async () => {
            this.setState({ isCheckingUserAccess: true });

            // @TODO: Add error handling when executing the function
            if (await this.checkUserAccess(this.state.email)) {
              this.setState({ step: 1 });
            }
            else {
              this.setState({ step: -1 });
            }

            this.setState({
              isCheckingUserAccess: false
            });
          }}
        />

      case 1:
        return <CreateAccountForm2
          state={{ password: this.state.password }}
          onStateChange={(state) => this.setState(state)}
          onPrev={() => this.setState({ step: 0 })}
          onNext={() => this.setState({ step: 2 })}
        />

      case 2:
        return <EmailVerification
          state={{
            email: this.state.email,
            isEmailVerified: this.state.isEmailVerified
          }}
          onStateChange={(state) => this.setState(state)}
          onPrev={() => this.setState({ step: 1 })}
          onNext={() => this.setState({ step: 3 })}
        />

      case 3:
        return <PhoneVerification
          state={{
            // phone: this.state.phone,
            isPhoneVerified: this.state.isPhoneVerified
          }}
          onStateChange={(state) => this.setState(state)}
          onPrev={() => this.setState({ step: 2 })}
        />

      case -1:
        return <AccessDeny
          state={{ email: this.state.email }}
          onPrev={() => this.setState({ step: 0 })}
        />

      default:
        return <React.Fragment />
    }
  }
}

export default React.memo(AccountSetup);
