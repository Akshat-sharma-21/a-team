import React from "react";
import { Container, Grid, IconButton, MobileStepper } from "@material-ui/core";
import { ArrowRightIcon } from "@primer/octicons-react";
import Logo3 from "../../assets/Onboarding_logo_3.png";
import "./Onboarding.css";

function Onboarding3(props) {
  return (
    <Container className="onboarding">
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

      <MobileStepper
        variant="dots"
        steps={4}
        position="static"
        activeStep={props.pageNo}
        className={"stepper"}
      />

      <IconButton className="onboarding-next-btn" onClick={props.nextPage}>
        <ArrowRightIcon size={24} className="onboarding-next-icon" />
      </IconButton>
    </Container>
  );
}

export default Onboarding3;
