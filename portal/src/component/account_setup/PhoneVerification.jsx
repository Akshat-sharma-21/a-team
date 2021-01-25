import React from "react";
import { TextField } from "@material-ui/core";
import { ReallosModal, ReallosButton, Scaffold } from "../utilities/core";
import cimage from "../../assets/cimage.png";
import verified from "../../assets/verified.png";

function PhoneVerification() {
  return (
    <Scaffold>
      <ReallosModal visible="true" modalWidth="50%" modalHeight="65%">
        <div className="container" style={container}>
          <div
            className="item1"
            style={{ marginTop: "-33px", marginLeft: "-45px" }}
          >
            <img
              src={cimage}
              alt="left component"
              width="320px"
              height="438px"
            ></img>
          </div>

          <div className="item2" style={item2}>
            <img
              style={{ marginTop: "-400px", marginLeft: "400px" }}
              src={verified}
              alt="verified logo"
              width="60px"
              height="60px"
            ></img>

            <h2 style={{ marginLeft: "320px", marginTop: "-320px" }}>
              Phone Verification
            </h2>

            <p style={{ marginLeft: "275px", marginTop: "-270px" }}>
              A confirmation code has sent to your email . Please enter it to
              proceed.
            </p>

            <div
              className="item3"
              style={{
                marginLeft: "275px",
                marginTop: "-200px",
                display: "flex",
                flexDirection: "row",
              }}
            >
              <TextField
                variant="outlined"
                style={(mystyle, { marginLeft: "-5px" })}
              ></TextField>
              <TextField
                variant="outlined"
                style={(mystyle, { marginLeft: "10px" })}
              ></TextField>
              <TextField
                variant="outlined"
                style={(mystyle, { marginLeft: "10px" })}
              ></TextField>
              <TextField
                variant="outlined"
                style={(mystyle, { marginLeft: "10px" })}
              ></TextField>
            </div>

            <p style={{ marginLeft: "280px", marginTop: "-120px" }}>
              Did'nt get the code ?
              <a href="#" style={{ color: "blue" }}>
                resend it
              </a>
            </p>

            <div
              style={{
                display: "flex",
                flexdirection: "row",
                marginLeft: "360px",
                marginTop: "-75px",
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

const mystyle = {
  width: "50px",
  height: "10px",
  borderradius: " 12px 12px 12px 12px ",
  marginTop: "-20px",
};

const container = {
  display: "grid",
  gridtemplatecolumns: "auto auto",
};

const item2 = {
  display: "grid",
  gridtemplaterows: "auto auto auto auto auto",
  marginLeft: "20px",
};

export default PhoneVerification;
