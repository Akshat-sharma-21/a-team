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

const displayDate = (date) => {
  // To display the date in the required format
  let newDate = new Date(date.seconds * 1000);
  let month = null;
  switch (newDate.getMonth()) {
    case 0:
      month = "Jan";
      break;
    case 1:
      month = "Feb";
      break;
    case 2:
      month = "March";
      break;
    case 3:
      month = "April";
      break;
    case 4:
      month = "May";
      break;
    case 5:
      month = "June";
      break;
    case 6:
      month = "July";
      break;
    case 7:
      month = "Aug";
      break;
    case 8:
      month = "Sept";
      break;
    case 9:
      month = "Oct";
      break;
    case 10:
      month = "Nov";
      break;
    case 11:
      month = "Dec";
      break;
    default:
      month = "";
      break;
  }
  return `${newDate.getDate()} ${month}`;
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
    console.log(props.roadmap);
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
                    Pre-Approval will allow you as the buyer to understand how
                    much you can afford
                  </div>
                  <div>
                    <Button className="roadmap-date" disabled>
                      {props.roadmap.PreApproval.Date !== null
                        ? displayDate(props.roadmap.PreApproval.Date) // Displaying the Date
                        : "???"}
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
                    Answer a few questions and we can connect you with a local
                    agent in your desired area
                  </div>
                  <div>
                    <Button className="roadmap-date" disabled>
                      {props.roadmap.FindAgent.Date !== null
                        ? displayDate(props.roadmap.FindAgent.Date) // Displaying the Date
                        : "???"}
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
                    Work with your agent to find the best home that fits your
                    needs and wants
                  </div>
                  <div>
                    <Button className="roadmap-date" disabled>
                      {props.roadmap.FindHome.Date !== null
                        ? displayDate(props.roadmap.FindHome.Date) // Displaying the Date
                        : "???"}
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
                  <div className="roadmap-desc">
                    This is where you deposit your earnest money and the title
                    company will do its title search
                  </div>
                  <div>
                    <Button className="roadmap-date" disabled>
                      {props.roadmap.EscrowTitle.Date !== null
                        ? displayDate(props.roadmap.EscrowTitle.Date) // Displaying the Date
                        : "???"}
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
                  <div className="roadmap-desc">
                    A Reallos Vetted home inspector will be sent out to the home
                    to do an inspection of the property
                  </div>
                  <div>
                    <Button className="roadmap-date" disabled>
                      {props.roadmap.HomeInspection.Date !== null
                        ? displayDate(props.roadmap.HomeInspection.Date) // Displaying the Date
                        : "???"}
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
                  <div className="roadmap-desc">
                    Get home insurance quotes instantly from home insurance
                    providers across your area
                  </div>
                  <div>
                    <Button className="roadmap-date" disabled>
                      {props.roadmap.HomeInsurance.Date !== null
                        ? displayDate(props.roadmap.HomeInsurance.Date) // Displaying the Date
                        : "???"}
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
                  <div className="roadmap-desc">
                    This is where you sign all your papework and do your final
                    walkthrough of the home
                  </div>
                  <div>
                    <Button className="roadmap-date" disabled>
                      {props.roadmap.Closing.Date !== null
                        ? displayDate(props.roadmap.Closing.Date) // Displaying the Date
                        : "???"}
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
                <StepContent className="step-desc">
                  <div className="roadmap-desc">
                    Congratulations on your new home! Reallos and everyone
                    involved wishes you all the very best
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
