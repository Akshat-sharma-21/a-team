import React from "react";
import { Container, Grid, Button, MobileStepper } from "@material-ui/core";
import Logo4 from "../../assets/Onboarding_logo_4.png";
import "./Onboarding.css";

function Onboarding4(props) {
  return (
    <Container className="onboarding-white">
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

      <MobileStepper
        variant="dots"
        steps={4}
        position="static"
        activeStep={props.pageNo}
        className={"stepper"}
      />

      <Button className="onboarding-lets-go-btn">Let's Go!</Button>
    </Container>
  );
}

export default Onboarding4;
