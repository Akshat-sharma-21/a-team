import React from "react";
import DeviceNotSupportedImg from "../../assets/DeviceNotSupportedImg.svg";
import "./DeviceNotSupported.css";

function DeviceNotSupported() {
  return (
    <div className="device-not-supported">
      <img src={DeviceNotSupportedImg} alt="Desktop img" className="dns-img" />
      <div className="device-not-supported-heading">
        Device Not Supported :(
      </div>
      <div className="device-not-supported-text">
        Please open the Reallos App on your phone and get started on your Home
        Buying Journey
      </div>
    </div>
  );
}

export default DeviceNotSupported;
