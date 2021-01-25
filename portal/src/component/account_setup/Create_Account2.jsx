import React from "react";
import { TextField } from "@material-ui/core";
import { ArrowRightIcon } from "@primer/octicons-react";
import ReallosModal from "../utilities/modal/modal";
import Scaffold from "../utilities/scaffold/Scaffold";
import cimage from "../../assets/cimage.png";
import ReallosButton from "../utilities/reallos_button/ReallosButton";

function Create_Account2() {
  return (
    <Scaffold>
      <ReallosModal visible="true" modalWidth="50%" modalHeight="65%">
        <div style={container}>
          <div style={item1}>
            <img
              src={cimage}
              alt="left component"
              width="375px"
              height="481px"
            ></img>
          </div>

          <div className="item2" style={item2}>
            <h1 style={subitem1}>Account Setup</h1>

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
                marginTop: "-90px",
              }}
            >
              <div style={{ marginLeft: "150px" }}>
                <ReallosButton>Back</ReallosButton>
              </div>

              <div style={{ marginLeft: "10px" }}>
                <ReallosButton primary>
                  Next
                  <ArrowRightIcon />
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
  marginTop: "-34px",
  marginLeft: "-46px",
};

const item2 = {
  display: "grid",
  gridtemplaterows: "auto auto auto auto",
};

const subitem1 = {
  marginTop: "-420px",
  marginLeft: "360px",
};

const subitem2 = {
  height: "10px",
  width: "275px",
  top: "-350px",
  left: "360px",
};
const subitem3 = {
  height: "10px",
  width: "275px",
  top: "-280px",
  left: "360px",
};

export default Create_Account2;
