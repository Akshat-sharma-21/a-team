import React from "react";
import "./PreAprooved.css";
import { Button } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import preaprooved from "../../assets/preaprooved.png";

function PreAprooved() {
  return (
    <div className="App">
      <div>
        <ArrowBackIcon id="arrow-icon1"></ArrowBackIcon>
      </div>

      <div>
        <img src={preaprooved} alt="logo" id="logo1"></img>
      </div>

      <div>
        <p id="content1">
          Answer A Few Questions <br />
          To Get Started On Your <br />
          Pre-Approval{" "}
        </p>
      </div>

      <div>
        <Button id="button1" variant="contained">
          Let's Start
        </Button>
      </div>
    </div>
  );
}

export default PreAprooved;
