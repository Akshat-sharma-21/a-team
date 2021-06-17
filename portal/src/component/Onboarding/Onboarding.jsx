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
} from "@primer/octicons-react";
import { Grid, TextField } from "@material-ui/core";
import Form1Img from "../../assets/Onboarding-form1-img.svg";
import Form2Img from "../../assets/Onboarding-form2-img.svg";
import Form3Img from "../../assets/Onboarding-form3-img.svg";
import { ReallosButton } from "../utilities/core";
import "./Onboarding.css";
import { CallOutlined } from "@material-ui/icons";

function Onboarding() {
  const [role, setRole] = useState("");
  const [step, setStep] = useState(0);
  const [showInputLabel, setShowInputLabel] = useState(false);

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
                value={"Home Inspector"}
                className="onboarding-list-item"
              >
                Home Inspector
              </MenuItem>
              <MenuItem value={"Lender"} className="onboarding-list-item">
                Lender
              </MenuItem>
              <MenuItem value={"Escrow Agent"} className="onboarding-list-item">
                Escrow Agent
              </MenuItem>
            </Select>
          </FormControl>

          <div className="onboarding-btn-div">
            <ReallosButton
              primary
              fullWidth
              className="onboarding-btn"
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
          <div className="onboarding-left-heading2">Real Estate Agent</div>
          <div className="onboarding-left-subheading2">
            Thank you for giving Reallos the opportunity to work with you.
            Easily track buyer's live progress, share documents, and E-sign them
            on our Platform. We will update you as soon as our platform is live
          </div>

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
                  type="text"
                  name="phone"
                  label="Number"
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
                />
              </Grid>
              <Grid xs={1}></Grid>
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
              onClick={() => setStep(step + 1)}
            >
              Next
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
            className="onboarding-left-subheading1"
            style={{ marginTop: "5px" }}
          >
            You've successfully been onboarded on the Reallos Ecosystem. We will
            get in touch with you very soon to inform you about what happens
            next.
          </div>

          <iframe
            className="onboarding-video-frame"
            height="260px"
            width="550px"
            src="https://www.youtube.com/embed/CLyeJDct-Ko"
            title="Reallos video"
            frameborder="1"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>

          <div className="onboarding-btn-div">
            <ReallosButton
              buttonWidth="40%"
              className="onboarding-btn"
              onClick={() => setStep(step - 1)}
            >
              Back
            </ReallosButton>
            <ReallosButton primary className="onboarding-btn" buttonWidth="60%">
              Submit
            </ReallosButton>
          </div>

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
          Let's Make Real Estate Real Easy Together
        </div>
      </div>
    </div>
  );
}

export default Onboarding;
