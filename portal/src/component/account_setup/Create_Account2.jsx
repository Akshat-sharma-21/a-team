import React from "react";
import { TextField, Button } from "@material-ui/core";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import ReallosModal from "../utilities/modal/modal";
import Scaffold from "../utilities/scaffold/Scaffold";
import cimage from "../../assets/cimage.png";
import ReallosButton from "../utilities/reallos_button/ReallosButton";

function Create_Account2() {
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
            <h1
              className="subitem1"
              style={{ marginTop: "-380px", marginLeft: "280px" }}
            >
              Account Setup
            </h1>

            <TextField
              style={subitem2}
              className="subitem2"
              variant="outlined"
              label="Create Password"
            ></TextField>
            <TextField
              style={subitem3}
              className="subitem6"
              variant="outlined"
              label="Confirm Password"
            ></TextField>

            <div
              style={{
                display: "flex",
                flexdirection: "row",
                marginLeft: "320px",
                marginTop: "-80px",
              }}
            >
              <div>
                <ReallosButton>BACK</ReallosButton>
              </div>

              <div style={{ marginLeft: "10px" }}>
                <ReallosButton primary>
                  NEXT
                  {/* <ArrowForwardIcon /> */}
                </ReallosButton>
              </div>
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
  gridtemplaterows: "auto auto auto auto",
};

const subitem2 = {
  width: "275px",
  height: "10px",
  top: "-300px",
  left: "275px",
};

const subitem3 = {
  width: "275px",
  height: "10px",
  top: "-240px",
  left: "275px",
};

export default Create_Account2;
