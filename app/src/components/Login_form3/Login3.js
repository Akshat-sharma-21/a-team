import React from 'react'
import './App.css';

import emoji from './static/emoji.svg'
import google from './static/google.svg'
import linkedin from './static/linkedin.svg'

import {FormControl, TextField} from '@material-ui/core'

export default function App() {
  return (
    <div className="app">
      <div className="main">
        <div className="head">
          <h1 className="emojiHolder">Let us make <img src={emoji} alt="emoji" /></h1>
          <h1>Real Estate, Real Easy</h1>
        </div>
        <div className="form">
          <FormControl fullWidth>
            {/* <TextField id="outlined-basic" label="Email" variant="outlined" />
            <TextField id="outlined-basic" label="Password" variant="outlined" /> */}
            <input type="text" placeholder="Email"></input>
            <input type="password" placeholder="Password"></input>
            <button>Sign in</button>
          </FormControl>
        </div>
        <div className="oauth">
          <div className="oaut"><img src={google} alt="google auth" /></div>
          <div className="oaut"><img src={linkedin} alt="linkedin auth" /></div>
          <div className="line"></div>
        </div>
        <div className="options">
          <a href="./">Don't have an Account?</a>
          <div className="signup">
            <h6>Signup</h6>
            <i className="fas fa-arrow-right"></i>
          </div>
        </div>
      </div>
    </div>
  )
}