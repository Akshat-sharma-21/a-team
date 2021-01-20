import React from "react";
import { TextField, Button } from "@material-ui/core";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import ReallosModal from "./modal";
import cimage from "../../assets/cimag.png";

function Create_Account2() {
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
            style={subitem6}
            className="subitem6"
            variant="outlined"
            label="Confirm Password"
          ></TextField>

          <div className="item3" style={item3}>
            <Button style={subitem4} className="subitem4" variant="contained">
              Back
            </Button>
            <Button style={subitem5} className="subitem5" variant="contained">
              Next<ArrowForwardIcon variant="contained"></ArrowForwardIcon>
            </Button>
          </div>
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
  gridtemplaterows: "auto auto auto auto",
};

const item3 = {
  display: "flex",
  flexdirection: "row",
  marginTop: "-150px",
  marginLeft: "300px",
};

const subitem2 = {
  width: "275px",
  height: "10px",
  top: "-300px",
  left: "275px",
};

const subitem6 = {
  width: "275px",
  height: "10px",
  top: "-240px",
  left: "275px",
};

const subitem4 = {
  top: "60px",
  left: "90px",
  width: "80px",
  height: "40px",
};

const subitem5 = {
  top: "60px",
  left: "100px",
  background: "linear-gradient(to left,#33ccff 0%,#2B44FF 90%)",
  color: "white",
  width: "80px",
  height: "40px",
};

export default Create_Account2;
