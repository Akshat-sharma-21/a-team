import React, { useState } from "react";
import { ReallosButton, SideDrawer, ReallosModal } from "../utilities/core";
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  Grid,
  FormGroup,
  TextField,
  Snackbar,
  Radio,
  RadioGroup,
  MenuItem,
  FormControlLabel,
  Select,
  LinearProgress,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { NavLink } from "react-router-dom";
import {
  CheckIcon,
  DotFillIcon,
  PencilIcon,
  CalendarIcon,
  IssueOpenedIcon,
  TagIcon,
  OrganizationIcon,
  MilestoneIcon,
  ClockIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  SearchIcon,
  HomeIcon,
  StopIcon,
  FileIcon,
  ShieldCheckIcon,
  RocketIcon,
} from "@primer/octicons-react";
import { validateFormField } from "../../utils";
import {
  addTask,
  answerAgentQuestions,
} from "../../actions/transactionActions";
import DocIcon from "../../assets/doc_icon.png";
import DocGrayscaleIcon from "../../assets/doc_icon_grayscale.png";
import AssistAccordion from "./AssistAccordion";
import randomId from "random-id";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";

const mapActionToProps = (dispatch) => {
  return bindActionCreators({ addTask }, dispatch);
};

const LEN = 5; // Length of the random Id

