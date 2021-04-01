import React, { useEffect } from "react";
import "./Roadmap.css";
import { useHistory } from "react-router-dom";
import {
  Button,
  Grid,
  IconButton,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  CircularProgress,
  Avatar,
} from "@material-ui/core";
import ProfilePic from "../../assets/Roadmap_img.png";
import Scaffold from "../utilities/Scaffold/Scaffold";
import { ArrowRightIcon, LockIcon } from "@primer/octicons-react";
import { fetchUser } from "../../actions/userActions";
import {} from "../../actions/roadmapActions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

const mapStateToProps = (state) => ({
  utils: state.utils,
  roadmap: state.roadmap,
  user: state.user,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ fetchUser }, dispatch);
};

function Roadmap(props) {
  const history = useHistory();

  useEffect(() => {
    props.fetchUser(); // fetching the user
  }, []);

  function stepIcon(props) {
    const { active, completed } = props;
    return (
      <div className="step-icon-div">
        {completed || active ? (
          <IconButton className="step-completed-icon" disabled>
            <LockIcon size={20} className="step-completed-icon" />
          </IconButton>
        ) : (
          <IconButton className="step-icon">
            <LockIcon size={20} className="step-icon" />
          </IconButton>
        )}
      </div>
    );
  }

  const PrimaryContent = () => {
    if (props.utils.loading === true) {
      return (
        <div className="roadmap-single-view-container">
          <CircularProgress />

          <div
            style={{
              marginTop: 50,
              fontSize: 20,
            }}
          >
            Setting up Dashboard...
          </div>
        </div>
      );
    } else {
      console.log(props.roadmap);
      return (
        <>
          <Grid item xs={12} style={{ height: "15px" }}></Grid>
          <Grid item xs={12}>
            <Stepper orientation="vertical">
              <Step active={!props.roadmap.PreApproval.Locked}>
                <StepLabel StepIconComponent={stepIcon}>
                  <div className="roadmap-subheading">Pre-approval</div>
                </StepLabel>
                <StepContent className="step-desc">
                  <div className="roadmap-desc">
                    It helps you find out how much you can afford and is the
                    first.
                  </div>
                  <div>
                    <Button className="roadmap-date" disabled>
                      30 Sep 2020
                    </Button>
                    <IconButton
                      className="roadmap-next-btn"
                      size="small"
                      onClick={() => history.push("/questions/pre-approval")}
                    >
                      <ArrowRightIcon size={24} style={{ color: "#ffffff" }} />
                    </IconButton>
                  </div>
                </StepContent>
              </Step>

              <Step active={!props.roadmap.FindAgent.Locked}>
                <StepLabel StepIconComponent={stepIcon}>
                  <div className="roadmap-subheading">Find an Agent</div>
                </StepLabel>
                <StepContent className="step-desc">
                  <div className="roadmap-desc">
                    An ad group contains one or more ads which target a shared
                    set of keywords.
                  </div>
                  <div>
                    <Button className="roadmap-date" disabled>
                      30 Sep 2020
                    </Button>
                    <IconButton
                      className="roadmap-next-btn"
                      size="small"
                      onClick={() => history.push("/questions/find-agent")}
                    >
                      <ArrowRightIcon size={24} style={{ color: "#ffffff" }} />
                    </IconButton>
                  </div>
                </StepContent>
              </Step>

              <Step active={!props.roadmap.FindHome.Locked}>
                <StepLabel StepIconComponent={stepIcon}>
                  <div className="roadmap-subheading">Find a Home</div>
                </StepLabel>
                <StepContent className="step-desc">
                  <div className="roadmap-desc">
                    Try out different ad text to see what brings in the most
                    customers.
                  </div>
                  <div>
                    <Button className="roadmap-date" disabled>
                      30 Sep 2020
                    </Button>
                    <IconButton
                      className="roadmap-next-btn"
                      size="small"
                      onClick
                    >
                      <ArrowRightIcon size={24} style={{ color: "#ffffff" }} />
                    </IconButton>
                  </div>
                </StepContent>
              </Step>

              <Step active={!props.roadmap.EscrowTitle.Locked}>
                <StepLabel StepIconComponent={stepIcon}>
                  <div className="roadmap-subheading">Escrow & Title</div>
                </StepLabel>
                <StepContent className="step-desc">
                  <div className="roadmap-desc">Unknown step</div>
                  <div>
                    <Button className="roadmap-date" disabled>
                      30 Sep 2020
                    </Button>
                    <IconButton
                      className="roadmap-next-btn"
                      size="small"
                      onClick
                    >
                      <ArrowRightIcon size={24} style={{ color: "#ffffff" }} />
                    </IconButton>
                  </div>
                </StepContent>
              </Step>

              <Step active={!props.roadmap.HomeInspection.Locked}>
                <StepLabel StepIconComponent={stepIcon}>
                  <div className="roadmap-subheading">Home Inspection</div>
                </StepLabel>
                <StepContent className="step-desc">
                  <div className="roadmap-desc">Unknown step</div>
                  <div>
                    <Button className="roadmap-date" disabled>
                      30 Sep 2020
                    </Button>
                    <IconButton
                      className="roadmap-next-btn"
                      size="small"
                      onClick
                    >
                      <ArrowRightIcon size={24} style={{ color: "#ffffff" }} />
                    </IconButton>
                  </div>
                </StepContent>
              </Step>

              <Step active={!props.roadmap.HomeInsurance.Locked}>
                <StepLabel StepIconComponent={stepIcon}>
                  <div className="roadmap-subheading">Home Insurance</div>
                </StepLabel>
                <StepContent className="step-desc">
                  <div className="roadmap-desc">Unknown step</div>
                  <div>
                    <Button className="roadmap-date" disabled>
                      30 Sep 2020
                    </Button>
                    <IconButton
                      className="roadmap-next-btn"
                      size="small"
                      onClick
                    >
                      <ArrowRightIcon size={24} style={{ color: "#ffffff" }} />
                    </IconButton>
                  </div>
                </StepContent>
              </Step>

              <Step active={!props.roadmap.Closing.Locked}>
                <StepLabel StepIconComponent={stepIcon}>
                  <div className="roadmap-subheading">Closing</div>
                </StepLabel>
                <StepContent className="step-desc">
                  <div className="roadmap-desc">Unknown step</div>
                  <div>
                    <Button className="roadmap-date" disabled>
                      30 Sep 2020
                    </Button>
                    <IconButton
                      className="roadmap-next-btn"
                      size="small"
                      onClick
                    >
                      <ArrowRightIcon size={24} style={{ color: "#ffffff" }} />
                    </IconButton>
                  </div>
                </StepContent>
              </Step>
            </Stepper>
          </Grid>
        </>
      );
    }
  };
  return (
    <Scaffold bottomNav bottomNavActive="Dashboard">
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid item xs={7}>
          <div className="roadmap-heading">Roadmap</div>
        </Grid>
        <Grid item xs={2}></Grid>
        <Grid item xs={3}>
          <Avatar src={ProfilePic} className="roadmap-avatar" />
          {/* <Fab size="small">
              <PencilIcon size={16} />
            </Fab> */}
        </Grid>
        {PrimaryContent()}
      </Grid>
    </Scaffold>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Roadmap);
