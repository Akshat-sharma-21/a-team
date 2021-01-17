import React from "react";
import { Container, Grid, IconButton, MobileStepper } from "@material-ui/core";
import { ArrowRightIcon } from "@primer/octicons-react";
import RedHeart from "../../assets/Red_heart.png";
import Logo1 from "../../assets/Onboarding_logo_1.png";
import "./Onboarding.css";

function Onboarding1(props) {
  return (
    <Container className="onboarding">
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid item xs={7}>
          <div className="onboarding-heading">Congrats, Akshat</div>
        </Grid>
        <Grid item xs={2}></Grid>
        <Grid item xs={2}>
          <img src={RedHeart} alt="" width="100%" />
        </Grid>
        <Grid item xs={1}></Grid>

        <Grid item xs={12} className="onboard-empty-div"></Grid>
        <Grid item xs={12} className="onboard-empty-div"></Grid>

        <Grid item xs={8} style={{ textAlign: "center" }}>
          <img src={Logo1} alt="" width="100%" />
        </Grid>

        <Grid item xs={12} className="onboard-empty-div"></Grid>

        <Grid item xs={12}>
          <div className="onboarding-subheading">
            You're one step closer to your dream house.
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

export default Onboarding1;
