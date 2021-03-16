import React from "react";
import { Scaffold, ReallosButton } from "../../utilities/core";
import { IconButton, TextField } from "@material-ui/core";
import ReallosLogo from "../../../assets/reallos_white_logo.png";
import "./SignUp.css";
import { ArrowRightIcon, EyeClosedIcon, EyeIcon } from "@primer/octicons-react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { signup } from "../../../actions/userActions";

const mapStateToProps = (state) => ({
  utils: state.utils,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ signup }, dispatch);
};

class SignUp extends React.Component {
  constructor() {
    super();

    this.state = {
      step: 0,
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      inputTextVisibility: {
        createPassword: false,
        confirmPassword: false,
      },
    };
  }

  renderForm(step) {
    switch (step) {
      case 0:
        return (
          <div className="signup-form">
            <div className="signup-form-fields">
              <TextField
                value={this.state.name}
                fullWidth
                variant="outlined"
                label="Name"
                type="text"
                onChange={(event) =>
                  this.setState({
                    name: event.target.value,
                  })
                }
              />
              <TextField
                value={this.state.email}
                fullWidth
                variant="outlined"
                label="Email"
                type="email"
                onChange={(event) =>
                  this.setState({
                    email: event.target.value,
                  })
                }
              />
              <TextField
                value={this.state.phone}
                fullWidth
                variant="outlined"
                label="Phone no."
                type="tel"
                onChange={(event) =>
                  this.setState({
                    phone: event.target.value,
                  })
                }
              />
            </div>
            <div className="signup-form-action-group">
              <ReallosButton
                primary
                fullWidth
                onClick={() => {
                  this.setState({
                    step: 1,
                  });
                }}
              >
                Next
                <span style={{ marginLeft: 10 }}>
                  <ArrowRightIcon size={21} />
                </span>
              </ReallosButton>
            </div>
          </div>
        );

      case 1:
        return (
          <div className="signup-form">
            <div className="signup-form-fields">
              <TextField
                fullWidth
                variant="outlined"
                label="Create password"
                name="password"
                value={this.state.password}
                onChange={(event) =>
                  this.setState({
                    password: event.currentTarget.value,
                  })
                }
                type={
                  this.state.inputTextVisibility.createPassword
                    ? "text"
                    : "password"
                }
                InputProps={{
                  endAdornment: (
                    <IconButton
                      aria-label={
                        this.state.inputTextVisibility.createPassword
                          ? "Hide Password"
                          : "Show Password"
                      }
                      onClick={() =>
                        this.setState({
                          inputTextVisibility: {
                            ...this.state.inputTextVisibility,
                            createPassword: !this.state.inputTextVisibility
                              .createPassword,
                          },
                        })
                      }
                    >
                      {this.state.inputTextVisibility.createPassword ? (
                        <EyeClosedIcon />
                      ) : (
                        <EyeIcon />
                      )}
                    </IconButton>
                  ),
                }}
              />
              <TextField
                fullWidth
                variant="outlined"
                label="Confirm password"
                value={this.state.confirmPassword}
                onChange={(event) =>
                  this.setState({
                    confirmPassword: event.currentTarget.value,
                  })
                }
                type={
                  this.state.inputTextVisibility.confirmPassword
                    ? "text"
                    : "password"
                }
                InputProps={{
                  endAdornment: (
                    <IconButton
                      aria-label={
                        this.state.inputTextVisibility.confirmPassword
                          ? "Hide Password"
                          : "Show Password"
                      }
                      onClick={() =>
                        this.setState({
                          inputTextVisibility: {
                            ...this.state.inputTextVisibility,
                            confirmPassword: !this.state.inputTextVisibility
                              .confirmPassword,
                          },
                        })
                      }
                    >
                      {this.state.inputTextVisibility.confirmPassword ? (
                        <EyeClosedIcon />
                      ) : (
                        <EyeIcon />
                      )}
                    </IconButton>
                  ),
                }}
              />
            </div>
            <div className="signup-form-action-group">
              <ReallosButton
                onClick={() => {
                  this.setState({
                    step: 0,
                  });
                }}
              >
                Back
              </ReallosButton>
              <ReallosButton
                primary
                disabled={this.props.utils.loading}
                onClick={() =>
                  this.props.signup({
                    email: this.state.email,
                    name: this.state.name,
                    password: this.state.password,
                    phone: this.state.phone,
                  })
                }
              >
                Create Account
              </ReallosButton>
            </div>
          </div>
        );

      default:
        return <React.Fragment />;
    }
  }

  render() {
    return (
      <Scaffold className="signup-page-root">
        <div className="signup-reallos-decoration">
          <img src={ReallosLogo} alt="" />
        </div>

        <div className="signup-body-root">
          <div className="signup-page-title">
            <h1>Create Account</h1>
            <h2>Tell us about yourself</h2>
          </div>

          {this.renderForm(this.state.step)}
        </div>
      </Scaffold>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
