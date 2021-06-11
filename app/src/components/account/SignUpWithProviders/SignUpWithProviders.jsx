import React from "react";
import { Scaffold, ReallosButton } from "../../utilities/core";
import { TextField } from "@material-ui/core";
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

class SignUp extends React.Component {
  constructor() {
    super();

    this.state = {
      name: "",
      email: "",
      phone: "",
      nameError: true,
      mailError: true,
      phoneError: true,
      nameErrorText: "Name cannot be empty",
      mailErrorText: "Email cannot be empty",
      phoneErrorText: "Phone Number cannot be empty",
      showError: false,
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.setState({ email: localStorage.getItem("Email") }); // setting the state of the email
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

      default:
        break;
    }
  };

  onSubmit() {
    if (!this.state.nameError && !this.state.phoneError) {
      this.props.signupWithProvider(this.state);
    }
  }

  renderForm() {
    return (
      <div className="signup-form">
        <div className="signup-form-fields">
          <TextField
            value={this.state.name}
            fullWidth
            variant="outlined"
            label="Name"
            type="text"
            onChange={(event) => this.handleChange(event)}
          />
          <TextField
            value={this.state.email}
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
            value={this.state.phone}
            fullWidth
            variant="outlined"
            label="Phone no."
            type="tel"
            onChange={(event) => this.handleChange(event)}
          />
        </div>
        <div className="signup-form-action-group">
          <ReallosButton
            primary
            fullWidth
            onClick={() => this.onSubmit()}
            disabled={this.props.utils.loading}
          >
            Create Account
            <span style={{ marginLeft: 10 }}></span>
          </ReallosButton>
        </div>
      </div>
    );
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

          {this.renderForm()}
        </div>
      </Scaffold>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
