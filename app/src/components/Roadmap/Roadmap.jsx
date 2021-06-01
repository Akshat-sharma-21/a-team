import React, { useEffect, useState } from "react";
import "./Roadmap.css";
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
  Fab,
  Drawer,
} from "@material-ui/core";
import Scaffold from "../utilities/Scaffold/Scaffold";
import {
  ArrowRightIcon,
  LockIcon,
  LocationIcon,
  PencilIcon,
} from "@primer/octicons-react";
import ProfileEdit from "./ProfileEdit";
import { fetchUser } from "../../actions/userActions";
import { setupTasks } from "../../actions/roadmapActions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

const mapStateToProps = (state) => ({
  utils: state.utils,
  roadmap: state.roadmap,
  user: state.user,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ fetchUser, setupTasks }, dispatch);
};

function Roadmap(props) {
  const [isModalOpen, toggleModal] = useState(false);
  useEffect(() => {
    props.fetchUser(); // fetching the user
  }, []);

  function closeModal() {
    toggleModal(false);
  }

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
      return (
        <>
          <Grid item xs={12} style={{ height: "15px" }}></Grid>
          <Grid item xs={12}>
            <Stepper orientation="vertical" className="roadmap-stepper">
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
                      onClick={() => {
                        props.roadmap.PreApproval.Asked
                          ? (window.location.href =
                              "pre-approval/tasks_summary")
                          : (window.location.href = "/questions/pre-approval");
                      }}
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
                      onClick={() => {
                        props.roadmap.FindAgent.Asked
                          ? (window.location.href = "find-agent/tasks_summary")
                          : (window.location.href = "/questions/find-agent");
                      }}
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
                      onClick={() =>
                        props.setupTasks(props.user.Transaction, "FindHome")
                      }
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
                      onClick={() =>
                        props.setupTasks(props.user.Transaction, "EscrowTitle")
                      }
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
                      onClick={() =>
                        props.setupTasks(
                          props.user.Transaction,
                          "HomeInspection"
                        )
                      }
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
                      onClick={() =>
                        props.setupTasks(
                          props.user.Transaction,
                          "HomeInsurance"
                        )
                      }
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
                      onClick={() =>
                        props.setupTasks(props.user.Transaction, "Closing")
                      }
                    >
                      <ArrowRightIcon size={24} style={{ color: "#ffffff" }} />
                    </IconButton>
                  </div>
                </StepContent>
              </Step>

              <Step active={false}>
                <StepLabel
                  StepIconComponent={() => {
                    return (
                      <IconButton className="step-icon" disabled>
                        <LocationIcon size={20} className="step-icon" />
                      </IconButton>
                    );
                  }}
                >
                  <div className="roadmap-subheading">Dream Home</div>
                </StepLabel>
              </Step>
            </Stepper>
          </Grid>
        </>
      );
    }
  };
  return (
    <Scaffold bottomNav bottomNavActive="Dashboard">
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        className="page-header"
      >
        <Grid item xs={8} style={{ marginTop: "10px" }}>
          <div className="roadmap-heading">Roadmap</div>
        </Grid>
        <Grid item xs={4} style={{ marginTop: "10px" }}>
          {props.user.PhotoUrl === null ? ( // To display the photo of the user
            <Avatar className="roadmap-avatar">{props.user.Name[0]}</Avatar>
          ) : (
            <Avatar className="roadmap-avatar" src={props.user.PhotoUrl} />
          )}
          <Fab
            className="roadmap-fab-btn"
            onClick={() => {
              toggleModal(true);
            }}
          >
            {window.innerHeight < 700 ? (
              <PencilIcon size={13} />
            ) : (
              <PencilIcon size={16} />
            )}
          </Fab>
        </Grid>
      </Grid>
      <Grid container direction="row" justify="center" alignItems="center">
        {PrimaryContent()}
      </Grid>
      <Drawer
        anchor="bottom"
        open={isModalOpen}
        onClose={() => {
          closeModal();
        }}
      >
        <ProfileEdit user={props.user} closeDrawer={closeModal} />
      </Drawer>
    </Scaffold>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Roadmap);
