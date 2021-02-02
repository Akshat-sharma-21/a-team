import React from "react";
import "./PreAprooval4.css";
import { Avatar, Button } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Logo3 from "../../assets/preaprooved3.png";
import Refresh from "../../assets/refresh.png";
import Scaffold from "../utilities/Scaffold/Scaffold";

function PreAprooval4() {
  return (
    <Scaffold bgVariant="gradient">
      <ArrowBackIcon />
      <div className="preaprooval-child-container-4">
        <img src={Logo3} alt="logo goes here" />
        <p>
          You've answered all <br /> the questions ! Do you want
          <br />
          to submit them ?
        </p>
        <Button
          id="cc4-button1"
          variant="outlined"
          style={{
            marginLeft: "14vw",
            marginTop: "10vh",
            background: "white",
            color: "blue",
            width: "60vw",
            borderRadius: "10px 10px 10px 10px",
          }}
        >
          Yeah,Sure!
        </Button>
        <div>
          <Button
            style={{
              marginLeft: "14vw",
              marginTop: "2vh",
              width: "60vw",
              background: "transparent",
              borderColor: " 2px solid white",
              borderRadius: "10px 10px 10px 10px",
            }}
            id="cc4-button2"
            variant="outlined"
            startIcon={<Avatar src={Refresh} />}
          >
            Start Over
          </Button>
        </div>
      </div>
    </Scaffold>
  );
}

export default PreAprooval4;
