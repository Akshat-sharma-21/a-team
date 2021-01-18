import React from "react";
import "./PreAprooved4.css";
import { Avatar, Button } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { LinearProgress } from "@material-ui/core";
import {withStyles } from '@material-ui/core/styles'


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

function PreAprooved4() {
  return (
    <div>
      <div style={{ paddingTop: "25px" }}>
        <BorderLinearProgress id='pbar' variant='determinate' value='50'/>

      </div>

      <div>
        <p id="heading">
          Are You <br />
          Pre-Approoved ?
        </p>
      </div>

      <div>
        <p id="content">
          Lorem ipsum is a placeholder text commonly
          <br /> used to demonstrate the visual form of a <br />
          document or a typeface without <br /> relying on meaningful content.
        </p>
      </div>

      <div>
        <Button
          id="button"
          variant="filled"
          startIcon={<Avatar src={"yes.png"} />}
        >
          YES
        </Button>
      </div>

      <div>
        <Button
          id="button"
          variant="ooutlined"
          startIcon={<Avatar src={"no.png"} />}
        >
          NO
        </Button>
      </div>

      <div  id='aicons ' style={{marginTop:'5vh'}}>
        <ArrowBackIcon id="arrowbicon" />
      </div>
    </div>
  );
}

export default PreAprooved4;
