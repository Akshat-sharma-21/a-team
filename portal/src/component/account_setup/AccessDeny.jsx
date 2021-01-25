import React from "react";
import { Button } from "@material-ui/core";
import ReallosModal from "./modal";
import cimage from "../../assets/cimage.png";
import deny from "../../assets/deny.png";

function AccessDeny() {
  return (
    <ReallosModal visible="true" modalWidth="620px" modalHeight="391px">
      <div className="container" style={container}>
        <div
          className="item1"
          style={{ marginLeft: "-50px", marginTop: "-38px" }}
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
            style={{ marginLeft: "380px", marginTop: "-375px" }}
            src={deny}
            width="70px"
            height="70x"
            alt=" Access denied logo"
          ></img>

          <h2 style={{ marginLeft: "340px", marginTop: "-300px" }}>
            Access Denied
          </h2>

          <p style={{ marginTop: "-240px", marginLeft: "275px" }}>
            We are a closed platform and your email does'nt seems to be in our
            list.To be a part of our platform fill out a form at
            <a href="#" style={{ color: "blue" }}>
              {" "}
              reallos.com
            </a>
          </p>

          <Button
            variant="outlined"
            style={{
              left: "350px",
              top: "-60px",
              width: "120px",
              height: "40px",
            }}
          >
            Go Back
          </Button>
        </div>
      </div>
    </ReallosModal>
  );
}

const container = {
  display: "grid",
  gridtemplatecolumns: "auto auto",
  padding: "5px",
};

const item2 = {
  display: "grid",
  gridtemplaterows: "auto auto auto",
};

export default AccessDeny;
