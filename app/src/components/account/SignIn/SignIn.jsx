import React from 'react';
import { Scaffold, ReallosButton } from '../../utilities/core';
import { navigateTo } from '../../../utils.js';
import { TextField, Fab, Divider, IconButton, withStyles } from '@material-ui/core';
import { ArrowRightIcon, EyeClosedIcon, EyeIcon } from '@primer/octicons-react';
import HomeImage from '../../../assets/signin_home.png';
import GoogleLogo from '../../../assets/google_logo.png';
import LinkedInLogo from '../../../assets/linkedin_logo.png';
import './SignIn.css';

const styles = theme => ({
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)'
  }
});

class SignIn extends React.Component {
  constructor() {
    super();

    this.state = {
      isPasswordVisible: false
    };
  }
  
  render() {
    return (
      <Scaffold bgVariant="gradient">
        <h2 className="signin-top-subheading">
          Let's make
        </h2>

        <div className="signin-top-heading-group">
          <div className="signin-top-heading">
            <h1>
              Real Estate, Real Easy!
            </h1>
          </div>
          <div>
            <img src={HomeImage} alt="" />
          </div>
        </div>

        <div className="signin-form">
          <TextField
            fullWidth
            className="signin-input"
            variant="outlined"
            label="Email"
            type="email"
          />
          <TextField
            fullWidth
            className="signin-input"
            variant="outlined"
            label="Password"
            type={this.state.isPasswordVisible ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <IconButton
                  aria-label={this.state.isPasswordVisible
                    ? "Hide Password"
                    : "Show Password"
                  }
                  onClick={() => this.setState({
                    isPasswordVisible: !this.state.isPasswordVisible
                  })}
                >
                  {
                    (this.state.isPasswordVisible)
                      ? <EyeClosedIcon />
                      : <EyeIcon />
                  }
                </IconButton>
              )
            }}
          />

          <ReallosButton
            primary
            fullWidth
            variant="light"
          >
            Sign In
          </ReallosButton>
        </div>

        <div className="social-signin-group">
          <Fab color="primary" size="large" aria-label="Login with Google">
            <img src={GoogleLogo} />
          </Fab>

          <Fab color="primary" size="large" aria-label="Login with LinkedIn">
            <img src={LinkedInLogo} style={{
              height: 35,
              width: 35
            }} />
          </Fab>
        </div>

        <Divider style={{
          backgroundColor: '#ffffff',
          height: 1,
          width: '60%',
          marginLeft: 'auto',
          marginRight: 'auto'
        }} />

        <div className="signin-no-account">
          <h3>
            Don't have an account?
          </h3>
          <ReallosButton
            primary
            dense
            variant="light"
            onClick={() => navigateTo('/signup', this.props.history)}
          >
            Signup

            <span style={{ marginLeft: 10 }}>
              <ArrowRightIcon
                size={20}
              />
            </span>
          </ReallosButton>
        </div>
      </Scaffold>
    )
  }
}

export default withStyles(styles)(SignIn);
