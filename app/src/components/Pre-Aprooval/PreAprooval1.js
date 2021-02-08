import React from "react";
import "./PreAprooval1.css";
import { IconButton, Avatar } from "@material-ui/core";
import ReallosButton from "../utilities/reallos_button/ReallosButton";
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
    borderRadius: "16px 16px 16px 16px ",
    backgroundColor: "lightgrey",
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
        <h1 className="cc1-heading">
          Are you <br />
          Pre-Aprooved ?
        </h1>
        <p className="cc1-paragraph">
          Lorem Ipsum is simply dummy text of the
          <br />
          printing and typesetting industry.
          <br />
          Lorem Ipsum has been the industry's <br />
          standard dummy text ever since the 1500s...
        </p>
        <ReallosButton
          primary
          variant="light"
          buttonWidth={275}
          className="cc1-button1"
          startIcon={<Avatar src={Logo1} />}
        >
          YES
        </ReallosButton>
        <div>
          <ReallosButton
            primary
            variant="light"
            buttonWidth={275}
            className="cc1-button2"
            startIcon={<Avatar src={Logo2} />}
          >
            NO
          </ReallosButton>
          <IconButton>
            <ArrowBackIcon
              style={{ width: "10vw", height: "5vh" }}
              className="cc1-arrow-icon-1"
            />
          </IconButton>
        </div>
      </div>
    </Scaffold>
  );
}

export default PreAprooval1;
