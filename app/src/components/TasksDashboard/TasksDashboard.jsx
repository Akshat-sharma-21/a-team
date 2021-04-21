import React, { useState, useEffect } from "react";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { SearchIcon } from "@primer/octicons-react";
import { Scaffold, SearchBar } from "../utilities/core";
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

    setTasksList(props.roadmap.PreApproval.Tasks);
  }, []);

  console.log(props.roadmap);

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
      // If documents are present to be rendered
      return (
        <div style={{ width: "100%" }}>
          <div className="tasks-dashboard-section-title">Preapproval</div>

          <List className="tasks-dashboard-list">
            {filteredList.map((task, index) => (
              <Accordion key={index} className="tasks-dashboard-list-item">
                <AccordionSummary
                  className="tasks-dashboard-list-item-header"
                  expandIcon={<ExpandMoreIcon />}
                >
                  <div className="tasks-dashboard-accordion-date">
                    {task.Date}
                  </div>

                  <div className="tasks-dashboard-list-item-header-text-group">
                    <Typography
                      noWrap
                      className="tasks-dashboard-list-item-heading"
                    >
                      {task.Title}
                    </Typography>
                    <Typography
                      noWrap
                      className="tasks-dashboard-list-item-subheading"
                    >
                      {task.Description}
                    </Typography>
                  </div>
                </AccordionSummary>

                <AccordionDetails className="tasks-dashboard-task-list-item-details">
                  <Typography className="tasks-dashboard-task-list-item-details-desc">
                    {task.Description}
                  </Typography>

                  <div className="tasks-dashboard-task-list-item-actions-group">
                    {/* {task.Actions.map((taskAction, index) => (
                      <ReallosButton
                        key={taskAction.label}
                        dense
                        fullWidth
                        variant="primary"
                        primary={index === 0}
                        onClick={taskAction.onClick}
                      >
                        {taskAction.label}
                      </ReallosButton>
                    ))} */}
                  </div>
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
