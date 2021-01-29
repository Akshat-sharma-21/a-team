import React from "react";
import "./PreAprooval.css";
import { Button } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Logo from "../../assets/preaprooved.png";
import Scaffold from "../utilities/Scaffold/Scaffold";

function PreAprooval() {
  return (
    <Scaffold bgVariant="gradient">
      <div className="arrow-icon">
        <ArrowBackIcon />
      </div>
      <div className="child-container">
        <img src={Logo} alt="logo goes here" />
        <p>
          Answer few questions
          <br />
          to get started on your
          <br />
          Pre-Aprooval
        </p>
        <Button>Let's Start</Button>
      </div>
    </Scaffold>
  );
}

export default PreAprooval;
