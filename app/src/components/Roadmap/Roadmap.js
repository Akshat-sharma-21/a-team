import React from "react";
import "./Roadmap.css";
import {
  Button,
  Container,
  Fab,
  Grid,
  IconButton,
  Step,
  StepConnector,
  StepContent,
  StepLabel,
  Stepper,
} from "@material-ui/core";
import ProfilePic from "../../assets/Roadmap_img.png";
import { ArrowRightIcon, LockIcon, PencilIcon } from "@primer/octicons-react";

function Roadmap() {
  function getSteps() {
    return [
      "Pre-approval",
      "Find an Agent",
      "Make an offer",
      "Finalize your Deal",
      "Home Inspection",
    ];
  }

  function getStepContent(step) {
    switch (step) {
      case 0:
        return `It helps you find out how much you can afford and is the first.`;
      case 1:
        return "An ad group contains one or more ads which target a shared set of keywords.";
      case 2:
        return `Try out different ad text to see what brings in the most customers.`;
      default:
        return "Unknown step";
    }
  }

  function stepIcon(props) {
    const { active, completed } = props;
    return (
      <div className="step-icon-div">
        {completed || active ? (
          <IconButton className="step-completed-icon" disabled>
            <LockIcon size={16} className="step-completed-icon" />
          </IconButton>
        ) : (
          <IconButton className="step-icon">
            <LockIcon size={16} className="step-icon" />
          </IconButton>
        )}
      </div>
    );
  }

  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  return (
    <Container className="roadmap">
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid item xs={7}>
          <div className="roadmap-heading">Roadmap</div>
        </Grid>
        <Grid item xs={2}></Grid>
        <Grid item xs={3}>
          <img src={ProfilePic} alt="" width="100%" />
          {/* <Fab size="small">
              <PencilIcon size={16} />
            </Fab> */}
        </Grid>

        <Grid item xs={12}>
          <Stepper
            activeStep={activeStep}
            orientation="vertical"
            connector={<StepConnector />}
          >
            {steps.map((label, index) => (
              <Step key={label}>
                <StepLabel StepIconComponent={stepIcon}>
                  <div className="roadmap-subheading">{label}</div>
                </StepLabel>
                <StepContent>
                  <div className="roadmap-desc">{getStepContent(index)}</div>
                  <div>
                    <Button className="roadmap-date" disabled>
                      30 Sep 2020
                    </Button>
                    <IconButton
                      className="roadmap-next-btn"
                      size="small"
                      onClick={handleNext}
                    >
                      <ArrowRightIcon size={24} style={{ color: "#ffffff" }} />
                    </IconButton>
                  </div>
                </StepContent>
              </Step>
            ))}
          </Stepper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Roadmap;
