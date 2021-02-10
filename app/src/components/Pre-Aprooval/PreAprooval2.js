import React from "react";
import "./PreAprooval2.css";
import { TextField, IconButton } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import { withStyles } from "@material-ui/core/styles";
import { LinearProgress } from "@material-ui/core";
import Scaffold from "../utilities/Scaffold/Scaffold";

const BorderLinearProgress = withStyles({
  root: {
    height: 8,
    width: 1200,
    borderRadius: "12px 12px 12px 12px ",
    backgroundColor: "rgba(255,255,255,0.2)",
  },
  bar: {
    backgroundColor: "white",
  },
})(LinearProgress);

function PreAprooval2() {
  return (
    <Scaffold bgVariant="gradient">
      <BorderLinearProgress
        id="pre-cc2-pbar"
        value={50}
        variant="determinate"
      />
      <div className="preaprooval-child-container-2">
        <h1>Enter Your Name</h1>
        <p>
          Lorem Ipsum is simply dummy text of
          <br />
          printing and typesetting industry.
          <br />
          Lorem Ipsum has been the industry's <br />
          standard dummy text ever since 1500s...
        </p>
        <TextField
          style={{ marginTop: "5vh" }}
          className="cc2-textfield"
          variant="outlined"
          label="Name"
        />
        <div
          style={{ marginTop: "40vh", display: "flex", flexDirection: "row" }}
        >
          <IconButton>
            <ArrowBackIcon style={{width:'10vw',height:'5vh'}} id="pre-cc2-back-icon" />
            <ArrowForwardIcon style={{width:'10vw',height:'5vh'}} id="pre-cc2-forward-icon" />
          </IconButton>
        </div>
      </div>
    </Scaffold>
  );
}

export default PreAprooval2;
