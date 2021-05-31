import React, { useState } from "react";
import { Grid, IconButton } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { ArrowRightIcon } from "@primer/octicons-react";
import RedHeart from "../../assets/Red_heart.png";
import Logo1 from "../../assets/Onboarding_1.png";
import Logo2 from "../../assets/Onboarding_2.png";
import Logo3 from "../../assets/Onboarding_3.png";
import Logo4 from "../../assets/Onboarding_4.png";
import "./Onboarding.css";
import DotStepper from "../utilities/DotStepper/DotStepper";
import { Scaffold, ReallosButton } from "../utilities/core";

function Screen1({ page, increment }) {
  // Code for screen 1
  return (
    <Scaffold bgVariant="gradient">
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid item xs={7}>
          <div className="onboarding-heading">Congrats, {"Akshat"}</div>
        </Grid>
        <Grid item xs={2}></Grid>
        <Grid item xs={2}>
          <img src={RedHeart} alt="" width="100%" />
        </Grid>
        <Grid item xs={1}></Grid>

        <Grid item xs={12} className="onboard-empty-div"></Grid>

        <Grid item xs={10} style={{ textAlign: "center" }}>
          <img src={Logo1} alt="" width="100%" />
        </Grid>

        <Grid item xs={12} className="onboard-empty-div"></Grid>

        <Grid item xs={12}>
          <div className="onboarding-subheading">
            You're one step closer to your dream house.
          </div>
        </Grid>
      </Grid>

      <div className="stepper">
        <DotStepper variant="white" steps={4} activeStep={page} />
      </div>

      <IconButton
        className="onboarding-next-btn"
        onClick={() => increment(page + 1)}
      >
        <ArrowRightIcon size={24} className="onboarding-next-icon" />
      </IconButton>
    </Scaffold>
  );
}

function Screen2({ page, increment }) {
  // Code for scren 2
  return (
    <Scaffold>
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid item xs={12} className="onboard-empty-div"></Grid>
        <Grid item xs={12} className="onboard-empty-div"></Grid>

        <Grid item xs={10} style={{ textAlign: "center" }}>
          <img src={Logo2} alt="" width="100%" />
        </Grid>

        <Grid item xs={12} className="onboard-empty-div"></Grid>

        <Grid item xs={12}>
          <div className="onboarding-subheading-dark">Roadmap</div>
        </Grid>

        <Grid item xs={12} className="onboard-empty-div"></Grid>

        <Grid item xs={12}>
          <div className="onboarding-text-dark">
            We will guide you throughout the process and will do all the
            hardwork!
          </div>
        </Grid>
      </Grid>

      <div className="stepper">
        <DotStepper variant="primary" steps={4} activeStep={page} />
      </div>

      <IconButton
        className="onboarding-next-btn-blue"
        onClick={() => increment(page + 1)}
      >
        <ArrowRightIcon size={24} className="onboarding-next-icon" />
      </IconButton>
    </Scaffold>
  );
}

function Screen3({ page, increment }) {
  // Code for screen 3
  return (
    <Scaffold bgVariant="gradient">
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid item xs={12} className="onboard-empty-div"></Grid>
        <Grid item xs={12} className="onboard-empty-div"></Grid>

        <Grid item xs={10} style={{ textAlign: "center" }}>
          <img src={Logo3} alt="" width="100%" />
        </Grid>

        <Grid item xs={12} className="onboard-empty-div"></Grid>

        <Grid item xs={12}>
          <div className="onboarding-subheading">Connect</div>
        </Grid>

        <Grid item xs={12} className="onboard-empty-div"></Grid>

        <Grid item xs={12}>
          <div className="onboarding-text">
            We will connect you to all the professionals you need
          </div>
        </Grid>
      </Grid>

      <div className="stepper">
        <DotStepper variant="white" steps={4} activeStep={page} />
      </div>

      <IconButton
        className="onboarding-next-btn"
        onClick={() => increment(page + 1)}
      >
        <ArrowRightIcon size={24} className="onboarding-next-icon" />
      </IconButton>
    </Scaffold>
  );
}

function Screen4({ page, history }) {
  // Code fpor screen 4
  return (
    <Scaffold>
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid item xs={12} className="onboard-empty-div"></Grid>
        <Grid item xs={12} className="onboard-empty-div"></Grid>

        <Grid item xs={10} style={{ textAlign: "center" }}>
          <img src={Logo4} alt="" width="100%" />
        </Grid>

        <Grid item xs={12} className="onboard-empty-div"></Grid>

        <Grid item xs={12}>
          <div className="onboarding-subheading-dark">Secure</div>
        </Grid>

        <Grid item xs={12} className="onboard-empty-div"></Grid>

        <Grid item xs={12}>
          <div className="onboarding-text-dark">
            Upload & Share all your documents hassle free and we'll keep it
            safe!
          </div>
        </Grid>
      </Grid>

      <div className="stepper">
        <DotStepper variant="primary" steps={4} activeStep={page} />
      </div>

      <ReallosButton
        primary
        variant="primary"
        className="onboarding-lets-go-btn"
        onClick={() => history.push("/dashboard")}
      >
        Let's Go!
      </ReallosButton>
    </Scaffold>
  );
}

function Onboarding() {
  const [page, incrementPage] = useState(0);
  const history = useHistory();
  switch (page) {
    case 0:
      return <Screen1 page={page} increment={incrementPage} />;
    case 1:
      return <Screen2 page={page} increment={incrementPage} />;
    case 2:
      return <Screen3 page={page} increment={incrementPage} />;
    case 3:
      return (
        <Screen4 page={page} increment={incrementPage} history={history} />
      );
    default:
  }
}

export default Onboarding;
