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

function TasksDashboard() {
  let [tasksList, setTasksList] = useState(null);
  let [filteredList, setFilteredList] = useState(null);

  useEffect(async () => {
    // Dummy values
    const _tasks = await _dummyApi();

    setTasksList(_tasks);
    setFilteredList(_tasks);

    return () => {
      // Cleanup
    };
  }, []);

  const _dummyApi = (emptyResponse = false, timeout = 2000) => {
    return new Promise((resolve, _) => {
      const _tasks = [
        {
          id: "qwertyuio",
          dueDate: "10 Jul",
          title: "Upload Photo ID",
          description:
            "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Velit fuga dolorum explicabo quo suscipit nihil minus aspernatur laboriosam. Dolorem cupiditate adipisci voluptates perferendis, facere mollitia at atque magnam maxime cum!",
          actions: [
            {
              label: "Upload",
              onClick: () => {},
            },
            {
              label: "Something else",
              onClick: () => {},
            },
          ],
        },
        {
          id: "asdfghjkl",
          dueDate: "5 Aug",
          title: "This is yet another task",
          description:
            "Morbi vitae tortor metus. Donec vel dignissim ex. Duis nec enim et libero bibendum cursus eu ac lorem. Praesent bibendum lorem non odio auctor aliquet.",
          actions: [],
        },
        {
          id: "zxcvbnm",
          dueDate: "12 Aug",
          title: "Upload Photo ID",
          description:
            "Duis auctor ultrices ex, eu tincidunt libero imperdiet ut. Donec sollicitudin luctus luctus. Pellentesque ut consectetur nunc. Vivamus mauris eros, interdum eu massa id, iaculis malesuada justo.",
          actions: [],
        },
      ];

      setTimeout(() => {
        resolve(emptyResponse ? [] : _tasks);
      }, timeout);
    });
  };

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
              style={{ fontSize: 18, fontFamily: "Open Sans" }}
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
          <h2 className="tasks-dashboard-section-title">Preapproval</h2>

          <List className="tasks-dashboard-list">
            {filteredList.map((task) => (
              <Accordion key={task.id} className="tasks-dashboard-list-item">
                <AccordionSummary
                  className="tasks-dashboard-list-item-header"
                  expandIcon={<ExpandMoreIcon />}
                >
                  <div className="tasks-dashboard-accordion-date">
                    {task.dueDate}
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

                  <div className="tasks-dashboard-task-list-item-actions-group">
                    {task.actions.map((taskAction, index) => (
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
                    ))}
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
        <div className="page-header">
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
        </div>

        {PrimaryContent()}
      </Grid>
    </Scaffold>
  );
}

export default TasksDashboard;
