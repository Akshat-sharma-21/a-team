import React, { useState, useEffect } from "react";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { SearchIcon } from "@primer/octicons-react";
import { ReallosButton, Scaffold, SearchBar } from "../utilities/core";
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

const mapStateToProps = (state) => ({
  utils: state.utils,
  user: state.user,
  tasks: state.tasks,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ fetchUser }, dispatch);
};

function TasksDashboard(props) {
  const USER = "user";
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

    // Filtering and storing all the tasks that are for the user
    setPreApprovalTasks(
      props.tasks.PreApprovalTasks.filter((ele) => ele.to === USER)
    );
    setFindAgentTasks(
      props.tasks.FindAgentTasks.filter((ele) => ele.to === USER)
    );
    setFindHomeTasks(
      props.tasks.FindHomeTasks.filter((ele) => ele.to === USER)
    );
    setHomeInspectionTasks(
      props.tasks.HomeInspectionTasks.filter((ele) => ele.to === USER)
    );
    setEscrowTitleTasks(
      props.tasks.EscrowTitleTasks.filter((ele) => ele.to === USER)
    );
    setHomeInsuranceTasks(
      props.tasks.HomeInsuranceTasks.filter((ele) => ele.to === USER)
    );
    setClosingTasks(props.tasks.ClosingTasks.filter((ele) => ele.to === USER));

    props.tasks.PreApprovalTasks.forEach((val) => {
      if (val.to === USER) addArray.push(val);
    });

    props.tasks.FindAgentTasks.forEach((val) => {
      if (val.to === USER) addArray.push(val);
    });

    props.tasks.FindHomeTasks.forEach((val) => {
      if (val.to === USER) addArray.push(val);
    });

    props.tasks.HomeInspectionTasks.forEach((val) => {
      if (val.to === USER) addArray.push(val);
    });

    props.tasks.EscrowTitleTasks.forEach((val) => {
      if (val.to === USER) addArray.push(val);
    });

    props.tasks.HomeInsuranceTasks.forEach((val) => {
      if (val.to === USER) addArray.push(val);
    });

    props.tasks.ClosingTasks.forEach((val) => {
      if (val.to === USER) addArray.push(val);
    });

    setTasksList(addArray); // Storing all the tasks in tasksList
    setFilteredList(addArray); // Settting the filteredList with all the tasks
    updateTaskset(true); // updating the state of TaskSet
  }

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

  function displayButton(type) {
    // To display the required buttons
    if (type === "documents") {
      return (
        <div className="tasks-dashboard-task-list-item-actions-group">
          <ReallosButton
            dense
            fullWidth
            variant="primary"
            primary={true}
            onClick={() => {
              window.location.href = "/documents"; // Add the id of the document here too
            }}
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
            primary={true}
            onClick={() => {}}
          >
            Mark Completed
          </ReallosButton>
          <ReallosButton
            dense
            fullWidth
            variant="primary"
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
        <div className="single-view-container">
          <h2 className="tasks-subheading">Your tasks reside here!</h2>

          <p className="tasks-text">
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
            <SearchIcon size={150} />
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
                        {displayButton(task.type)}
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
                        {displayButton(task.type)}
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
                        {displayButton(task.type)}
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
                        {displayButton(task.type)}
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
                        {displayButton(task.type)}
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
                        {displayButton(task.type)}
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
                        {displayButton(task.type)}
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
                        {displayButton(task.type)}
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
                        {displayButton(task.type)}
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
                        {displayButton(task.type)}
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
                        {displayButton(task.type)}
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
                        {displayButton(task.type)}
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
                        {displayButton(task.type)}
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
                        {displayButton(task.type)}
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
        <h1 className="page-header-heading">Tasks</h1>

        {tasksList && (
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
