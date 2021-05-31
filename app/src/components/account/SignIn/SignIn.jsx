import React from "react";
import { Scaffold, ReallosButton } from "../../utilities/core";
import { navigateTo } from "../../../utils.js";
import {
  TextField,
  Fab,
  Divider,
  IconButton,
  withStyles,
} from "@material-ui/core";
import { ArrowRightIcon, EyeClosedIcon, EyeIcon } from "@primer/octicons-react";
import HomeImage from "../../../assets/signin_home.png";
import GoogleLogo from "../../../assets/google_logo.png";
import FacebookLogo from "../../../assets/facebook_logo.png";
import "./SignIn.css";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  login,
  loginWithGoggle,
  loginWithProviderHelper,
  loginWithFacebook,
} from "../../../actions/userActions";

const mapStateToProps = (state) => ({
  utils: state.utils,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    { login, loginWithGoggle, loginWithProviderHelper, loginWithFacebook },
    dispatch
  );
};

const styles = (theme) => ({
  input: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
});

class SignIn extends React.Component {
  constructor() {
    super();

    this.state = {
      email: "",
      password: "",
      isPasswordVisible: false,
    };
  }

  componentDidMount() {
    this.props.loginWithProviderHelper();
  }

  render() {
    return (
      <Scaffold bgVariant="gradient">
        <h2 className="signin-top-subheading">Let's make</h2>

        <div className="signin-top-heading-group">
          <div className="signin-top-heading">
            <h1>Real Estate, Real Easy!</h1>
          </div>
          <div style={{ textAlign: "center" }}>
            <img src={HomeImage} alt="" width="100%" height="auto" />
          </div>
        </div>

        <div className="signin-form">
          <TextField
            fullWidth
            className="signin-input"
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
            fullWidth
            className="signin-input"
            variant="outlined"
            label="Password"
            type={this.state.isPasswordVisible ? "text" : "password"}
            onChange={(event) =>
              this.setState({
                password: event.target.value,
              })
            }
            InputProps={{
              endAdornment: (
                <IconButton
                  aria-label={
                    this.state.isPasswordVisible
                      ? "Hide Password"
                      : "Show Password"
                  }
                  onClick={() =>
                    this.setState({
                      isPasswordVisible: !this.state.isPasswordVisible,
                    })
                  }
                >
                  {this.state.isPasswordVisible ? (
                    <EyeClosedIcon />
                  ) : (
                    <EyeIcon />
                  )}
                </IconButton>
              ),
            }}
          />

          <ReallosButton
            primary
            fullWidth
            variant="light"
            disabled={this.props.utils.loading}
            onClick={() =>
              this.props.login({
                email: this.state.email,
                password: this.state.password,
              })
            }
          >
            Sign In
          </ReallosButton>
        </div>

        <div className="social-signin-group">
          <Fab
            color="primary"
            size="large"
            className="social-signin"
            aria-label="Login with Google"
            onClick={() => {
              if (!this.props.utils.loading) this.props.loginWithGoggle();
            }}
          >
            <img src={GoogleLogo} alt="" />
          </Fab>

          <Fab
            color="primary"
            size="large"
            aria-label="Login with LinkedIn"
            onClick={() => {
              if (!this.props.utils.loading) this.props.loginWithFacebook();
            }}
          >
            <img src={FacebookLogo} alt="" />
          </Fab>
        </div>

        <Divider
          style={{
            backgroundColor: "#ffffff",
            height: 1,
            width: "60%",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        />

        <div className="signin-no-account">
          <h3>Don't have an account?</h3>
          <ReallosButton
            primary
            dense
            variant="light"
            innerContentColor="#1dadee"
            disabled={this.props.utils.loading}
            onClick={() => navigateTo("/signup", this.props.history)}
          >
            Signup
            <span style={{ marginLeft: 10 }}>
              <ArrowRightIcon size={20} />
            </span>
          </ReallosButton>
        </div>
      </Scaffold>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(SignIn));
