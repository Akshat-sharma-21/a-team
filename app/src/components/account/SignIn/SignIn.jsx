import React from "react";
import { Scaffold, ReallosButton } from "../../utilities/core";
import { navigateTo } from "../../../utils.js";
import {
  TextField,
  Fab,
  Divider,
  IconButton,
  withStyles,
  Snackbar,
  Typography,
  Link,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import {
  ArrowRightIcon,
  EyeClosedIcon,
  EyeIcon,
  ShareIcon,
  KebabHorizontalIcon,
} from "@primer/octicons-react";
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
import { validateFormField } from "../../../utils";

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
      isSnackbarVisible: true,
      remember: false,
      showError: false,
      mailError: true,
      mailErrorText: "Email cannot be empty",
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.props.loginWithProviderHelper();
  }

  handleChange = (event) => {
    this.setState({
      mailError: validateFormField(event.target.value, event.target.name)
        .hasError,
    });

    this.setState({
      mailErrorText: validateFormField(event.target.value, event.target.name)
        .errorText,
    });
    if (event.target.name === "email") {
      this.setState({ email: event.target.value });
    } else if (event.target.name === "password") {
      this.setState({ password: event.target.value });
    } else {
      this.setState({ remember: !this.state.remember });
    }
  };

  onSubmit() {
    if (this.state.mailError) {
      this.setState({ showError: true });
    } else {
      this.props.login({
        email: this.state.email,
        password: this.state.password,
      });
      setTimeout(() => {
        if (this.props.utils.errors) {
          if (this.props.utils.errors.code === "auth/wrong-password") {
            this.setState({ mailError: "Password is incorrect" });
            this.setState({ showError: true });
          }

          if (this.props.utils.errors.code === "auth/invalid-email") {
            this.setState({ mailError: "Email is invalid" });
            this.setState({ showError: true });
          }

          if (this.props.utils.errors.code === "auth/user-not-found") {
            this.setState({ mailError: "User not found" });
            this.setState({ showError: true });
          }

          if (this.props.utils.errors.code === "auth/user-disabled") {
            this.setState({ mailError: "User is disabled" });
            this.setState({ showError: true });
          }

          if (this.props.utils.errors.code === "auth/too-many-requests") {
            this.setState({ mailError: "Too many requests" });
            this.setState({ showError: true });
          }
        }
      }, 2000);
    }
  }

  showDownloadInfo() {
    // function to allow user to install the app
    if (window.matchMedia("(display-mode: standalone)").matches) {
      // if the pwa is already being used
      return <></>;
    } else {
      // if the app is opened in browser
      if (
        window.navigator.userAgent.match("iPhone") !== null &&
        this.props.utils.loading === false
      ) {
        return (
          <Snackbar
            open={this.state.isSnackbarVisible}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          >
            <Alert
              icon={false}
              style={{
                width: "100vw",
                color: "white",
                background: "rgba(122,122,122,0.85)",
                fontSize: 16,
              }}
              onClose={() => this.setState({ isSnackbarVisible: false })}
            >
              {" "}
              Click <ShareIcon size={18} /> and{" "}
              <strong>'Add to Home Screen'</strong> to download the app
            </Alert>
          </Snackbar>
        );
      } else if (
        window.navigator.userAgent.match("Android") !== null &&
        this.props.utils.loading === false
      ) {
        return (
          <Snackbar
            open={this.state.isSnackbarVisible}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
          >
            <Alert
              icon={false}
              style={{
                width: "100vw",
                color: "white",
                background: "rgba(122,122,122,0.85)",
                fontSize: 16,
              }}
              onClose={() => this.setState({ isSnackbarVisible: false })}
            >
              {" "}
              Click{" "}
              <KebabHorizontalIcon
                size={18}
                className="signin-form-kebab-icon"
              />{" "}
              and <strong>'install app'</strong> to download the app
            </Alert>
          </Snackbar>
        );
      }
    }
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
            name="email"
            label="Email"
            type="email"
            onChange={this.handleChange}
          />
          <TextField
            fullWidth
            className="signin-input"
            variant="outlined"
            name="password"
            label="Password"
            type={this.state.isPasswordVisible ? "text" : "password"}
            onChange={this.handleChange}
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
        </div>
        <div className="signin-forgot-password">
          <Link href="/reset-password">Forgot Password?</Link>
        </div>
        <div className="signin-form-group-button">
          <ReallosButton
            primary
            fullWidth
            variant="light"
            disabled={this.props.utils.loading}
            onClick={this.onSubmit}
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
            <img src={GoogleLogo} alt="" style={{ borderRadius: "50%" }} />
          </Fab>

          <Fab
            color="primary"
            size="large"
            aria-label="Login with LinkedIn"
            onClick={() => {
              if (!this.props.utils.loading) this.props.loginWithFacebook();
            }}
          >
            <img src={FacebookLogo} alt="" style={{ borderRadius: "50%" }} />
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
        </div>
        <div style={{ textAlign: "center" }}>
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
        {this.showDownloadInfo()}

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
            {this.state.mailErrorText}
          </Alert>
        </Snackbar>
      </Scaffold>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(SignIn));
