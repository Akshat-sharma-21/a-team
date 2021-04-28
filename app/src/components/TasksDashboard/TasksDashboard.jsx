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
  roadmap: state.roadmap,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ fetchUser }, dispatch);
};

function TasksDashboard(props) {
  let [tasksList, setTasksList] = useState(null);
  let [filteredList, setFilteredList] = useState(null);

  useEffect(async () => {
    if (props.utils.reload === true) {
      props.fetchUser();
    }
  }, []);

  if (props.utils.reload === false && tasksList === null) {
    // If the user has not been loaded and the tasklist is not set
    let addArray = [];

    if (props.roadmap.PreApproval.Tasks.length !== 0) {
      // if PreApproval has Tasks
      props.roadmap.PreApproval.Tasks.forEach((val) => {
        if (val.to === "user") addArray.push(val);
      });
    }

    if (props.roadmap.FindAgent.Tasks.length !== 0) {
      // if FindAgent has Tasks
      props.roadmap.FindAgent.Tasks.forEach((val) => {
        if (val.to === "user") addArray.push(val);
      });
    }

    if (props.roadmap.FindHome.Tasks.length !== 0) {
      // if FindHome has Tasks
      props.roadmap.FindHome.Tasks.forEach((val) => {
        if (val.to === "user") addArray.push(val);
      });
    }

    if (props.roadmap.HomeInspection.Tasks.length !== 0) {
      // if HomeInspection has Tasks
      props.roadmap.HomeInspection.Tasks.forEach((val) => {
        if (val.to === "user") addArray.push(val);
      });
    }

    if (props.roadmap.EscrowTitle.Tasks.length !== 0) {
      // if EscrowTitle has Tasks
      props.roadmap.EscrowTitle.Tasks.forEach((val) => {
        if (val.to === "user") addArray.push(val);
      });
    }

    if (props.roadmap.HomeInsurance.Tasks.length !== 0) {
      // if HomeInsuramnce has Tasks
      props.roadmap.HomeInsurance.Tasks.forEach((val) => {
        if (val.to === "user") addArray.push(val);
      });
    }

    if (props.roadmap.Closing.Tasks.length !== 0) {
      // if Closing has Tasks
      props.roadmap.Closing.Tasks.forEach((val) => {
        if (val.to === "user") addArray.push(val);
      });
    }

    setTasksList(addArray);
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
      return (
        <div style={{ width: "100%" }}>
          <List className="tasks-dashboard-list">
            {filteredList.map((task, index) => (
              <Accordion key={index} className="tasks-dashboard-list-item">
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
        </div>
      );
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
