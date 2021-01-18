import React from "react";
import "./PreAprooved2.css";
import { TextField } from "@material-ui/core";
import {withStyles } from '@material-ui/core/styles';
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import { LinearProgress } from '@material-ui/core';


const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 10,
    borderRadius: 5,
  },
  colorPrimary: {
    backgroundColor: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
  },
  bar: {
    borderRadius: 5,
    backgroundColor: '#1a90ff',
  },
}))(LinearProgress);


function PreAprooved2 (){
  return (

        <div>
        <div style={{paddingTop:'20px',marginLeft:'12vw',width:'75%'}} id='pbar'>
          <BorderLinearProgress id='pbar' variant='determinate' value='50'/>
        </div>
        <div>
          <h1>Enter Your Name</h1>
        </div>

      
        <p>
          Lorem ipsum is a placeholder text commonly
          <br /> used to demonstrate the visual form of a <br />
          document or a typeface without <br /> relying on meaningful content.
        </p>


      <div style={{marginTop:'10vh'}}>
        <TextField id="textfield" 
            variant="outlined"  
            label="Name" 
            />
      </div>

      <div id="arrowicons" style={{marginTop:'25vh'}}>
        <ArrowBackIcon id="backicon"></ArrowBackIcon>
        <ArrowForwardIcon id="forwardicon"></ArrowForwardIcon>
      </div>
    </div>
  );
}


export default PreAprooved2;
