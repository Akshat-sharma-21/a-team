import React from "react";
import { Scaffold, ReallosButton } from "../../utilities/core";
import { IconButton, TextField, Snackbar } from "@material-ui/core";
import ReallosLogo from "../../../assets/reallos_white_logo.png";
import "./SignUp.css";
import { ArrowRightIcon, EyeClosedIcon, EyeIcon } from "@primer/octicons-react";
import { Alert } from "@material-ui/lab";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { signup } from "../../../actions/userActions";
import { validateFormField } from "../../../utils";

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
      showError: false,
      nameError: true,
      mailError: true,
      phoneError: true,
      passwordError: true,
      confirmPasswordError: true,
      nameErrorText: "Name cannot be empty",
      mailErrorText: "Email cannot be empty",
      phoneErrorText: "Phone Number cannot be empty",
      passwordErrorText: "Password cannot be empty",
      confirmPasswordErrorText: "Passwords did not match",
      inputTextVisibility: {
        createPassword: false,
        confirmPassword: false,
      },
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (event) => {
    switch (event.target.name) {
      case "name":
        this.setState({
          name: event.target.value,
          nameError: validateFormField(event.target.value, event.target.name)
            .hasError,
          nameErrorText: validateFormField(
            event.target.value,
            event.target.name
          ).errorText,
        });
        break;

      case "email":
        this.setState({
          email: event.target.value,
          mailError: validateFormField(event.target.value, event.target.name)
            .hasError,
          mailErrorText: validateFormField(
            event.target.value,
            event.target.name
          ).errorText,
        });
        break;

      case "phone":
        this.setState({
          phone: event.target.value,
          phoneError: validateFormField(event.target.value, event.target.name)
            .hasError,
          phoneErrorText: validateFormField(
            event.target.value,
            event.target.name
          ).errorText,
        });
        break;

      case "password":
        this.setState({
          phone: event.target.value,
          passwordError: validateFormField(
            event.target.value,
            event.target.name
          ).hasError,
          passwordErrorText: validateFormField(
            event.target.value,
            event.target.name
          ).errorText,
        });
        break;

      case "confirmPassword":
        if (this.state.password !== this.state.confirmPassword) {
          this.setState({
            confirmPasswordError: true,
            confirmPasswordErrorText: "Password did not match",
          });
        } else {
          this.setState({
            confirmPasswordError: false,
          });
        }
        this.setState({
          confirmPassword: event.target.value,
        });
        break;

      default:
        break;
    }
  };

  nextStep() {
    if (
      !this.state.nameError &&
      !this.state.mailError &&
      !this.state.phoneError
    ) {
      this.setState({
        step: 1,
      });
    } else {
      this.setState({
        showError: true,
      });
    }
  }

  onSubmit() {
    if (!this.state.passwordError && !this.state.confirmPasswordError) {
      this.props.signup({
        email: this.state.email,
        name: this.state.name,
        password: this.state.password,
        phone: this.state.phone,
      });
    } else {
      this.setState({
        showError: true,
      });
    }
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
                name="name"
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
                name="email"
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
                name="phone"
                label="Phone No."
                type="tel"
                onChange={(event) =>
                  this.setState({
                    phone: event.target.value,
                  })
                }
              />
            </div>
            <div className="signup-form-action-group">
              <ReallosButton primary fullWidth onClick={() => this.nextStep()}>
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
                name="password"
                label="Create password"
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
                            createPassword:
                              !this.state.inputTextVisibility.createPassword,
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
                name="confirmPassword"
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
                            confirmPassword:
                              !this.state.inputTextVisibility.confirmPassword,
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
                onClick={() => this.onSubmit()}
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
        <Snackbar
          open={this.state.showError}
          autoHideDuration={6000}
          onClose={() => this.setState({ showError: false })}
        >
          <Alert
            onClose={() => this.setState({ showError: false })}
            severity="warning"
            variant="filled"
          >
            "Fill all the details correctly"
          </Alert>
        </Snackbar>
      </Scaffold>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
