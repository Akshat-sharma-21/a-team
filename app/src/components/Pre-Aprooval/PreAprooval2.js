import React from "react";
import "./PreAprooval2.css";
import { TextField } from "@material-ui/core";
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
          Lorem Ipsum is simply dummy text of the
          <br />
          printing and typesetting industry.
          <br />
          Lorem Ipsum has been the industry's <br />
          standard dummy text ever since the 1500s...
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
          <ArrowBackIcon id="pre-cc2-back-icon" />
          <ArrowForwardIcon id="pre-cc2-forward-icon" />
        </div>
      </div>
    </Scaffold>
  );
}

export default PreAprooval2;
