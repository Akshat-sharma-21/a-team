import React from "react";
import "./PreAprooved3.css";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import RefreshOutlinedIcon from "@material-ui/icons/RefreshOutlined";
import { Button, Avatar } from "@material-ui/core";
import preaprooved3 from "../../assets/preaprooved3.png";

function PreAprooved3() {
  return (
    <div>
      <ArrowBackIcon id="backicon" />
      <div>
        <img id="logo" src={preaprooved3} alt="emoji" />
      </div>
      <p>
        You've Answered all <br /> The Questions ! Do You Want <br />
        Submit Them.
      </p>

      <div>
        <Button id="b1" variant="contained">
          Yeah Sure !
        </Button>
      </div>

      <div>
        <Button
          id="b2"
          variant="contained"
          startIcon={<Avatar src={<RefreshOutlinedIcon />} />}
        >
          Start Over
        </Button>
      </div>
    </div>
  );
}

export default PreAprooved3;
