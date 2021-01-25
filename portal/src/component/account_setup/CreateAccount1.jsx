import React from "react";
import { TextField } from "@material-ui/core";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import { ReallosModal, ReallosButton, Scaffold } from "../utilities/core";
import cimage from "../../assets/cimage.png";

function CreateAccount1() {
  return (
    <Scaffold>
      <ReallosModal visible="true" modalWidth="50%" modalHeight="65%">
        <div className="container" style={container}>
          <div className="item1" style={item1}>
            <img
              src={cimage}
              alt="left component"
              width="320px"
              height="438px"
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
              <ReallosButton primary buttonWidth="100%" style={subitem3}>
                Next
                <div style={{ marginTop: "-20px", marginLeft: "6vw" }}>
                  <ArrowForwardIcon />
                </div>
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
  marginTop: "-420px",
  marginLeft: "300px",
};

const subitem2 = {
  width: "275px",
  top: "-350px",
  left: "300px",
};

const subitem3 = {
  marginTop: "-140px",
  marginLeft: "300px",
};

export default CreateAccount1;
