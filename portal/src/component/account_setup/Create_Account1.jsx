import React from "react";
import { TextField } from "@material-ui/core";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import ReallosModal from "../utilities/modal/modal";
import ReallosButton from "../utilities/reallos_button/ReallosButton";
import Scaffold from "../utilities/scaffold/Scaffold";
import cimage from "../../assets/cimage.png";

function Create_Account1() {
  return (
    <Scaffold>
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
            <div style={subitem3}>
              <ReallosButton primary buttonWidth="105%" style={subitem3}>
                Next
                <ArrowForwardIcon style={{ marginLeft: "10px" }} />
              </ReallosButton>
            </div>
          </div>
        </div>
      </ReallosModal>
    </Scaffold>
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
  gridtemplaterows: "auto auto auto",
};

const subitem1 = {
  marginTop: "-380px",
  marginLeft: "270px",
};

const subitem2 = {
  width: "275px",
  top: "-300px",
  left: "270px",
};

const subitem3 = {
  marginTop: "-140px",
  marginLeft: "270px",
};

export default Create_Account1;
