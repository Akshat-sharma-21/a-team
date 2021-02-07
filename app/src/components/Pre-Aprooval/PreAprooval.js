import React from "react";
import "./PreAprooval.css";
import ReallosButton from "../utilities/reallos_button/ReallosButton";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Logo from "../../assets/preaprooved.png";
import Scaffold from "../utilities/Scaffold/Scaffold";

function PreAprooval() {
  return (
    <Scaffold bgVariant="gradient">
      <div className="arrow-icon">
        <ArrowBackIcon />
      </div>
      <div className="preaprooval-child-container">
        <img src={Logo} alt="logo goes here" />
        <p>
          Answer a few questions
          <br />
          to get started on your
          <br />
          Pre-Aprooval
        </p>
        <ReallosButton
          className="cc-reallosbutton"
          primary
          variant="light"
          buttonWidth={275}
        >
          Let's Start
        </ReallosButton>
      </div>
    </Scaffold>
  );
}

export default PreAprooval;
