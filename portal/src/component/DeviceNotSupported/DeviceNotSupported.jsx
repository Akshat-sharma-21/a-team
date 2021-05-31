import React from "react";
import DeviceNotSupportedImg from "../../assets/DeviceNotSupportedImg.svg";
import "./DeviceNotSupported.css";

function DeviceNotSupported() {
  return (
    <div className="device-not-supported">
      <div>
        <img src={DeviceNotSupportedImg} alt="Phone img" className="dns-img" />
      </div>
      <div className="device-not-supported-heading">
        Device not supported :(
      </div>
      <div className="device-not-supported-text">
        Reallos is not supported on this Device. Please open the app on your
        Laptop or PC. If you're a buyer{" "}
        <span style={{ fontWeight: "bold", color: "#2B44FF" }}>click here</span>
      </div>
    </div>
  );
}

export default DeviceNotSupported;
