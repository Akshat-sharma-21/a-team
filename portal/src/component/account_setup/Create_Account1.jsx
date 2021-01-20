import React from "react";
import { TextField, Button } from "@material-ui/core";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import ReallosModal from "./modal.js";
import cimage from "../../assets/cimage.png";

function Create_Account1() {
  return (
    <ReallosModal visible="true" modalWidth="620px" modalHeight="391px">
      <div className="container" style={container}>
        <div className="item1" style={item1}>
          <img
            src={cimage}
            alt="left component"
            width="300px"
            height="400px"
          ></img>
        </div>

        <div className="item2" style={item2}>
          <h1 className="subitem1" style={subitem1}>
            Account Setup
          </h1>

          <TextField
            className="subitem2"
            style={subitem2}
            variant="outlined"
            label="Email"
          ></TextField>

          <Button className="subitem3" style={subitem3} variant="contained">
            Next
            <ArrowForwardIcon variant="contained"></ArrowForwardIcon>
          </Button>
        </div>
      </div>
    </ReallosModal>
  );
}

const container = {
  display: "grid",
  gridtemplatecoloumns: "auto auto",
};

const item1 = {
  marginTop: "-33px",
  marginLeft: "-45px",
};

const item2 = {
  display: "grid",
  gridtemplaterows: "auto auto",
};

const subitem1 = {
  marginTop: "-380px",
  marginLeft: "260px",
};

const subitem2 = {
  width: "275px",
  top: "-300px",
  left: "260px",
};

const subitem3 = {
  width: "275px",
  top: "-120px",
  left: "260px",
  background: "linear-gradient(to left,#33ccff 0%,#2B44FF 90%)",
  color: "white",
};

export default Create_Account1;
