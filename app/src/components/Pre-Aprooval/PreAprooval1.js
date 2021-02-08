import React from "react";
import "./PreAprooval1.css";
import { Button, Avatar } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
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
    backgroundColor: "grey",
  },
  bar: {
    backgroundColor: "blue",
  },
})(LinearProgress);

function PreAprooval1() {
  return (
    <Scaffold>
      <BorderLinearProgress id="cc1-pbar" value={50} variant="determinate" />
      <div className="preapproval-child-container-1">
        <h1>
          Are you <br />
          Pre-Aprooved ?
        </h1>
        <p>
          Lorem Ipsum is simply dummy text of the
          <br />
          printing and typesetting industry.
          <br />
          Lorem Ipsum has been the industry's <br />
          standard dummy text ever since the 1500s...
        </p>
        <Button id="cc1-button1" startIcon={<Avatar src={Logo1} />}>
          YES
        </Button>
        <div>
          <Button id="cc1-button2" startIcon={<Avatar src={Logo2} />}>
            NO
          </Button>
          <div>
            <ArrowBackIcon id="cc1-arrow-icon-1" />
          </div>
        </div>
      </div>
    </Scaffold>
  );
}

export default PreAprooval1;