function AssistComponent(props) {
  let [entireTasksListVisible, setEntireTasksListVisible] = useState(false);
  let [sideDrawerVisible, setSideDrawerVisible] = useState(false);
  let [showErrors, setShowErrors] = useState(false);
  let [errorText, setErrorText] = useState("");
  let [questionNum, SetQuestionNum] = useState(1);
  let [questionModalVisible, setQuestionModalVisibile] = useState(false);
  let [questionAnswered, setQuestionsAnswered] = useState(false);
  let [answer, setAnswer] = useState({
    firstAnswer: "",
    secondAnswer: "",
    thirdAnswer: null,
    fourthAnswer: null,
    fifthAnswer: null,
    sixthAnswer: new Date(), // setting a date variable
  });
  let [newTask, setNewTask] = useState({
    // newTask object
    title: "",
    description: "",
    date: new Date(), // setting a date variable
    priority: "",
  });

  const submitTask = async () => {
    // function to submit the task
    let validTitle = validateFormField(newTask.title, "title");
    let validDescription = validateFormField(
      newTask.description,
      "description"
    );
    let validPriority = validateFormField(newTask.priority, "priority");

    if (validTitle.hasError) {
      setShowErrors(true);
      setErrorText(validTitle.errorText);
    } else if (validDescription.hasError) {
      setShowErrors(true);
      setErrorText(validDescription.errorText);
    } else if (validPriority.hasError) {
      setShowErrors(true);
      setErrorText(validPriority.errorText);
    } else {
      // if there are no errors
      let newTaskObj = {
        ...newTask,
        date: newTask.date,
        to: "user", // Assigning the Task to user
        id: randomId(LEN), // Assigning the random Id
      };
      await props.addTask(props.tid, newTaskObj, props.title, props.stepObj); // waiting for the task to be stored
      setNewTask({
        title: "",
        description: "",
        date: new Date(),
        priority: "",
      });
      setSideDrawerVisible(false);
    }
  };

  function dateToString(date) {
    const months = [
      "Jan",
      "Feb",
      "March",
      "April",
      "May",
      "June",
      "July",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return date.getDate() + " " + months[date.getMonth()];
  }

  function displayQuestionModalHelper() {
    // function to display the Modal Question Helper
    if (questionNum === 1) {
      return (
        <>
          <div className="assist-question-modal-question">
            What is the Address of the house?
          </div>
          <div className="assist-question-modal-answer">
            <OrganizationIcon size={30} />
            &nbsp;&nbsp;&nbsp;&nbsp;
            <TextField
              multiline
              rows={3}
              fullWidth
              label="Address"
              variant="outlined"
              value={answer.firstAnswer}
              onChange={(e) => {
                setAnswer({
                  ...answer,
                  firstAnswer: e.target.value,
                });
              }}
            />
          </div>
        </>
      );
    }
    if (questionNum === 2) {
      return (
        <>
          <div className="assist-question-modal-question">
            How many Sqft. are there in the House?
          </div>
          <div className="assist-question-modal-answer">
            <MilestoneIcon size={30} />
            &nbsp;&nbsp;&nbsp;&nbsp;
            <TextField
              fullWidth
              value={answer.secondAnswer}
              label="Sqft"
              variant="outlined"
              onChange={(e) => {
                setAnswer({
                  ...answer,
                  secondAnswer: e.target.value,
                });
              }}
            />
          </div>
        </>
      );
    }
    if (questionNum === 3) {
      return (
        <>
          <div className="assist-question-modal-question">How many Floors?</div>
          <div className="assist-question-modal-answer">
            <MilestoneIcon size={30} />
            &nbsp;&nbsp;&nbsp;&nbsp;
            <Select
              value={answer.thirdAnswer}
              fullWidth="true"
              variant="outlined"
              onChange={(e) => {
                setAnswer({
                  ...answer,
                  thirdAnswer: e.target.value,
                });
              }}
            >
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={4}>4</MenuItem>
            </Select>
          </div>
        </>
      );
    }
    if (questionNum === 4) {
      return (
        <>
          <div className="assist-question-modal-question">
            Has the Home Inspection been voided?
          </div>
          <RadioGroup
            value={answer.fourthAnswer}
            onChange={(e) => {
              setAnswer({
                ...answer,
                fourthAnswer: e.target.value,
              });
            }}
          >
            <FormControlLabel
              value={"Yes"}
              control={<Radio style={{ color: "#0432fa" }} />}
              label="Yes"
            />
            <FormControlLabel
              value={"No"}
              control={<Radio style={{ color: "#0432fa" }} />}
              label="No"
            />
          </RadioGroup>
        </>
      );
    }
    if (questionNum === 5) {
      return (
        <>
          {" "}
          <div className="assist-question-modal-question">
            Does it have a Pool?
          </div>
          <RadioGroup
            value={answer.fifthAnswer}
            onChange={(e) => {
              setAnswer({
                ...answer,
                fifthAnswer: e.target.value,
              });
            }}
          >
            <FormControlLabel
              value={"Yes"}
              control={<Radio style={{ color: "#0432fa" }} />}
              label="Yes"
            />
            <FormControlLabel
              value={"No"}
              control={<Radio style={{ color: "#0432fa" }} />}
              label="No"
            />
          </RadioGroup>
        </>
      );
    }
    if (questionNum === 6) {
      return (
        <>
          <div className="assist-question-modal-question">
            What is the closing Date?
          </div>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <div className="assist-question-modal-answer">
              <ClockIcon size={30} />
              &nbsp;&nbsp;&nbsp;&nbsp;
              <KeyboardDatePicker
                fullWidth
                disablePast
                disableToolbar
                variant="dialog"
                format="MM/dd/yyyy"
                name="date"
                label="Closing Date"
                value={answer.sixthAnswer}
                onChange={(event) => {
                  setAnswer({ ...answer, sixthAnswer: event });
                }}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
            </div>
          </MuiPickersUtilsProvider>
        </>
      );
    }
  }

  function displayQuestionModal() {
    return (
      <ReallosModal
        visible={questionModalVisible}
        dismissCallback={() => setQuestionModalVisibile(false)}
        modalWidth={800}
        className="assist-question-modal"
      >
        <div style={{ height: "20px" }}></div>
        <LinearProgress
          variant="determinate"
          value={questionNum * (100 / 6)}
          className="assist-question-modal-progress"
        />
        <div className="assist-question-modal-heading">
          Questions
          <span className="assist-question-modal-subheading-dot">
            <DotFillIcon />
          </span>
          <span className="assist-question-modal-subheading">
            {questionNum} out of 6
          </span>
        </div>

        <div style={{ height: "20px" }}></div>
        {displayQuestionModalHelper()}
        <div style={{ height: "50px" }}></div>
        <Grid container direction="row" justify="flex-end" spacing={3}>
          <Grid item xs={3}>
            <ReallosButton
              fullWidth
              secondary
              className="assist-question-modal-btn"
              disabled={questionNum === 1}
              onClick={() => {
                if (questionNum > 1) SetQuestionNum(questionNum - 1);
              }}
            >
              Back
            </ReallosButton>
          </Grid>
          <Grid item xs={3}>
            <ReallosButton
              fullWidth
              primary
              className="assist-question-modal-btn"
              disabled={
                (questionNum === 1 && answer.firstAnswer === "") ||
                (questionNum === 2 && answer.secondAnswer === "") ||
                (questionNum === 3 && answer.thirdAnswer === null) ||
                (questionNum === 4 && answer.fourthAnswer === null) ||
                (questionNum === 5 && answer.fifthAnswer === null) ||
                (questionNum === 6 && answer.sixthAnswer === null)
              }
              onClick={async () => {
                SetQuestionNum(questionNum + 1);
                if (questionNum === 6) {
                  await answerAgentQuestions(props.tid, {
                    // Storing the answers in firestore
                    address: answer.firstAnswer,
                    sqft: answer.secondAnswer,
                    floors: answer.thirdAnswer,
                    homeInspectionVoided: answer.fourthAnswer,
                    pool: answer.fifthAnswer,
                    closingDate: new Date(answer.sixthAnswer),
                  });
                  setAnswer({
                    firstAnswer: "",
                    secondAnswer: "",
                    thirdAnswer: null,
                    fourthAnswer: null,
                    fifthAnswer: null,
                    sixthAnswer: null,
                    seventhAnswer: null,
                  });
                  setQuestionModalVisibile(false);
                  setQuestionsAnswered(true);
                  SetQuestionNum(1);
                }
              }}
            >
              {questionNum === 6 ? "Submit" : "Next"}
              &nbsp;
              {questionNum !== 6 && <ArrowRightIcon size={20} />}
            </ReallosButton>
          </Grid>
        </Grid>
      </ReallosModal>
    );
  }

  function displaySideDrawer() {
    // function to display the Side drawer
    return (
      <SideDrawer
        visible={sideDrawerVisible}
        dismissCallback={() => {
          setSideDrawerVisible(false);
          setNewTask({
            title: "",
            date: new Date(),
            priority: "",
            description: "",
          });
        }}
        title="Add a Task"
        className="assist-add-task-drawer-root"
      >
        <div className="assist-add-task-drawer-subheading">
          What is the task about?
        </div>

        <div className="assist-add-task-drawer-main">
          <FormGroup row className="assist-add-task-drawer-form-field-group">
            <TagIcon size={25} />

            <div>
              <TextField
                fullWidth
                variant="outlined"
                label="Title"
                type="text"
                name="title"
                value={newTask.title}
                onChange={(e) =>
                  setNewTask({ ...newTask, title: e.target.value })
                }
              />
            </div>
          </FormGroup>

          <FormGroup row className="assist-add-task-drawer-form-field-group">
            <PencilIcon size={25} />
            <div>
              <TextField
                fullWidth
                variant="outlined"
                multiline
                rows={8}
                label="Description"
                type="text"
                name="description"
                value={newTask.description}
                onChange={(e) =>
                  setNewTask({ ...newTask, description: e.target.value })
                }
              />
            </div>
          </FormGroup>

          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <FormGroup row className="assist-add-task-drawer-form-field-group">
              <CalendarIcon size={25} className="tag-icon" />
              <div>
                <KeyboardDatePicker
                  fullWidth
                  disablePast
                  disableToolbar
                  variant="dialog"
                  format="MM/dd/yyyy"
                  name="date"
                  label="Task Date"
                  value={newTask.date}
                  onChange={(event) => {
                    setNewTask({ ...newTask, date: event });
                  }}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                />
              </div>
            </FormGroup>
          </MuiPickersUtilsProvider>

          <FormGroup row className="assist-add-task-drawer-form-field-group">
            <IssueOpenedIcon size={25} className="tag-icon" />
            <div>
              <TextField
                fullWidth
                variant="outlined"
                label="Priority"
                type="number"
                name="priority"
                value={newTask.priority}
                onChange={(e) =>
                  setNewTask({ ...newTask, priority: e.target.value })
                }
              />
            </div>
          </FormGroup>
        </div>

        <div className="assist-add-task-drawer-footer">
          <ReallosButton
            cta
            fullWidth
            onClick={() => {
              setSideDrawerVisible(false);
              setNewTask({
                title: "",
                date: new Date(),
                priority: "",
                description: "",
              });
            }}
          >
            Back
          </ReallosButton>

          <ReallosButton cta fullWidth primary onClick={() => submitTask()}>
            Add Task
          </ReallosButton>
        </div>
      </SideDrawer>
    );
  }

  return (
    <>
      <AssistAccordion
        title={props.title}
        isStepCompleted={props.completed}
        itemIndex={props.index}
        AccordionStepIcon={
          props.index === 0 ? (
            <CheckCircleIcon size={23} />
          ) : props.index === 2 ? (
            <SearchIcon size={23} />
          ) : props.index === 3 ? (
            <HomeIcon size={23} />
          ) : props.index === 4 ? (
            <StopIcon size={23} />
          ) : props.index === 5 ? (
            <FileIcon size={23} />
          ) : props.index === 6 ? (
            <ShieldCheckIcon size={23} />
          ) : (
            <RocketIcon size={23} />
          )
        }
      >
        <div className="assist-accordion-section-root">
          {props.Transaction &&
          questionAnswered === false &&
          (props.Transaction.HomeInspectionVoided === null ||
            props.Transaction.Pool === null ||
            props.Transaction.Address === null ||
            props.Transaction.ClosingDate === null ||
            props.Transaction.Floors === null ||
            props.Transaction.SquareFt === null) ? (
            <div
              className="assist-accordion-section-heading-group"
              style={{ marginBottom: 34, marginTop: 10 }}
            >
              <h1>Questions</h1>
              <span className="assist-accordion-section-status">
                Answer the questions as soon as you can
              </span>

              <div style={{ marginLeft: 10 }}>
                <ReallosButton
                  primary
                  onClick={() => setQuestionModalVisibile(true)}
                  className="add-task-button"
                >
                  Let's Start
                </ReallosButton>
              </div>
            </div>
          ) : null}
          <div className="assist-accordion-section-heading-group">
            <h1>Tasks</h1>
            <span className="assist-accordion-section-status">
              {props.stepObj.Tasks.filter((task) => task.Completed).length} of{" "}
              {props.stepObj.Tasks.length} completed
            </span>

            <div style={{ marginLeft: 10 }}>
              <ReallosButton
                primary
                className="add-task-button"
                onClick={() => setSideDrawerVisible(true)}
              >
                Add New Task
              </ReallosButton>
            </div>
          </div>
          <div className="assist-task-list-root" style={{ marginTop: 10 }}>
            {props.stepObj.Tasks.slice(
              0,
              entireTasksListVisible ? props.stepObj.Tasks.length : 3
            ).map((task) => {
              let dateObj = null;
              try {
                dateObj = dateToString(task.date.toDate());
              } catch {
                dateObj = dateToString(task.date);
              }
              return (
                <ListItem
                  className={[
                    "assist-task-list-item",
                    task.completed ? "assist-task-completed" : "",
                  ].join(" ")}
                >
                  <ListItemIcon className="assist-task-list-item-icon">
                    {task.completed ? (
                      <div style={{ color: "#0dd663" }}>
                        <CheckIcon size={20} />
                      </div>
                    ) : (
                      <div style={{ color: "#969696" }}>
                        <DotFillIcon />
                      </div>
                    )}
                  </ListItemIcon>

                  <ListItemText>
                    <span className="assist-task-list-item-date">
                      {dateObj}
                    </span>
                    <span className="assist-task-list-item-label">
                      {task.title}
                    </span>
                  </ListItemText>
                </ListItem>
              );
            })}
          </div>

          {props.stepObj.Tasks.length > 3 && (
            <button
              className="assist-task-list-toggle-show link"
              onClick={() => setEntireTasksListVisible(!entireTasksListVisible)}
            >
              {entireTasksListVisible ? "Show less" : "Show more"}
            </button>
          )}
        </div>

        {props.stepObj.Documents.length !== 0 && ( // If there are documents present to be displayed
          <div className="assist-accordion-section-root">
            <div className="assist-accordion-section-heading-group">
              <h1>Documents</h1>
              <span className="assist-accordion-section-status">
                {
                  props.stepObj.Documents.filter((docItem) => docItem.filled)
                    .length
                }{" "}
                of {props.stepObj.Documents.length} completed
              </span>
            </div>

            <Grid container spacing={1} className="assist-doc-grid-root">
              {props.stepObj.Documents.map((doc) => {
                return (
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={4}
                    lg={3}
                    className="assist-doc-grid-item-root"
                  >
                    <NavLink
                      to={{
                        pathname: `/transactions/${props.tid}/documents/${doc.title}`,
                        state: doc,
                      }}
                      className="assist-doc-grid-item link-basic"
                    >
                      <div className="assist-doc-grid-item-icon">
                        <img src={doc.filled ? DocIcon : DocGrayscaleIcon} />
                      </div>

                      <div className="assist-doc-grid-item-text-wrapper">
                        <div className="assist-doc-grid-item-heading">
                          {doc.title}
                        </div>
                        <div className="assist-doc-grid-item-subheading">
                          {doc.filled
                            ? "Document is filled in"
                            : "Document yet to be filled"}
                        </div>
                      </div>
                    </NavLink>
                  </Grid>
                );
              })}
            </Grid>
          </div>
        )}
      </AssistAccordion>
      {displaySideDrawer()}
      {displayQuestionModal()}
      <Snackbar
        open={showErrors}
        autoHideDuration={6000}
        onClose={() => setShowErrors(false)}
      >
        <Alert
          onClose={() => setShowErrors(false)}
          severity="warning"
          variant="filled"
        >
          {errorText}
        </Alert>
      </Snackbar>
    </>
  );
}

export default connect(null, mapActionToProps)(AssistComponent);
