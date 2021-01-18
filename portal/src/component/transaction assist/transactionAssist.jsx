import "./transactionAssist.css";
import transactionImg from "../../assets/transaction-assist-first-time.png";
import Modal from "../utilities/modal/modal";
import doc from "./doc.png";
import {
  Container,
  Grid,
  Typography,
  Button,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Box,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import {
  DotFillIcon,
  TriangleDownIcon,
  PackageIcon,
  SearchIcon,
  CheckCircleIcon,
  CheckIcon,
} from "@primer/octicons-react";
import { useState } from "react";
import Scaffold from "../utilities/scaffold/Scaffold";

function TransactionAssist(props) {
  const [modalVisibile, setModal] = useState(true);
  let [taskList, setTaskList] = useState([
    { name: "Task1", date: "10 July", completed: true },
    { name: "Task2", date: "11 July", completed: true },
    { name: "Task3", date: "12 July", completed: false },
    { name: "Task4", date: "13 July", completed: false },
  ]);

  function firstTimeModal() {
    // function to display the first time modal
    return (
      <Modal
        visible={modalVisibile ? true : false}
        modalWidth={750}
        modalHeight={500}
        dismissCallback={closeModal}
      >
        <Grid container direction="column">
          <Grid item>
            <img src={transactionImg} alt="" style={{ height: 290 }} />
          </Grid>
          <Grid item>
            <Typography
              style={{
                fontSize: 25,
                fontFamily: "Roboto Slab",
                fontWeight: "Bold",
                paddingTop: 15,
              }}
            >
              Transaction Tracker
            </Typography>
          </Grid>
          <Grid item>
            <Typography
              style={{
                fontSize: 18,
                fontFamily: "Roboto Slab",
                paddingTop: 10,
              }}
            >
              Exactly know the progress of your client's Transaction!
            </Typography>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              className="continue-button"
              onClick={closeModal}
            >
              Continue
            </Button>
          </Grid>
        </Grid>
      </Modal>
    );
  }

  function closeModal() {
    // function to close the first time modal
    setModal(false);
  }

  function displayExpansionPanels() {
    // function to render the expansion panel
    return (
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<TriangleDownIcon />}>
              <Grid container direction="row" alignItems="center" spacing={4}>
                <Grid item>
                  <DotFillIcon size={23} />
                </Grid>
                <Divider orientation="vertical" style={{ height: 50 }} />
                <Grid item>
                  <Grid
                    container
                    direction="row"
                    alignItems="center"
                    spacing={3}
                  >
                    <Grid item>
                      <CheckCircleIcon size={23} />
                    </Grid>
                    <Grid item>
                      <Typography className="expansion-heading">
                        Pre-Approval
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails className="exppanel">
              {
                <div>
                  <div className="heading">
                    <h1 className="title">Tasks</h1>
                    <h6 className="track">2 of 7 tasks completed</h6>
                    <button className="custom-btn">Add new task</button>
                  </div>

                  {taskList.map((task) => {
                    return (
                      <ListItem
                        className={
                          task.completed ? "assist-task-completed" : ""
                        }
                      >
                        <ListItemIcon>
                          {task.completed ? (
                            <CheckIcon className="checkicon-transaction" />
                          ) : (
                            <DotFillIcon />
                          )}
                        </ListItemIcon>
                        <ListItemText>
                          <span className="assist-task-date">{task.date}</span>
                          {task.name}
                        </ListItemText>
                      </ListItem>
                    );
                  })}

                  <div className="timeline"></div>
                  <div className="docBox">
                    <div className="heading-2">
                      <h1 className="title-2">Documents</h1>
                      <h6 className="track-2">1 of 2 completed</h6>
                    </div>
                    <div class="docs">
                      <div class="doc">
                        <img src={doc} alt="doc-svg" />
                        <div className="doc-details">
                          <p>Document 1</p>
                          <p>Document is filled in</p>
                        </div>
                      </div>
                      <div class="doc">
                        <img src={doc} alt="doc-svg" />
                        <div className="doc-details">
                          <p>Document 1</p>
                          <p>Document is filled in</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              }
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </Grid>

        <Grid item>
          <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<TriangleDownIcon />}>
              <Grid container direction="row" alignItems="center" spacing={4}>
                <Grid item>
                  <DotFillIcon size={23} />
                </Grid>
                <Divider orientation="vertical" style={{ height: 50 }} />
                <Grid item>
                  <Grid
                    container
                    direction="row"
                    alignItems="center"
                    spacing={3}
                  >
                    <Grid item>
                      <SearchIcon size={23} />
                    </Grid>
                    <Grid item>
                      <Typography className="expansion-heading">
                        Find an Agent
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              {
                //This is where the expansion panel will be placed
              }
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </Grid>
      </Grid>
    );
  }

  return (
    <Scaffold navBar navRail>
      {firstTimeModal()}
      <Box component="div" paddingTop={5} paddingBottom={1}>
        <Grid
          container
          direction="row"
          alignItems="center"
          spacing={2}
          justify="flex-start"
        >
          <Grid item>
            <PackageIcon size={35} />
          </Grid>
          <Grid item>
            <h2 className="transaction-heading">
              {
                "Transaction 1" //Name of the transaction
              }
            </h2>
          </Grid>
        </Grid>
        {displayExpansionPanels()}
      </Box>
    </Scaffold>
  );
}

export default TransactionAssist;
