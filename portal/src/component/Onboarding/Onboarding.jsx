import React, { useState } from "react";
import {
  Stepper,
  Step,
  StepLabel,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
} from "@material-ui/core";
import {
  CheckIcon,
  MailIcon,
  OrganizationIcon,
  TagIcon,
  StopIcon,
} from "@primer/octicons-react";
import { Grid, TextField } from "@material-ui/core";
import Form1Img from "../../assets/Onboarding-form1-img.svg";
import Form2Img from "../../assets/Onboarding-form2-img.svg";
import Form3Img from "../../assets/Onboarding-form3-img.svg";
import { ReallosButton } from "../utilities/core";
import "./Onboarding.css";
import { CallOutlined } from "@material-ui/icons";
import { validateFormField } from "../../utils";
import { onboardUser } from "../../actions/registartionActions";

function Onboarding() {
  const [role, setRole] = useState("");
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    nmls: "",
  });
  const [errors, setErrors] = useState({
    firstName: null,
    lastName: null,
    email: null,
    phone: null,
    company: null,
    nmls: null,
  });
  const [step, setStep] = useState(0);
  const [showInputLabel, setShowInputLabel] = useState(false);

  const formSubmit = () => {
    if (role.toLowerCase() !== "lender") {
      if (
        errors.firstName &&
        !errors.firstName.hasError &&
        errors.lastName &&
        !errors.lastName.hasError &&
        errors.email &&
        !errors.email.hasError &&
        errors.phone &&
        !errors.phone.hasError &&
        errors.company &&
        !errors.company.hasError
      )
        return false;
      else return true;
    } else {
      if (
        errors.firstName &&
        !errors.firstName.hasError &&
        errors.lastName &&
        !errors.lastName.hasError &&
        errors.email &&
        !errors.email.hasError &&
        errors.phone &&
        !errors.phone.hasError &&
        errors.company &&
        !errors.company.hasError &&
        errors.nmls &&
        !errors.nmls.hasError
      )
        return false;
      else return true;
    }
  };

  function Step1Icon(props) {
    const { active, completed } = props;
    return (
      <div
        className={active || completed ? "step-icons-completed" : "step-icons"}
      >
        1
      </div>
    );
  }

  function Step2Icon(props) {
    const { active, completed } = props;
    return (
      <div
        className={active || completed ? "step-icons-completed" : "step-icons"}
      >
        2
      </div>
    );
  }

  function Step3Icon(props) {
    const { active, completed } = props;
    return (
      <div
        className={active || completed ? "step-icons-completed" : "step-icons"}
      >
        <CheckIcon size={24} />
      </div>
    );
  }

  function getRenderValue() {
    return role === "" ? (
      <div className="onboarding-select-placeholder">Real Estate Agent</div>
    ) : (
      <div className="onboarding-list-item">{role}</div>
    );
  }

  const getSubText = () => {
    // function to return the requird subtext
    if (role.toLowerCase() === "real estate agent")
      return "Hello Agents. You can easily track your buyers progress live, share documents and have your buyers e-sign everything on our platform. We’ll update you once Reallos is live.";
    else if (role.toLowerCase() === "lender")
      return "Once a buyer selects your services, all financial paperwork required by the buyer will be sent to your lender portal in PDF format for you to get at any time.";
    else if (role.toLowerCase() === "escrow agent")
      return "Once the buyer is under contract, we will receive an email with details about the buyer and you have access to the purchase agreement.";
    else if (role.toLowerCase() === "home insurance")
      return "Once the buyer reaches the home insurance stage of the transaction, you will be emailed the buyer information to provide quotes. Please follow the instructions provided for buyers to see your quote.";
    else if (role.toLowerCase() === "home inspector")
      return "Once a buyer is in need of your services, you receive an email with details about the property for you to conduct your home inspection. Please follow the instructions provided in order for the buyer to see the report.";
  };

  function renderForm() {
    if (step === 0) {
      return (
        <>
          <div className="onboarding-left-heading1">Onboarding</div>
          <div className="onboarding-left-subheading1">
            Hello, welcome to Reallos. We're glad to have you in our Journey of
            making Home Buying Effortless and Digital for Buyers. All we need is
            for you to answer a few questions and you'll officially be part of
            the Reallos Ecosystem
          </div>
          <div className="onboarding-left-text1">Select your role</div>
          <FormControl variant="outlined" className="onboarding-select">
            {showInputLabel ? <InputLabel>Role</InputLabel> : ""}
            <Select
              displayEmpty
              label="Role"
              renderValue={() => getRenderValue()}
              onOpen={() => {
                setShowInputLabel(true);
              }}
              onChange={(event) => {
                setRole(event.target.value);
              }}
              value={role}
            >
              <MenuItem
                value={"Real Estate Agent"}
                className="onboarding-list-item"
              >
                Real Estate Agent
              </MenuItem>
              <MenuItem value={"Lender"} className="onboarding-list-item">
                Lender
              </MenuItem>
              <MenuItem
                value={"Home Inspector"}
                className="onboarding-list-item"
              >
                Home Inspector
              </MenuItem>
              <MenuItem value={"Escrow Agent"} className="onboarding-list-item">
                Escrow Agent
              </MenuItem>
              <MenuItem
                value={"Home Insurance"}
                className="onboarding-list-item"
              >
                Home Insurance
              </MenuItem>
            </Select>
          </FormControl>

          <div className="onboarding-btn-div">
            <ReallosButton
              primary
              fullWidth
              className="onboarding-btn"
              disabled={role === ""}
              onClick={() => setStep(step + 1)}
            >
              Next
            </ReallosButton>
          </div>

          <img
            src={Form1Img}
            alt=""
            className="onboarding-left-background-img"
          />
        </>
      );
    }

    if (step === 1) {
      return (
        <>
          <div className="onboarding-left-heading2">{role}</div>
          <div className="onboarding-left-subheading2">{getSubText()}</div>

          <div
            className="onboarding-form2"
            justify="center"
            alignItems="center"
          >
            <Grid container spacing={2}>
              <Grid item xs={1} className="onboarding-form2-icon">
                <TagIcon size={24} />
              </Grid>
              <Grid item xs={5}>
                <TextField
                  size="small"
                  variant="outlined"
                  fullWidth
                  inputProps={{
                    style: { fontFamily: "Gilroy", fontSize: "18px" },
                  }}
                  InputLabelProps={{
                    style: {
                      fontFamily: "Gilroy",
                      fontSize: "18px",
                      color: "#C6BDBD",
                    },
                  }}
                  type="text"
                  name="firstName"
                  label="First Name"
                  value={userData.firstName}
                  error={errors.firstName ? errors.firstName.hasError : false}
                  helperText={
                    errors.firstName
                      ? errors.firstName.hasError
                        ? "cannot be empty"
                        : ""
                      : ""
                  }
                  onChange={(e) => {
                    setUserData({ ...userData, firstName: e.target.value });
                    setErrors({
                      ...errors,
                      firstName: validateFormField(e.target.value, "name"),
                    });
                  }}
                />
              </Grid>
              <Grid item xs={5}>
                <TextField
                  size="small"
                  variant="outlined"
                  fullWidth
                  inputProps={{
                    style: { fontFamily: "Gilroy", fontSize: "18px" },
                  }}
                  InputLabelProps={{
                    style: {
                      fontFamily: "Gilroy",
                      fontSize: "18px",
                      color: "#C6BDBD",
                    },
                  }}
                  type="text"
                  name="lastName"
                  label="Last Name"
                  value={userData.lastName}
                  onChange={(e) => {
                    setUserData({ ...userData, lastName: e.target.value });
                    setErrors({
                      ...errors,
                      lastName: validateFormField(e.target.value, "name"),
                    });
                  }}
                  error={errors.lastName ? errors.lastName.hasError : false}
                  helperText={
                    errors.lastName
                      ? errors.lastName.hasError
                        ? "Cannot be empty"
                        : ""
                      : ""
                  }
                />
              </Grid>
              <Grid xs={1}></Grid>

              <Grid item xs={1} className="onboarding-form2-icon">
                <MailIcon size={24} />
              </Grid>
              <Grid item xs={10}>
                <TextField
                  size="small"
                  variant="outlined"
                  fullWidth
                  inputProps={{
                    style: { fontFamily: "Gilroy", fontSize: "18px" },
                  }}
                  InputLabelProps={{
                    style: {
                      fontFamily: "Gilroy",
                      fontSize: "18px",
                      color: "#C6BDBD",
                    },
                  }}
                  type="email"
                  name="email"
                  label="Email"
                  value={userData.email}
                  onChange={(e) => {
                    setUserData({ ...userData, email: e.target.value });
                    setErrors({
                      ...errors,
                      email: validateFormField(e.target.value, "email"),
                    });
                  }}
                  error={errors.email ? errors.email.hasError : false}
                  helperText={
                    errors.email
                      ? errors.email.hasError
                        ? "Invalid email"
                        : ""
                      : ""
                  }
                />
              </Grid>
              <Grid xs={1}></Grid>

              <Grid item xs={1} className="onboarding-form2-icon">
                <CallOutlined fontSize="medium" />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  size="small"
                  variant="outlined"
                  fullWidth
                  inputProps={{
                    style: { fontFamily: "Gilroy", fontSize: "18px" },
                  }}
                  InputLabelProps={{
                    style: {
                      fontFamily: "Gilroy",
                      fontSize: "18px",
                      color: "#C6BDBD",
                    },
                  }}
                  type="number"
                  name="phone"
                  label="Number"
                  value={userData.phone}
                  onChange={(e) => {
                    setUserData({ ...userData, phone: e.target.value });
                    setErrors({
                      ...errors,
                      phone: validateFormField(e.target.value, "phone"),
                    });
                  }}
                  error={errors.phone ? errors.phone.hasError : false}
                  helperText={
                    errors.phone
                      ? errors.phone.hasError
                        ? "Invalid phone number"
                        : ""
                      : ""
                  }
                />
              </Grid>
              <Grid item xs={1} className="onboarding-form2-icon">
                <OrganizationIcon size={24} />
              </Grid>
              <Grid item xs={5}>
                <TextField
                  size="small"
                  variant="outlined"
                  fullWidth
                  inputProps={{
                    style: { fontFamily: "Gilroy", fontSize: "18px" },
                  }}
                  InputLabelProps={{
                    style: {
                      fontFamily: "Gilroy",
                      fontSize: "18px",
                      color: "#C6BDBD",
                    },
                  }}
                  type="text"
                  name="company"
                  label="Company"
                  value={userData.company}
                  onChange={(e) => {
                    setUserData({ ...userData, company: e.target.value });
                    setErrors({
                      ...errors,
                      company: validateFormField(e.target.value, "name"),
                    });
                  }}
                  error={errors.company ? errors.company.hasError : false}
                  helperText={
                    errors.company
                      ? errors.company.hasError
                        ? "Cannot be empty"
                        : ""
                      : ""
                  }
                />
              </Grid>
              <Grid xs={1}></Grid>
              {role.toLowerCase() === "lender" && (
                <>
                  <Grid item xs={1} className="onboarding-form2-icon">
                    <StopIcon size={24} />
                  </Grid>
                  <Grid item xs={10}>
                    <TextField
                      size="small"
                      variant="outlined"
                      fullWidth
                      inputProps={{
                        style: { fontFamily: "Gilroy", fontSize: "18px" },
                      }}
                      InputLabelProps={{
                        style: {
                          fontFamily: "Gilroy",
                          fontSize: "18px",
                          color: "#C6BDBD",
                        },
                      }}
                      type="number"
                      name="email"
                      label="NMLS"
                      value={userData.nmls}
                      onChange={(e) => {
                        setUserData({ ...userData, nmls: e.target.value });
                        setErrors({
                          ...errors,
                          nmls: validateFormField(e.target.value, "nmls"),
                        });
                      }}
                      error={errors.nmls ? errors.nmls.hasError : false}
                      helperText={
                        errors.nmls
                          ? errors.nmls.hasError
                            ? "Invalid nmls"
                            : ""
                          : ""
                      }
                    />
                  </Grid>
                </>
              )}
            </Grid>
          </div>

          <div className="onboarding-btn-div">
            <ReallosButton
              className="onboarding-btn"
              buttonWidth="40%"
              onClick={() => setStep(step - 1)}
            >
              Back
            </ReallosButton>
            <ReallosButton
              primary
              className="onboarding-btn"
              buttonWidth="60%"
              disabled={formSubmit()}
              onClick={() => {
                onboardUser(role, userData);
                setStep(step + 1);
              }}
            >
              Submit
            </ReallosButton>
          </div>

          <img
            src={Form2Img}
            alt=""
            className="onboarding-left-background-img"
            style={{ margin: "10px" }}
          />
        </>
      );
    }

    if (step === 2) {
      return (
        <>
          <div
            className="onboarding-left-heading1"
            style={{ marginTop: "0px" }}
          >
            Let's Gooooo!
          </div>
          <div
            className="onboarding-final-submit-subheading "
            style={{ marginTop: "5px" }}
          >
            You have successfully onboarded to Reallos. Thank you again for the
            opportunity to work with you and you’ll be notified once we go live.
          </div>

          <iframe
            className="onboarding-video-frame"
            height="343px"
            width="550px"
            src="https://www.youtube.com/embed/CLyeJDct-Ko?autoplay=1"
            title="Reallos video"
            frameborder="1"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
            pl
          ></iframe>

          <img
            src={Form3Img}
            alt=""
            className="onboarding-left-background-img"
          />
        </>
      );
    }
  }

  return (
    <div className="onboarding">
      <div className="onboarding-left-div">
        <div className="onboarding-stepper">
          <Stepper activeStep={step}>
            <Step>
              <StepLabel StepIconComponent={Step1Icon} />
            </Step>
            <Step>
              <StepLabel StepIconComponent={Step2Icon} />
            </Step>
            <Step>
              <StepLabel StepIconComponent={Step3Icon} />
            </Step>
          </Stepper>
        </div>

        {renderForm()}
      </div>

      <div className="onboarding-right-div">
        <div className="onboarding-right-heading">Welcome</div>
        <div className="onboarding-right-subheading">
          Let's Make Real Estate, Real Easy Together
        </div>
      </div>
    </div>
  );
}

export default Onboarding;
