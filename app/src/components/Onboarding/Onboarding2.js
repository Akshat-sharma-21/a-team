import React from "react";
import { Container, Grid, IconButton, MobileStepper } from "@material-ui/core";
import { ArrowRightIcon } from "@primer/octicons-react";
import Logo2 from "../../assets/Onboarding_logo_2.png";
import "./Onboarding.css";

function Onboarding2(props) {
  return (
    <Container className="onboarding-white">
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid item xs={12} className="onboard-empty-div"></Grid>
        <Grid item xs={12} className="onboard-empty-div"></Grid>
        <Grid item xs={12} className="onboard-empty-div"></Grid>

        <Grid item xs={8} style={{ textAlign: "center", paddingLeft: "35px" }}>
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

      <MobileStepper
        variant="dots"
        steps={4}
        position="static"
        activeStep={props.pageNo}
        className={"stepper"}
      />

      <IconButton className="onboarding-next-btn-blue" onClick={props.nextPage}>
        <ArrowRightIcon size={24} className="onboarding-next-icon" />
      </IconButton>
    </Container>
  );
}

export default Onboarding2;
