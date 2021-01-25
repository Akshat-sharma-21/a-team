import React from "react";
import { TextField } from "@material-ui/core";
import { ReallosModal, ReallosButton, Scaffold } from "../utilities/core";
import cimage from "../../assets/cimage.png";

function CreateAccount2() {
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
            <h1
              className="subitem1"
              style={{ marginTop: "-420px", marginLeft: "300px" }}
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
              <div style={{ marginLeft: "50px" }}>
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
  top: "-350px",
  left: "300px",
};

const subitem3 = {
  width: "275px",
  height: "10px",
  top: "-280px",
  left: "300px",
};

export default CreateAccount2;
