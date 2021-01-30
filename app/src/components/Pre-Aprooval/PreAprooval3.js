import React from "react";
import "./PreAprooval3.css";
import { Button, Avatar } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import { withStyles } from "@material-ui/core/styles";
import { LinearProgress } from "@material-ui/core";
import Logo1 from "../../assets/yes.png";
import Logo2 from "../../assets/no.png";
import Scaffold from "../utilities/Scaffold/Scaffold";

const BorderLinearProgress = withStyles({
  root: {
    height: 10,
    width: 1200,
    backgroundColor: "rgba(255,255,255,0.2)",
  },
  bar: {
    backgroundColor: "white",
  },
})(LinearProgress);

function PreAprooval3() {
  return (
    <Scaffold bgVariant="gradient">
      <BorderLinearProgress value={50} variant="determinate" />
      <div className="preaprooval-child-container-3">
        <h1>
          Are You <br />
          Pre-Aprooved ?
        </h1>
        <p className="cc3-paragraph">
          Lorem Ipsum is simply dummy text of the
          <br />
          printing and typesetting industry.
          <br />
          Lorem Ipsum has been the industry's <br />
          standard dummy text ever since the 1500s...
        </p>
        <Button
          variant="outlined"
          style={{ marginTop: "5vh", background: "rgba(255, 255, 255, 0.2)" }}
          className="cc3-button1"
          startIcon={<Avatar src={Logo1} />}
        >
          YES
        </Button>
        <div>
          <Button
            variant="outlined"
            style={{
              marginTop: "2.5vh",
              background: "rgba(255, 255, 255, 0.2)",
            }}
            className="cc3-button2"
            startIcon={<Avatar src={Logo2} />}
          >
            NO
          </Button>
        </div>
        <ArrowBackIcon
          style={{ width: "4vw", height: "6vh" }}
          className="cc3-backicon"
        />
        <ArrowForwardIcon
          style={{ width: "4vw", height: "6vh" }}
          className="cc3-forwardicon"
        />
      </div>
    </Scaffold>
  );
}

export default PreAprooval3;
