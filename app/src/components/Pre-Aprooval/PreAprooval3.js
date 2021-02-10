import React from "react";
import "./PreAprooval3.css";
import { IconButton, Button, Avatar } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import { withStyles } from "@material-ui/core/styles";
import { LinearProgress } from "@material-ui/core";
import Logo1 from "../../assets/yes.png";
import Logo2 from "../../assets/no.png";
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

function PreAprooval3() {
  return (
    <Scaffold bgVariant="gradient">
      <BorderLinearProgress
        id="pre-cc3-pbar"
        value={50}
        variant="determinate"
      />
      <div className="preaprooval-child-container-3">
        <h1 className="cc3-heading">
          Are You <br />
          Pre-Aprooved ?
        </h1>
        <p className="cc3-paragraph">
          Lorem Ipsum is simply dummy text
          <br />
          printing and typesetting industry.
          <br />
          Lorem Ipsum has been the industry's <br />
          standard dummy text ever since 1500s...
        </p>
        <Button
          variant="outlined"
          className="cc3-button1"
          style={{
            marginTop: "2.5vh",
            background: "rgba(255,255,255,0.2)",
            width: "75vw",
            borderRadius: "10px 10px",
          }}
          startIcon={<Avatar src={Logo1} />}
        >
          YES
        </Button>
        <div>
          <Button
            variant="outlined"
            className="cc3-button2"
            style={{
              marginTop: "2.5vh",
              background: "rgba(255,255,255,0.2)",
              width: "75vw",
              borderRadius: "10px 10px",
            }}
            startIcon={<Avatar src={Logo2} />}
          >
            NO
          </Button>
        </div>
        <IconButton style={{ marginTop: "30vh" }}>
          <ArrowBackIcon
            style={{ width: "10vw", height: "5vh" }}
            className="cc3-arrowbackicon"
          />
        </IconButton>
        <IconButton style={{ marginTop: "30vh" }}>
          <ArrowForwardIcon
            style={{ width: "10vw", height: "5vh" }}
            className="cc3-arrowforwardicon"
          />
        </IconButton>
      </div>
    </Scaffold>
  );
}

export default PreAprooval3;
