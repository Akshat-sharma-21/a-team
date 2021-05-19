import { withStyles } from "@material-ui/core/styles";
import DocLogo from "../../assets/doc_logo.svg";
import ProfilePic from "../../assets/postmalone.jpg";
import { ModalSheet, Scaffold } from "../utilities/core";
import "./TaskSummary.css";
import {
  CheckCircleIcon,
  QuestionIcon,
  ListUnorderedIcon,
  ArrowLeftIcon,
  MailIcon,
  DeviceMobileIcon,
  ChevronRightIcon,
} from "@primer/octicons-react";
import {
  LinearProgress,
  List,
  ListItem,
  IconButton,
  Grid,
  Avatar,
  Button,
  CircularProgress,
} from "@material-ui/core";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { useState, useEffect } from "react";
import { fetchUser } from "../../actions/userActions";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";

const mapStateToProps = (state) => ({
  roadmap: state.roadmap,
  utils: state.utils,
  user: state.user,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      fetchUser,
    },
    dispatch
  );
};

const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 5,
    borderRadius: 5,
  },
  colorPrimary: {
    backgroundColor:
      theme.palette.grey[theme.palette.type === "light" ? 300 : 400],
  },
  bar: {
    borderRadius: 5,
    backgroundColor: "#2B44FF",
  },
}))(LinearProgress);

