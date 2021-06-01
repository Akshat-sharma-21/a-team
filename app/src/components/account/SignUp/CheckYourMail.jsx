import React from "react";
import CheckMailImg from "../../../assets/CheckMailImg.svg";
import "./SignUp.css";

function CheckYourMail() {
  return (
    <div className="check-mail">
      <img
        src={CheckMailImg}
        alt="Mail Img"
        width="100%"
        className="check-mail-img"
      ></img>

      <div className="check-mail-heading">Check your Email</div>

      <div className="check-mail-text">
        We have sent a password recover instructions to your email.
      </div>

      <div className="check-mail-footer">
        Didn't receive the email? Check you spam folder or try another{" "}
        <span style={{ color: "#2b44ff" }}>Email</span>
      </div>
    </div>
  );
}

export default CheckYourMail;
