import React from "react";
import "./PreAprooved1.css";
import { Avatar, Button } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import { LinearProgress } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import yes from "../../assets/yes.png";
import no from "../../assets/no.png";

const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 10,
    borderRadius: 5,
  },
  colorPrimary: {
    backgroundColor:
      theme.palette.grey[theme.palette.type === "light" ? 200 : 700],
  },
  bar: {
    borderRadius: 5,
    backgroundColor: "#1a90ff",
  },
}))(LinearProgress);

function PreAprooved1() {
  return (
    <div>
      <div style={{ paddingTop: "25px" }}>
        <BorderLinearProgress id="pbar" variant="determinate" value="50" />
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
        <Button id="button" variant="filled" startIcon={<Avatar src={yes} />}>
          YES
        </Button>
      </div>

      <div>
        <Button id="button" variant="ooutlined" startIcon={<Avatar src={no} />}>
          NO
        </Button>
      </div>

      <div
        id="aicons "
        style={{ display: "flex", flexDirection: "row", marginTop: "5vh" }}
      >
        <ArrowBackIcon id="arrowbicon" />
        <ArrowForwardIcon id="arrowficon" />
      </div>
    </div>
  );
}

export default PreAprooved1;
