import React from "react";
import { TextField, Button } from "@material-ui/core";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import ReallosModal from "./modal.js";
import cimage from "../../assets/cimage.png";
import verified from "../../assets/verified.png";

function Email() {
  return (
    <ReallosModal visible="true" modalWidth="620px" modalHeight="391px">
      <div className="container" style={container}>
        <div
          className="item1"
          style={{ marginTop: "-33px", marginLeft: "-45px" }}
        >
          <img
            src={cimage}
            alt="left component"
            width="300px"
            height="400px"
          ></img>
        </div>

        <div className="item2" style={item2}>
          <img
            style={{ marginTop: "-380px", marginLeft: "380px" }}
            src={verified}
            alt="verified logo"
            width="60px"
            height="60px"
          ></img>

          <h2 style={{ marginLeft: "320", marginTop: "-320px" }}>
            Email Verification
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
              marginLeft: "350px",
              marginTop: "-60px",
            }}
          >
            <Button
              style={{ width: "50px", height: "35px" }}
              variant="contained"
            >
              BACK
            </Button>

            <Button
              variant="filled"
              style={{
                background: "linear-gradient(to left,#33ccff 0%,#2B44FF 90%)",
                marginLeft: "20px",
                width: "80px",
                height: "35px",
                color: "white",
              }}
            >
              NEXT
              <ArrowForwardIcon
                style={{ color: "white" }}
                variant="contained"
              ></ArrowForwardIcon>
            </Button>
          </div>
        </div>
      </div>
    </ReallosModal>
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
};

export default Email;
