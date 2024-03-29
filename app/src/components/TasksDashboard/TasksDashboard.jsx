import React, { useState, useEffect } from "react";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { SearchIcon } from "@primer/octicons-react";
import NoTasks from "../../assets/No-Tasks.png";
import { ReallosButton, Scaffold, SearchBar } from "../utilities/core";
import { completeTasks } from "../../actions/tasksActions";
import { steps, USER } from "../../utils";
import "./TasksDashboard.css";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  Grid,
  List,
  Typography,
  CircularProgress,
} from "@material-ui/core";
import { fetchUser } from "../../actions/userActions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { useHistory } from "react-router-dom";

const mapStateToProps = (state) => ({
  utils: state.utils,
  user: state.user,
  tasks: state.tasks,
  documents: state.documents, // To support direct opening of Nodoc
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ fetchUser }, dispatch);
};

function TasksDashboard(props) {
  let history = useHistory();
  let [tasksList, setTasksList] = useState(null);
  let [filteredList, setFilteredList] = useState(null);
  let [preApprovalTasks, setPreApprovalTasks] = useState(null);
  let [findAgentTasks, setFindAgentTasks] = useState(null);
  let [findHomeTasks, setFindHomeTasks] = useState(null);
  let [homeInspectionTasks, setHomeInspectionTasks] = useState(null);
  let [escrowTitleTasks, setEscrowTitleTasks] = useState(null);
  let [homeInsuranceTasks, setHomeInsuranceTasks] = useState(null);
  let [closingTasks, setClosingTasks] = useState(null);
  let [taskSet, updateTaskset] = useState(false);

  useEffect(() => {
    if (props.utils.reload === true) {
      props.fetchUser();
    }
  }, []);

  if (props.utils.reload === false && taskSet === false) {
    // If the user has not been loaded and the tasklist is not set
    let addArray = [];

    // Filtering and storing all the tasks that are for the user and are not completed
    setPreApprovalTasks(
      props.tasks.PreApprovalTasks.filter(
        (ele) => ele.to === USER && !ele.completed
      )
    );
    setFindAgentTasks(
      props.tasks.FindAgentTasks.filter(
        (ele) => ele.to === USER && !ele.completed
      )
    );
    setFindHomeTasks(
      props.tasks.FindHomeTasks.filter(
        (ele) => ele.to === USER && !ele.completed
      )
    );
    setHomeInspectionTasks(
      props.tasks.HomeInspectionTasks.filter(
        (ele) => ele.to === USER && !ele.completed
      )
    );
    setEscrowTitleTasks(
      props.tasks.EscrowTitleTasks.filter(
        (ele) => ele.to === USER && !ele.completed
      )
    );
    setHomeInsuranceTasks(
      props.tasks.HomeInsuranceTasks.filter(
        (ele) => ele.to === USER && !ele.completed
      )
    );
    setClosingTasks(
      props.tasks.ClosingTasks.filter(
        (ele) => ele.to === USER && !ele.completed
      )
    );

    props.tasks.PreApprovalTasks.forEach((val) => {
      if (val.to === USER && !val.completed) addArray.push(val);
    });

    props.tasks.FindAgentTasks.forEach((val) => {
      if (val.to === USER && !val.completed) addArray.push(val);
    });

    props.tasks.FindHomeTasks.forEach((val) => {
      if (val.to === USER && !val.completed) addArray.push(val);
    });

    props.tasks.HomeInspectionTasks.forEach((val) => {
      if (val.to === USER && !val.completed) addArray.push(val);
    });

    props.tasks.EscrowTitleTasks.forEach((val) => {
      if (val.to === USER && !val.completed) addArray.push(val);
    });

    props.tasks.HomeInsuranceTasks.forEach((val) => {
      if (val.to === USER && !val.completed) addArray.push(val);
    });

    props.tasks.ClosingTasks.forEach((val) => {
      if (val.to === USER && !val.completed) addArray.push(val);
    });

    setTasksList(addArray); // Storing all the tasks in tasksList
    setFilteredList(addArray); // Settting the filteredList with all the tasks
    updateTaskset(true); // updating the state of TaskSet
  }

  const completeTasksFunction = async (task, step) => {
    // function to complete the tasks and remove it from the array
    setTasksList(tasksList.filter((e) => e.id !== task.id)); // removing the task from the general list
    if (step === steps.PreApproval)
      setPreApprovalTasks(preApprovalTasks.filter((e) => e.id !== task.id));
    else if (step === steps.FindAgent)
      setFindAgentTasks(findAgentTasks.filter((e) => e.id !== task.id));
    else if (step === steps.FindHome)
      setFindHomeTasks(findHomeTasks.filter((e) => e.id !== task.id));
    else if (step === steps.EscrowTitle)
      setEscrowTitleTasks(escrowTitleTasks.filter((e) => e.id !== task.id));
    else if (step === steps.HomeInspection)
      setHomeInspectionTasks(
        homeInspectionTasks.filter((e) => e.id !== task.id)
      );
    else if (step === steps.HomeInsurance)
      setHomeInsuranceTasks(homeInsuranceTasks.filter((e) => e.id !== task.id));
    else if (step === steps.Closing)
      setClosingTasks(closingTasks.filter((e) => e.id !== task.id));

    await completeTasks(props.user.Transaction, task, step);
  };

  function displayDate(date) {
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
  }

  const uploadDocument = (task, step) => {
    // To open the Nodoc screen with appropriate state
    let documentData = null; // To store the document's metadata

    if (step === steps.PreApproval) {
      documentData = props.documents.PreApprovalDocuments.filter(
        (doc) => doc.id === task.documentId
      );
    } else if (step === steps.FindAgent) {
      documentData = props.documents.FindAgentDocuments.filter(
        (doc) => doc.id === task.documentId
      );
    } else if (step === steps.FindHome) {
      documentData = props.documents.FindHomeDocuments.filter(
        (doc) => doc.id === task.documentId
      );
    } else if (step === steps.EscrowTitle) {
      documentData = props.documents.EscrowTitleDocuments.filter(
        (doc) => doc.id === task.documentId
      );
    } else if (step === steps.HomeInspection) {
      documentData = props.documents.HomeInspectionDocuments.filter(
        (doc) => doc.id === task.documentId
      );
    } else if (step === steps.HomeInsurance) {
      documentData = props.documents.HomeInsuranceDocuments.filter(
        (doc) => doc.id === task.documentId
      );
    } else if (step === steps.Closing) {
      documentData = props.documents.ClosingDocuments.filter(
        (doc) => doc.id === task.documentId
      );
    }

    if (documentData && documentData.length === 1) {
      // If the document's metadata was found
      history.push("/nodoc", {
        ...documentData[0],
        step: step,
        tid: props.user.Transaction,
      });
    } else {
      window.location.href = "/documents";
    }
  };

  function displayButton(type, task, step) {
    // To display the required buttons
    if (type === "documents") {
      return (
        <div className="tasks-dashboard-task-list-item-actions-group">
          <ReallosButton
            dense
            className="task-summary-btn"
            fullWidth
            variant="primary"
            primary={true}
            onClick={() => uploadDocument(task, step)}
          >
            Upload
          </ReallosButton>
        </div>
      );
    } else {
      return (
        <div className="tasks-dashboard-task-list-item-actions-group">
          <ReallosButton
            dense
            fullWidth
            variant="primary"
            className="task-summary-btn"
            primary={true}
            onClick={() => {
              completeTasksFunction(task, step);
            }}
          >
            Mark Completed
          </ReallosButton>
          <ReallosButton
            dense
            fullWidth
            variant="primary"
            className="task-summary-btn"
            primary={false}
            onClick={() => {}}
          >
            Help
          </ReallosButton>
        </div>
      );
    }
  }

  const PrimaryContent = () => {
    if (tasksList === null || filteredList === null) {
      return (
        <div className="single-view-container">
          <CircularProgress />

          <div
            style={{
              marginTop: 50,
              fontSize: 20,
            }}
          >
            Fetching Tasks...
          </div>
        </div>
      );
    } else if (tasksList.length === 0) {
      // If there are no tasks that are uploaded for the user
      return (
        <div className="tasks-dashboard-single-view-container">
          <img src={NoTasks} alt="" />
          <h2 className="tasks-dashboard-subheading">
            Your tasks reside here!
          </h2>

          <p className="tasks-dashboard-text">
            View all the tasks related to your transaction all in one place...
          </p>
        </div>
      );
    } else if (filteredList.length === 0) {
      // If no tasks matched the search term
      return (
        <div className="single-view-container" style={{ textAlign: "center" }}>
          <Grid
            item
            style={{
              paddingBottom: 20,
              opacity: 0.5,
            }}
          >
            {window.innerHeight < 750 ? (
              <SearchIcon size={100} />
            ) : (
              <SearchIcon size={150} />
            )}
          </Grid>
          <Grid item>
            <Box marginTop={-3} component="h1">
              <h4>No results found</h4>
            </Box>
          </Grid>
          <Grid item>
            <Box
              marginTop={-2}
              style={{ fontSize: 18, fontFamily: "Segoe UI" }}
            >
              The entered search term did not match any tasks
            </Box>
          </Grid>
        </div>
      );
    } else {
      // If Tasks are present to be rendered
      if (tasksList.length === filteredList.length) {
        return (
          <div style={{ width: "100%" }}>
            {preApprovalTasks.length !== 0 && (
              <>
                <div className="tasks-dashboard-section-title">
                  Pre-approval
                </div>
                <List className="tasks-dashboard-list">
                  {preApprovalTasks.map((task, index) => (
                    <Accordion
                      key={index}
                      className="tasks-dashboard-list-item"
                    >
                      <AccordionSummary
                        className="tasks-dashboard-list-item-header"
                        expandIcon={<ExpandMoreIcon />}
                      >
                        <div className="tasks-dashboard-accordion-date">
                          {displayDate(task.date)}
                        </div>

                        <div className="tasks-dashboard-list-item-header-text-group">
                          <Typography
                            noWrap
                            className="tasks-dashboard-list-item-heading"
                          >
                            {task.title}
                          </Typography>
                          <Typography
                            noWrap
                            className="tasks-dashboard-list-item-subheading"
                          >
                            {task.description}
                          </Typography>
                        </div>
                      </AccordionSummary>

                      <AccordionDetails className="tasks-dashboard-task-list-item-details">
                        <Typography className="tasks-dashboard-task-list-item-details-desc">
                          {task.description}
                        </Typography>
                        {displayButton(task.type, task, steps.PreApproval)}
                      </AccordionDetails>
                    </Accordion>
                  ))}
                </List>
              </>
            )}
            {findAgentTasks.length !== 0 && (
              <>
                <div className="tasks-dashboard-section-title">Find Agent</div>
                <List className="tasks-dashboard-list">
                  {findAgentTasks.map((task, index) => (
                    <Accordion
                      key={index}
                      className="tasks-dashboard-list-item"
                    >
                      <AccordionSummary
                        className="tasks-dashboard-list-item-header"
                        expandIcon={<ExpandMoreIcon />}
                      >
                        <div className="tasks-dashboard-accordion-date">
                          {displayDate(task.date)}
                        </div>

                        <div className="tasks-dashboard-list-item-header-text-group">
                          <Typography
                            noWrap
                            className="tasks-dashboard-list-item-heading"
                          >
                            {task.title}
                          </Typography>
                          <Typography
                            noWrap
                            className="tasks-dashboard-list-item-subheading"
                          >
                            {task.description}
                          </Typography>
                        </div>
                      </AccordionSummary>

                      <AccordionDetails className="tasks-dashboard-task-list-item-details">
                        <Typography className="tasks-dashboard-task-list-item-details-desc">
                          {task.description}
                        </Typography>
                        {displayButton(task.type, task, steps.FindAgent)}
                      </AccordionDetails>
                    </Accordion>
                  ))}
                </List>
              </>
            )}
            {findHomeTasks.length !== 0 && (
              <>
                <div className="tasks-dashboard-section-title">Find Home</div>
                <List className="tasks-dashboard-list">
                  {findHomeTasks.map((task, index) => (
                    <Accordion
                      key={index}
                      className="tasks-dashboard-list-item"
                    >
                      <AccordionSummary
                        className="tasks-dashboard-list-item-header"
                        expandIcon={<ExpandMoreIcon />}
                      >
                        <div className="tasks-dashboard-accordion-date">
                          {displayDate(task.date)}
                        </div>

                        <div className="tasks-dashboard-list-item-header-text-group">
                          <Typography
                            noWrap
                            className="tasks-dashboard-list-item-heading"
                          >
                            {task.title}
                          </Typography>
                          <Typography
                            noWrap
                            className="tasks-dashboard-list-item-subheading"
                          >
                            {task.description}
                          </Typography>
                        </div>
                      </AccordionSummary>

                      <AccordionDetails className="tasks-dashboard-task-list-item-details">
                        <Typography className="tasks-dashboard-task-list-item-details-desc">
                          {task.description}
                        </Typography>
                        {displayButton(task.type, task, steps.FindHome)}
                      </AccordionDetails>
                    </Accordion>
                  ))}
                </List>
              </>
            )}
            {homeInspectionTasks.length !== 0 && (
              <>
                <div className="tasks-dashboard-section-title">
                  Home Inspection
                </div>
                <List className="tasks-dashboard-list">
                  {homeInspectionTasks.map((task, index) => (
                    <Accordion
                      key={index}
                      className="tasks-dashboard-list-item"
                    >
                      <AccordionSummary
                        className="tasks-dashboard-list-item-header"
                        expandIcon={<ExpandMoreIcon />}
                      >
                        <div className="tasks-dashboard-accordion-date">
                          {displayDate(task.date)}
                        </div>

                        <div className="tasks-dashboard-list-item-header-text-group">
                          <Typography
                            noWrap
                            className="tasks-dashboard-list-item-heading"
                          >
                            {task.title}
                          </Typography>
                          <Typography
                            noWrap
                            className="tasks-dashboard-list-item-subheading"
                          >
                            {task.description}
                          </Typography>
                        </div>
                      </AccordionSummary>

                      <AccordionDetails className="tasks-dashboard-task-list-item-details">
                        <Typography className="tasks-dashboard-task-list-item-details-desc">
                          {task.description}
                        </Typography>
                        {displayButton(task.type, task, steps.HomeInspection)}
                      </AccordionDetails>
                    </Accordion>
                  ))}
                </List>
              </>
            )}
            {escrowTitleTasks.length !== 0 && (
              <>
                <div className="tasks-dashboard-section-title">
                  Escrow & Title
                </div>
                <List className="tasks-dashboard-list">
                  {escrowTitleTasks.map((task, index) => (
                    <Accordion
                      key={index}
                      className="tasks-dashboard-list-item"
                    >
                      <AccordionSummary
                        className="tasks-dashboard-list-item-header"
                        expandIcon={<ExpandMoreIcon />}
                      >
                        <div className="tasks-dashboard-accordion-date">
                          {displayDate(task.date)}
                        </div>

                        <div className="tasks-dashboard-list-item-header-text-group">
                          <Typography
                            noWrap
                            className="tasks-dashboard-list-item-heading"
                          >
                            {task.title}
                          </Typography>
                          <Typography
                            noWrap
                            className="tasks-dashboard-list-item-subheading"
                          >
                            {task.description}
                          </Typography>
                        </div>
                      </AccordionSummary>

                      <AccordionDetails className="tasks-dashboard-task-list-item-details">
                        <Typography className="tasks-dashboard-task-list-item-details-desc">
                          {task.description}
                        </Typography>
                        {displayButton(task.type, task, steps.EscrowTitle)}
                      </AccordionDetails>
                    </Accordion>
                  ))}
                </List>
              </>
            )}
            {homeInsuranceTasks.length !== 0 && (
              <>
                <div className="tasks-dashboard-section-title">
                  Home Insurance
                </div>
                <List className="tasks-dashboard-list">
                  {homeInsuranceTasks.map((task, index) => (
                    <Accordion
                      key={index}
                      className="tasks-dashboard-list-item"
                    >
                      <AccordionSummary
                        className="tasks-dashboard-list-item-header"
                        expandIcon={<ExpandMoreIcon />}
                      >
                        <div className="tasks-dashboard-accordion-date">
                          {displayDate(task.date)}
                        </div>

                        <div className="tasks-dashboard-list-item-header-text-group">
                          <Typography
                            noWrap
                            className="tasks-dashboard-list-item-heading"
                          >
                            {task.title}
                          </Typography>
                          <Typography
                            noWrap
                            className="tasks-dashboard-list-item-subheading"
                          >
                            {task.description}
                          </Typography>
                        </div>
                      </AccordionSummary>

                      <AccordionDetails className="tasks-dashboard-task-list-item-details">
                        <Typography className="tasks-dashboard-task-list-item-details-desc">
                          {task.description}
                        </Typography>
                        {displayButton(task.type, task, steps.HomeInsurance)}
                      </AccordionDetails>
                    </Accordion>
                  ))}
                </List>
              </>
            )}
            {closingTasks.length !== 0 && (
              <>
                <div className="tasks-dashboard-section-title">Closing</div>
                <List className="tasks-dashboard-list">
                  {closingTasks.map((task, index) => (
                    <Accordion
                      key={index}
                      className="tasks-dashboard-list-item"
                    >
                      <AccordionSummary
                        className="tasks-dashboard-list-item-header"
                        expandIcon={<ExpandMoreIcon />}
                      >
                        <div className="tasks-dashboard-accordion-date">
                          {displayDate(task.date)}
                        </div>

                        <div className="tasks-dashboard-list-item-header-text-group">
                          <Typography
                            noWrap
                            className="tasks-dashboard-list-item-heading"
                          >
                            {task.title}
                          </Typography>
                          <Typography
                            noWrap
                            className="tasks-dashboard-list-item-subheading"
                          >
                            {task.description}
                          </Typography>
                        </div>
                      </AccordionSummary>

                      <AccordionDetails className="tasks-dashboard-task-list-item-details">
                        <Typography className="tasks-dashboard-task-list-item-details-desc">
                          {task.description}
                        </Typography>
                        {displayButton(task.type, task, steps.Closing)}
                      </AccordionDetails>
                    </Accordion>
                  ))}
                </List>
              </>
            )}
          </div>
        );
      } else {
        // pa - Pre-Approval, fa - FindAgent, fh - FindHome, hi - Home Inspection, et - EscrowTitle, hin - Home Insurance, c = Closing
        let paId = [],
          faId = [],
          fhId = [],
          hiId = [],
          etId = [],
          hinId = [],
          cId = [];

        // Storing all the doc Ids and whether we should display a particular step or not
        preApprovalTasks.forEach((doc) => {
          filteredList.forEach((e) => {
            if (e.id === doc.id) {
              paId.push(e);
            }
          });
        });

        findAgentTasks.forEach((doc) => {
          filteredList.forEach((e) => {
            if (e.id === doc.id) {
              faId.push(e);
            }
          });
        });

        findHomeTasks.forEach((doc) => {
          filteredList.forEach((e) => {
            if (e.id === doc.id) {
              fhId.push(e);
            }
          });
        });

        escrowTitleTasks.forEach((doc) => {
          filteredList.forEach((e) => {
            if (e.id === doc.id) {
              etId.push(e);
            }
          });
        });

        homeInspectionTasks.forEach((doc) => {
          filteredList.forEach((e) => {
            if (e.id === doc.id) {
              hiId.push(e);
            }
          });
        });

        homeInsuranceTasks.forEach((doc) => {
          filteredList.forEach((e) => {
            if (e.id === doc.id) {
              hinId.push(e);
            }
          });
        });

        closingTasks.forEach((doc) => {
          filteredList.forEach((e) => {
            if (e.id === doc.id) {
              cId.push(e);
            }
          });
        });

        return (
          <div style={{ width: "100%" }}>
            {paId.length !== 0 && (
              <>
                <div className="tasks-dashboard-section-title">
                  Pre-approval
                </div>
                <List className="tasks-dashboard-list">
                  {paId.map((task, index) => (
                    <Accordion
                      key={index}
                      className="tasks-dashboard-list-item"
                    >
                      <AccordionSummary
                        className="tasks-dashboard-list-item-header"
                        expandIcon={<ExpandMoreIcon />}
                      >
                        <div className="tasks-dashboard-accordion-date">
                          {displayDate(task.date)}
                        </div>

                        <div className="tasks-dashboard-list-item-header-text-group">
                          <Typography
                            noWrap
                            className="tasks-dashboard-list-item-heading"
                          >
                            {task.title}
                          </Typography>
                          <Typography
                            noWrap
                            className="tasks-dashboard-list-item-subheading"
                          >
                            {task.description}
                          </Typography>
                        </div>
                      </AccordionSummary>

                      <AccordionDetails className="tasks-dashboard-task-list-item-details">
                        <Typography className="tasks-dashboard-task-list-item-details-desc">
                          {task.description}
                        </Typography>
                        {displayButton(task.type, task, steps.PreApproval)}
                      </AccordionDetails>
                    </Accordion>
                  ))}
                </List>
              </>
            )}
            {faId.length !== 0 && (
              <>
                <div className="tasks-dashboard-section-title">Find Agent</div>
                <List className="tasks-dashboard-list">
                  {faId.map((task, index) => (
                    <Accordion
                      key={index}
                      className="tasks-dashboard-list-item"
                    >
                      <AccordionSummary
                        className="tasks-dashboard-list-item-header"
                        expandIcon={<ExpandMoreIcon />}
                      >
                        <div className="tasks-dashboard-accordion-date">
                          {displayDate(task.date)}
                        </div>

                        <div className="tasks-dashboard-list-item-header-text-group">
                          <Typography
                            noWrap
                            className="tasks-dashboard-list-item-heading"
                          >
                            {task.title}
                          </Typography>
                          <Typography
                            noWrap
                            className="tasks-dashboard-list-item-subheading"
                          >
                            {task.description}
                          </Typography>
                        </div>
                      </AccordionSummary>

                      <AccordionDetails className="tasks-dashboard-task-list-item-details">
                        <Typography className="tasks-dashboard-task-list-item-details-desc">
                          {task.description}
                        </Typography>
                        {displayButton(task.type, task, steps.FindAgent)}
                      </AccordionDetails>
                    </Accordion>
                  ))}
                </List>
              </>
            )}
            {fhId.length !== 0 && (
              <>
                <div className="tasks-dashboard-section-title">Find Home</div>
                <List className="tasks-dashboard-list">
                  {fhId.map((task, index) => (
                    <Accordion
                      key={index}
                      className="tasks-dashboard-list-item"
                    >
                      <AccordionSummary
                        className="tasks-dashboard-list-item-header"
                        expandIcon={<ExpandMoreIcon />}
                      >
                        <div className="tasks-dashboard-accordion-date">
                          {displayDate(task.date)}
                        </div>

                        <div className="tasks-dashboard-list-item-header-text-group">
                          <Typography
                            noWrap
                            className="tasks-dashboard-list-item-heading"
                          >
                            {task.title}
                          </Typography>
                          <Typography
                            noWrap
                            className="tasks-dashboard-list-item-subheading"
                          >
                            {task.description}
                          </Typography>
                        </div>
                      </AccordionSummary>

                      <AccordionDetails className="tasks-dashboard-task-list-item-details">
                        <Typography className="tasks-dashboard-task-list-item-details-desc">
                          {task.description}
                        </Typography>
                        {displayButton(task.type, task, steps.FindHome)}
                      </AccordionDetails>
                    </Accordion>
                  ))}
                </List>
              </>
            )}
            {hiId.length !== 0 && (
              <>
                <div className="tasks-dashboard-section-title">
                  Home Inspection
                </div>
                <List className="tasks-dashboard-list">
                  {hiId.map((task, index) => (
                    <Accordion
                      key={index}
                      className="tasks-dashboard-list-item"
                    >
                      <AccordionSummary
                        className="tasks-dashboard-list-item-header"
                        expandIcon={<ExpandMoreIcon />}
                      >
                        <div className="tasks-dashboard-accordion-date">
                          {displayDate(task.date)}
                        </div>

                        <div className="tasks-dashboard-list-item-header-text-group">
                          <Typography
                            noWrap
                            className="tasks-dashboard-list-item-heading"
                          >
                            {task.title}
                          </Typography>
                          <Typography
                            noWrap
                            className="tasks-dashboard-list-item-subheading"
                          >
                            {task.description}
                          </Typography>
                        </div>
                      </AccordionSummary>

                      <AccordionDetails className="tasks-dashboard-task-list-item-details">
                        <Typography className="tasks-dashboard-task-list-item-details-desc">
                          {task.description}
                        </Typography>
                        {displayButton(task.type, task, steps.HomeInspection)}
                      </AccordionDetails>
                    </Accordion>
                  ))}
                </List>
              </>
            )}
            {etId.length !== 0 && (
              <>
                <div className="tasks-dashboard-section-title">
                  Escrow & Title
                </div>
                <List className="tasks-dashboard-list">
                  {etId.map((task, index) => (
                    <Accordion
                      key={index}
                      className="tasks-dashboard-list-item"
                    >
                      <AccordionSummary
                        className="tasks-dashboard-list-item-header"
                        expandIcon={<ExpandMoreIcon />}
                      >
                        <div className="tasks-dashboard-accordion-date">
                          {displayDate(task.date)}
                        </div>

                        <div className="tasks-dashboard-list-item-header-text-group">
                          <Typography
                            noWrap
                            className="tasks-dashboard-list-item-heading"
                          >
                            {task.title}
                          </Typography>
                          <Typography
                            noWrap
                            className="tasks-dashboard-list-item-subheading"
                          >
                            {task.description}
                          </Typography>
                        </div>
                      </AccordionSummary>

                      <AccordionDetails className="tasks-dashboard-task-list-item-details">
                        <Typography className="tasks-dashboard-task-list-item-details-desc">
                          {task.description}
                        </Typography>
                        {displayButton(task.type, task, steps.EscrowTitle)}
                      </AccordionDetails>
                    </Accordion>
                  ))}
                </List>
              </>
            )}
            {hinId.length !== 0 && (
              <>
                <div className="tasks-dashboard-section-title">
                  Home Insurance
                </div>
                <List className="tasks-dashboard-list">
                  {hinId.map((task, index) => (
                    <Accordion
                      key={index}
                      className="tasks-dashboard-list-item"
                    >
                      <AccordionSummary
                        className="tasks-dashboard-list-item-header"
                        expandIcon={<ExpandMoreIcon />}
                      >
                        <div className="tasks-dashboard-accordion-date">
                          {displayDate(task.date)}
                        </div>

                        <div className="tasks-dashboard-list-item-header-text-group">
                          <Typography
                            noWrap
                            className="tasks-dashboard-list-item-heading"
                          >
                            {task.title}
                          </Typography>
                          <Typography
                            noWrap
                            className="tasks-dashboard-list-item-subheading"
                          >
                            {task.description}
                          </Typography>
                        </div>
                      </AccordionSummary>

                      <AccordionDetails className="tasks-dashboard-task-list-item-details">
                        <Typography className="tasks-dashboard-task-list-item-details-desc">
                          {task.description}
                        </Typography>
                        {displayButton(task.type, task, steps.HomeInsurance)}
                      </AccordionDetails>
                    </Accordion>
                  ))}
                </List>
              </>
            )}
            {cId.length !== 0 && (
              <>
                <div className="tasks-dashboard-section-title">Closing</div>
                <List className="tasks-dashboard-list">
                  {cId.map((task, index) => (
                    <Accordion
                      key={index}
                      className="tasks-dashboard-list-item"
                    >
                      <AccordionSummary
                        className="tasks-dashboard-list-item-header"
                        expandIcon={<ExpandMoreIcon />}
                      >
                        <div className="tasks-dashboard-accordion-date">
                          {displayDate(task.date)}
                        </div>

                        <div className="tasks-dashboard-list-item-header-text-group">
                          <Typography
                            noWrap
                            className="tasks-dashboard-list-item-heading"
                          >
                            {task.title}
                          </Typography>
                          <Typography
                            noWrap
                            className="tasks-dashboard-list-item-subheading"
                          >
                            {task.description}
                          </Typography>
                        </div>
                      </AccordionSummary>

                      <AccordionDetails className="tasks-dashboard-task-list-item-details">
                        <Typography className="tasks-dashboard-task-list-item-details-desc">
                          {task.description}
                        </Typography>
                        {displayButton(task.type, task, steps.Closing)}
                      </AccordionDetails>
                    </Accordion>
                  ))}
                </List>
              </>
            )}
          </div>
        );
      }
    }
  };

  return (
    <Scaffold bottomNav bottomNavActive="Tasks">
      <Grid container direction="column">
        <h1 className="tasks-dashboard-heading">Tasks</h1>

        {tasksList && tasksList.length !== 0 && (
          <SearchBar
            filterByFields={["title", "description", "dueDate"]}
            list={tasksList}
            onUpdate={(filtered) => {
              setFilteredList(filtered);
            }}
          />
        )}

        {props.utils.loading ? (
          <div className="single-view-container">
            <CircularProgress />

            <div
              style={{
                marginTop: 50,
                fontSize: 20,
              }}
            >
              Fetching Tasks...
            </div>
          </div>
        ) : (
          PrimaryContent()
        )}
      </Grid>
    </Scaffold>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(TasksDashboard);
