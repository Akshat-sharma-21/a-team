import React, { useState, useEffect } from "react";
import { Scaffold, ReallosButton } from "../../utilities/core";
import { navigateTo } from "../../../utils.js";
import {
  TextField,
  Fab,
  Divider,
  IconButton,
  withStyles,
  Snackbar,
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
import { clearErrors } from "../../../actions/utilsActions";
import { validateFormField } from "../../../utils";

const mapStateToProps = (state) => ({
  utils: state.utils,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      login,
      loginWithGoggle,
      loginWithProviderHelper,
      loginWithFacebook,
      clearErrors,
    },
    dispatch
  );
};

const styles = () => ({
  input: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
});

function SignIn(props) {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [passwordVisibile, setPasswordVisible] = useState(false);
  let [snackBarVisible, setSnackBarVisible] = useState(true);
  let [showError, setShowError] = useState(false);
  let [errorText, setErrorText] = useState("");

  useEffect(() => {
    props.loginWithProviderHelper(); // To handle login with provider
  }, []);

  if (props.utils.errors && !showError) {
    // if there is error and the showError modal is not open
    if (props.utils.errors.code === "auth/wrong-password") {
      setSnackBarVisible(false);
      setShowError(true);
      setErrorText("Password is Incorrect");
    } else if (props.utils.errors.code === "auth/user-not-found") {
      setSnackBarVisible(false);
      setShowError(true);
      setErrorText("User doesn't exist");
    } else if (props.utils.errors.code === "auth/too-many-requests") {
      setSnackBarVisible(false);
      setShowError(true);
      setErrorText("Too many requests! Please wait for a while");
    }
  }

  const showDownloadInfo = () => {
    // function to allow user to install the app
    if (window.matchMedia("(display-mode: standalone)").matches) {
      // if the pwa is already being used
      return <></>;
    } else {
      // if the app is opened in browser
      if (
        window.navigator.userAgent.match("iPhone") !== null &&
        props.utils.loading === false
      ) {
        return (
          <Snackbar
            open={snackBarVisible}
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
              onClose={() => setSnackBarVisible(false)}
            >
              {" "}
              Click <ShareIcon size={18} /> and{" "}
              <strong>'Add to Home Screen'</strong> to download the app
            </Alert>
          </Snackbar>
        );
      } else if (
        window.navigator.userAgent.match("Android") !== null &&
        props.utils.loading === false
      ) {
        return (
          <Snackbar
            open={snackBarVisible}
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
              onClose={() => setSnackBarVisible(false)}
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
  };

  const submit = () => {
    let validEmail = validateFormField(email, "email");
    if (validEmail.hasError) {
      setSnackBarVisible(false);
      setShowError(true);
      setErrorText(validEmail.errorText);
    } else if (password === "" || password === null) {
      setSnackBarVisible(false);
      setShowError(true);
      setErrorText("Password cannot be empty");
    } else {
      props.login({
        email: email,
        password: password,
      });
    }
  };

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
          value={email}
          label="Email"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          fullWidth
          className="signin-input"
          variant="outlined"
          value={password}
          label="Password"
          type={passwordVisibile ? "text" : "password"}
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <IconButton
                aria-label={
                  passwordVisibile ? "Hide Password" : "Show Password"
                }
                onClick={() => setPasswordVisible(!passwordVisibile)}
              >
                {passwordVisibile ? <EyeClosedIcon /> : <EyeIcon />}
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
          disabled={props.utils.loading}
          onClick={() => submit()}
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
            if (!props.utils.loading) props.loginWithGoggle();
          }}
        >
          <img src={GoogleLogo} alt="" style={{ borderRadius: "50%" }} />
        </Fab>

        <Fab
          color="primary"
          size="large"
          aria-label="Login with LinkedIn"
          onClick={() => {
            if (!props.utils.loading) props.loginWithFacebook();
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
          disabled={props.utils.loading}
          onClick={() => navigateTo("/signup", props.history)}
        >
          Signup
          <span style={{ marginLeft: 10 }}>
            <ArrowRightIcon size={20} />
          </span>
        </ReallosButton>
      </div>
      {showDownloadInfo()}
      <Snackbar
        open={showError}
        autoHideDuration={6000}
        onClose={() => {
          setShowError(false);
          props.clearErrors();
        }}
      >
        <Alert
          onClose={() => {
            setShowError(false);
            props.clearErrors();
          }}
          severity="warning"
          variant="filled"
        >
          {errorText}
        </Alert>
      </Snackbar>
    </Scaffold>
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(SignIn));