function TaskSummary(props) {
  const history = useHistory();

  const [isModalOpen, toggleModal] = useState(false);
  const [showMoreTasks, toggleTasks] = useState(false);
  const [showMoreDocuments, toggleDocuments] = useState(false);
  const [type, changeType] = useState("");
  const [title, changeTitle] = useState("");
  const [description, changeDescription] = useState("");

  let { step } = useParams(); // Getting the step of the transaction
  let activeStep = null; // To store the active step
  let activeStepName = "";

  //TODO: Create a literal for all these steps and store it in the general file
  if (step === "pre-approval") activeStepName = "Pre-approval"; // Setting the display name for the screen
  if (step === "find-agent") activeStepName = "Find-Agent";
  if (step === "find-home") activeStepName = "Find-Home";
  if (step === "home-inspection") activeStepName = "Home-Inspection";
  if (step === "escrow-title") activeStepName = "Escrow-Title";
  if (step === "home-insurance") activeStepName = "Home-Insurance";
  if (step === "closing") activeStepName = "Closing";

  if (props.utils.reload === false) {
    // Storing the Appropriate Step
    if (step === "pre-approval") {
      activeStep = props.roadmap.PreApproval;
    }
    if (step === "find-agent") {
      activeStep = props.roadmap.FindAgent;
    }
    if (step === "find-home") {
      activeStep = props.roadmap.FindHome;
    }
    if (step === "home-inspection") {
      activeStep = props.roadmap.HomeInspection;
    }
    if (step === "escrow-title") {
      activeStep = props.roadmap.EscrowTitle;
    }
    if (step === "home-insurance") {
      activeStep = props.roadmap.HomeInsurance;
    }
    if (step === "closing") {
      activeStep = props.roadmap.Closing;
    }
  }

  useEffect(() => {
    if (props.utils.reload === true) {
      // if the page has been refresehed
      props.fetchUser();
    }
  }, []);

  function modalOpen(title, description, type) {
    toggleModal(true);
    changeTitle(title);
    changeDescription(description);
    changeType(type);
  }

  function modalClose() {
    toggleModal(false);
    changeTitle("");
    changeDescription("");
    changeType("");
  }

  function displayModal() {
    // Function to open the modal sheet
    if (type === "task") {
      return (
        <ModalSheet isOpen={isModalOpen} onClose={() => modalClose()}>
          <Grid container direction="row" justify="center" alignItems="center">
            {/* Change the Image for this */}
            <Grid item xs={2} style={{ textAlign: "center" }}>
              <Avatar
                variant="rounded"
                style={{ backgroundColor: "#00000000" }}
              >
                <img src={DocLogo} alt="" />
              </Avatar>
            </Grid>
            <Grid item xs={10} style={{ textAlign: "left" }}>
              <div className="taskSummary-modal-heading">{title}</div>
            </Grid>
            <Grid item xs={12} style={{ height: "25px" }}></Grid>
            <Grid item xs={12} style={{ textAlign: "left" }}>
              <div className="taskSummary-modal-text">{description}</div>
            </Grid>
            <Grid item xs={12} style={{ height: "20px" }}></Grid>
            <Grid item xs={12}>
              <Button
                className="taskSummary-modal-btn"
                onClick={() => (window.location.href = "/tasks")}
              >
                View in Tasks <ChevronRightIcon size={16} />
              </Button>
            </Grid>
            <Grid item xs={12} style={{ height: "5px" }}></Grid>
          </Grid>
        </ModalSheet>
      );
    } else {
      return (
        <ModalSheet isOpen={isModalOpen} onClose={() => modalClose()}>
          <Grid container direction="row" justify="center" alignItems="center">
            <Grid item xs={2} style={{ textAlign: "center" }}>
              <Avatar
                variant="rounded"
                style={{ backgroundColor: "#00000000" }}
              >
                <img src={DocLogo} alt="" />
              </Avatar>
            </Grid>
            <Grid item xs={10} style={{ textAlign: "left" }}>
              <div className="taskSummary-modal-heading">{title}</div>
            </Grid>
            <Grid item xs={12} style={{ height: "25px" }}></Grid>
            <Grid item xs={12} style={{ textAlign: "left" }}>
              <div className="taskSummary-modal-text">{description}</div>
            </Grid>
            <Grid item xs={12} style={{ height: "20px" }}></Grid>
            <Grid item xs={12}>
              <Button
                className="taskSummary-modal-btn"
                onClick={() => (window.location.href = "/documents")}
              >
                View in Documents <ChevronRightIcon size={16} />
              </Button>
            </Grid>
            <Grid item xs={12} style={{ height: "5px" }}></Grid>
          </Grid>
        </ModalSheet>
      );
    }
  }

  function displayProfessional() {
    let profession = "";
    let linkToProfession = "";
    // Function to display the Professional
    if (activeStep.Professional === null) {
      // If the professional is not present
      if (activeStepName === "Pre-approval") {
        // To select what profession to display
        profession = "Lender";
        linkToProfession = "/lenders";
      } else if (activeStepName === "Home-Insurance") {
        profession = "Insurance Provider";
        linkToProfession = "/insurance";
      }
      return (
        <>
          <Grid item xs={12} style={{ textAlign: "left", marginTop: "5px" }}>
            <div className="taskSummary-subheading">{profession}</div>
          </Grid>
          <Grid item xs={12} style={{ textAlign: "center" }}>
            <List className="taskSummary-list">
              <ListItem className="taskSummary-lender-list">
                <Grid
                  container
                  direction="row"
                  justify="center"
                  alignItems="center"
                >
                  <Grid item xs={1} style={{ textAlign: "center" }}>
                    <Avatar
                      variant="circle"
                      style={{
                        backgroundColor: "#2B44FF",
                        marginBottom: "10px",
                      }}
                    />
                  </Grid>
                  <Grid item xs={1}></Grid>
                  <Grid item xs={9} container style={{ paddingLeft: "15px" }}>
                    <Grid item xs={12} style={{ textAlign: "left" }}>
                      <div className="lender-list-title">{profession}</div>
                    </Grid>
                    <Grid item xs={12} style={{ textAlign: "left" }}>
                      <div className="doc-list-subtext2">
                        You haven't yet selected a {profession}. Please select
                        one to move forward
                      </div>
                    </Grid>
                  </Grid>
                  <Grid item xs={1}></Grid>

                  <Grid item xs={12} style={{ height: "20px" }}></Grid>

                  <Grid item xs={5}></Grid>
                  <Grid item xs={7}>
                    <Button
                      className="lender-btn"
                      onClick={() => history.push(linkToProfession)}
                    >
                      View all Offers <ChevronRightIcon size={16} />
                    </Button>
                  </Grid>
                </Grid>
              </ListItem>
            </List>
          </Grid>
        </>
      );
    } else {
      //TODO: Dynamically fetch the data for that professional
      return (
        <>
          <Grid item xs={12} style={{ textAlign: "center" }}>
            <List className="taskSummary-list">
              <ListItem className="taskSummary-lender-list">
                <Grid
                  container
                  direction="row"
                  justify="center"
                  alignItems="center"
                >
                  <Grid item xs={1} style={{ textAlign: "center" }}>
                    <Avatar variant="circle" src={ProfilePic} />
                  </Grid>
                  <Grid item xs={1}></Grid>
                  <Grid item xs={9} container style={{ paddingLeft: "15px" }}>
                    <Grid item xs={12} style={{ textAlign: "left" }}>
                      <div className="lender-list-title">John Smith</div>
                    </Grid>
                    <Grid item xs={12} style={{ textAlign: "left" }}>
                      <div className="doc-list-subtext">Bank of America</div>
                    </Grid>
                  </Grid>
                  <Grid item xs={1}></Grid>

                  <Grid item xs={12} style={{ height: "20px" }}></Grid>

                  <Grid item xs={2}></Grid>
                  <Grid item xs={1}></Grid>
                  <Grid item xs={9} container>
                    <Grid item xs={12} style={{ textAlign: "left" }}>
                      <div className="doc-list-subtext">
                        <MailIcon size={16} /> &nbsp;&nbsp; john.smith@gmail.com
                      </div>
                    </Grid>
                    <Grid item xs={12} style={{ textAlign: "left" }}>
                      <div className="doc-list-subtext">
                        <DeviceMobileIcon size={16} />
                        &nbsp;&nbsp; +1 99999 99999
                      </div>
                    </Grid>
                  </Grid>
                </Grid>
              </ListItem>
            </List>
          </Grid>
        </>
      );
    }
  }

  function displayDocuments() {
    if (activeStep.Documents.length === 0) {
      // If there are no documents to render
      return <></>;
    } else {
      return (
        <>
          <Grid item xs={12} style={{ textAlign: "left", marginTop: "5px" }}>
            <div className="taskSummary-subheading">Documents</div>
          </Grid>

          <Grid item xs={12} style={{ textAlign: "center" }}>
            <List className="taskSummary-list">
              {activeStep.Documents.slice(
                0,
                showMoreDocuments ? activeStep.Documents.length : 3
              ).map((doc) => (
                <ListItem className="taskSummary-list-item">
                  <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                  >
                    <Grid item xs={1} style={{ textAlign: "center" }}>
                      <Avatar
                        variant="rounded"
                        style={{ backgroundColor: "#00000000" }}
                      >
                        <img src={DocLogo} alt="" />
                      </Avatar>
                    </Grid>
                    <Grid item xs={1}></Grid>
                    <Grid item xs={9} container style={{ paddingLeft: "15px" }}>
                      <Grid item xs={12} style={{ textAlign: "left" }}>
                        <div>{doc.title}</div>
                      </Grid>
                      <Grid item xs={12} style={{ textAlign: "left" }}>
                        <div className="doc-list-subtext">
                          {doc.description}
                        </div>
                      </Grid>
                    </Grid>
                    <Grid item xs={1}>
                      <IconButton
                        onClick={() =>
                          modalOpen(doc.title, doc.description, "document")
                        }
                      >
                        <QuestionIcon size={18} style={{ color: "#707070" }} />
                      </IconButton>
                    </Grid>
                  </Grid>
                </ListItem>
              ))}
            </List>
            {activeStep.Documents.length > 2 ? (
              showMoreDocuments ? (
                <Button
                  onClick={() => toggleDocuments(false)}
                  className="taskSummary-showMore"
                >
                  Show Less
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    toggleDocuments(true);
                  }}
                  className="taskSummary-showMore"
                >
                  Show More
                </Button>
              )
            ) : (
              <></>
            )}
          </Grid>
        </>
      );
    }
  }

  function displayTasks() {
    // Function to display the Tasks
    if (activeStep.Tasks.length === 0) {
      // If there are are no Tasks to render
      return <></>;
    } else {
      return (
        <>
          <Grid item xs={12} style={{ textAlign: "left", marginTop: "5px" }}>
            <div className="taskSummary-subheading">Tasks</div>
          </Grid>
          <Grid item xs={12} style={{ textAlign: "center" }}>
            <List className="taskSummary-list">
              {activeStep.Tasks.slice(
                0,
                showMoreTasks ? activeStep.Tasks.length : 3
              ).map((task) => (
                <ListItem className="taskSummary-list-item">
                  <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                  >
                    <Grid item xs={2} style={{ textAlign: "center" }}>
                      <ListUnorderedIcon size={32} />
                    </Grid>
                    <Grid item xs={1}></Grid>
                    <Grid item xs={8} container>
                      <Grid item xs={12} style={{ textAlign: "left" }}>
                        <div className="doc-list-title-use">{task.title}</div>
                      </Grid>
                      <Grid item xs={12} style={{ textAlign: "left" }}>
                        <div className="doc-list-subtext">
                          {task.description}
                        </div>
                      </Grid>
                    </Grid>
                    <Grid item xs={1}>
                      <IconButton
                        onClick={() =>
                          modalOpen(task.title, task.description, "task")
                        }
                      >
                        <QuestionIcon size={18} style={{ color: "#707070" }} />
                      </IconButton>
                    </Grid>
                    <Grid item xs={1}></Grid>
                  </Grid>
                </ListItem>
              ))}
            </List>
            {activeStep.Tasks.length > 2 ? (
              showMoreTasks ? (
                <Button
                  onClick={() => toggleTasks(false)}
                  className="taskSummary-showMore"
                >
                  Show Less
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    toggleTasks(true);
                  }}
                  className="taskSummary-showMore"
                >
                  Show More
                </Button>
              )
            ) : (
              <></>
            )}
          </Grid>
        </>
      );
    }
  }

  if (props.utils.loading === true || props.utils.reload === true) {
    // If the page is loading or if the page is not fetched yet
    return (
      <Scaffold>
        <Grid container direction="row" justify="center" alignItems="center">
          <Grid item xs={12} style={{ textAlign: "left" }}>
            <IconButton
              size="small"
              style={{ margin: "20px 0" }}
              onClick={() => (window.location.href = "/dashboard")}
            >
              <ArrowLeftIcon size={32} className="taskSummary-back-icon" />
            </IconButton>
          </Grid>

          <Grid item xs={12} style={{ textAlign: "left" }}>
            <div className="taskSummary-heading">{activeStepName}</div>
          </Grid>

          <Grid className="">
            <div className="taskSummary-singleView-container">
              <CircularProgress />

              <div
                style={{
                  marginTop: 50,
                  fontSize: 20,
                }}
              >
                Setting up {activeStepName}
              </div>
            </div>
          </Grid>
        </Grid>
      </Scaffold>
    );
  } else {
    return (
      <Scaffold>
        <Grid container direction="row" justify="center" alignItems="center">
          <Grid item xs={12} style={{ textAlign: "left" }}>
            <IconButton
              size="small"
              style={{ margin: "20px 0" }}
              onClick={() => (window.location.href = "/dashboard")}
            >
              <ArrowLeftIcon size={32} className="taskSummary-back-icon" />
            </IconButton>
          </Grid>

          <Grid item xs={12} style={{ textAlign: "left" }}>
            <div className="taskSummary-heading">{activeStepName}</div>
          </Grid>

          <Grid item xs={12} style={{ marginBottom: "15px" }}>
            <BorderLinearProgress
              variant="determinate"
              value={
                (activeStep.Tasks.filter((task) => task.completed).length /
                  activeStep.Tasks.length) *
                100
              } // Calculating the % of completed Tasks
            />
          </Grid>

          <Grid item xs={1}>
            <CheckCircleIcon style={{ color: "#707070" }} />
          </Grid>

          <Grid item xs={11} style={{ textAlign: "left" }}>
            <div className="taskSummary-subtext">
              {activeStep.Tasks.filter((task) => task.completed).length} /{" "}
              {activeStep.Tasks.length} Tasks Completed
            </div>
          </Grid>

          <Grid item xs={12} style={{ height: "35px" }}></Grid>
          {displayProfessional()}
          {displayDocuments()}
          {displayTasks()}
        </Grid>
        {displayModal()}
      </Scaffold>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskSummary);
