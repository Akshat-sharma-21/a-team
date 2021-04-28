import React from "react";
import DocIcon from "../../assets/doc_icon.png";
import DocGrayscaleIcon from "../../assets/doc_icon_grayscale.png";
import AssistAccordion from "./AssistAccordion";
import { validateFormField } from "../../utils";
import { ReallosButton, ReallosModal, SideDrawer } from "../utilities/core";

import {
  CheckCircleIcon,
  CheckIcon,
  DotFillIcon,
  TagIcon,
  PencilIcon,
  CalendarIcon,
  IssueOpenedIcon,
  OrganizationIcon,
  ArrowRightIcon,
} from "@primer/octicons-react";

import {
  ListItem,
  ListItemIcon,
  ListItemText,
  Grid,
  FormGroup,
  TextField,
  Snackbar,
  LinearProgress,
} from "@material-ui/core";

import { Alert } from "@material-ui/lab";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { addFindHomeTask } from "../../actions/taskActions";

const mapActionToProps = (dispatch) => {
  return bindActionCreators(
    {
      addFindHomeTask,
    },
    dispatch
  );
};

/**
 * Implements Find Home tasks, documents, etc.
 * to be displayed in transaction assist
 */
class AssistFindHome extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isAddTaskDrawerVisible: false,
      isEntireTaskListVisible: false,

      isQuestionsModalVisible: false,
      quesNo: 1,

      taskList: this.props.list.Tasks,
      docList: this.props.list.Documents,

      taskTitle: "",
      taskDescription: "",
      taskDate: "",
      taskPriority: "",

      validated: false,
      showError: false,
    };
    this.addTask = this.addTask.bind(this);
    this.newList = {};
    this.titleError = {
      hasError: true,
      errorText: "Title cannot be empty",
    };
    this.descriptionError = {
      hasError: true,
      errorText: "Description cannot be empty",
    };
    this.dateError = {
      hasError: true,
      errorText: "Date cannot be empty",
    };
    this.priorityError = {
      hasError: true,
      errorText: "Priority cannot be empty",
    };
  }

  /**
   * Shows "Question" modal.
   */
  showQuestionsModal() {
    this.setState({
      isQuestionsModalVisible: true,
    });
  }

  /**
   * Hides "Question" modal.
   */
  hideQuestionsModal() {
    this.setState({
      isQuestionsModalVisible: false,
    });
  }

  /**
   * Shows "Add Task" drawer.
   */
  showAddTaskDrawer() {
    this.setState({
      isAddTaskDrawerVisible: true,
    });
  }

  /**
   * Hides "Add Task" drawer.
   */
  hideAddTaskDrawer() {
    this.setState({
      isAddTaskDrawerVisible: false,
      taskTitle: "",
      taskDescription: "",
      taskDate: "",
      taskPriority: "",
      validated: false,
      showError: false,
    });
  }

  handleChange = (event) => {
    event.preventDefault();

    switch (event.target.name) {
      case "title":
        this.setState({ taskTitle: event.target.value });
        this.titleError = validateFormField(
          event.target.value,
          event.target.name
        );
        break;

      case "description":
        this.setState({ taskDescription: event.target.value });
        this.descriptionError = validateFormField(
          event.target.value,
          event.target.name
        );
        break;

      case "date":
        this.setState({ taskDate: event.target.value });
        this.dateError = validateFormField(
          event.target.value,
          event.target.name
        );
        break;

      case "priority":
        this.setState({ taskPriority: event.target.value });
        this.priorityError = validateFormField(
          event.target.value,
          event.target.name
        );
        break;

      default:
        break;
    }
    if (
      !this.titleError.hasError &&
      !this.descriptionError.hasError &&
      !this.dateError.hasError &&
      !this.priorityError.hasError
    ) {
      this.setState({ validated: true });
    } else this.setState({ validated: false });
  };

  dateToString(date) {
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

  addTask() {
    if (this.state.validated) {
      let dateObj = new Date(this.state.taskDate);
      let newTask = {
        title: this.state.taskTitle,
        description: this.state.taskDescription,
        date: dateObj,
        priority: this.state.taskPriority,
        completed: false,
      };
      this.props.addFindHomeTask(this.props.list, newTask, this.props.tid);
      this.hideAddTaskDrawer();
    } else {
      this.setState({ showError: true });
    }
  }

  render() {
    /**
     * Any tasks beyond the split point will
     * be hidden by default. User will have to
     * explicitly click on "Show More" to show
     * complete list of tasks.
     *
     * @type {number}
     */
    const taskListSplitPoint = 5;

    return (
      <>
        <AssistAccordion
          isStepComplete={false}
          AccordionStepIcon={<CheckCircleIcon size={23} />}
          title="Find a Home"
          itemIndex={0}
        >
          {/* TASK LIST */}
          <div className="assist-accordion-section-root">
            <div className="assist-accordion-section-heading-group">
              <h1>Questions</h1>
              <span className="assist-accordion-section-status">
                Answer the questions as soon as you can
              </span>

              <div style={{ marginLeft: 10 }}>
                <ReallosButton
                  primary
                  onClick={() => this.showQuestionsModal()}
                  className="add-task-button"
                >
                  Let's Start
                </ReallosButton>
              </div>
            </div>

            <div
              className="assist-accordion-section-heading-group"
              style={{ marginTop: 34 }}
            >
              <h1>Tasks</h1>
              <span className="assist-accordion-section-status">
                {
                  this.state.taskList.filter((taskItem) => taskItem.Completed)
                    .length
                }{" "}
                of {this.state.taskList.length} completed
              </span>

              <div style={{ marginLeft: 10 }}>
                <ReallosButton
                  primary
                  onClick={() => this.showAddTaskDrawer()}
                  className="add-task-button"
                >
                  Add New Task
                </ReallosButton>
              </div>
            </div>

            <div className="assist-task-list-root" style={{ marginTop: 10 }}>
              {this.state.taskList
                .slice(
                  0,
                  this.state.isEntireTaskListVisible
                    ? this.state.taskList.length
                    : taskListSplitPoint
                )
                .map((task) => {
                  let dateString = this.dateToString(task.date.toDate());
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
                          {dateString}
                        </span>
                        <span className="assist-task-list-item-label">
                          {task.title}
                        </span>
                      </ListItemText>
                    </ListItem>
                  );
                })}
            </div>

            {this.state.taskList.length > taskListSplitPoint && (
              <button
                className="assist-task-list-toggle-show link"
                onClick={() =>
                  this.setState((state) => ({
                    isEntireTaskListVisible: !state.isEntireTaskListVisible,
                  }))
                }
              >
                {this.state.isEntireTaskListVisible ? "Show less" : "Show more"}
              </button>
            )}
          </div>

          {/* DOCUMENTS GRID */}
          <div className="assist-accordion-section-root">
            <div className="assist-accordion-section-heading-group">
              <h1>Documents</h1>
              <span className="assist-accordion-section-status">
                {
                  this.state.docList.filter((docItem) => docItem.isFilled)
                    .length
                }{" "}
                of {this.state.docList.length} completed
              </span>
            </div>

            <Grid container spacing={1} className="assist-doc-grid-root">
              {this.state.docList.map((doc) => {
                return (
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={4}
                    lg={3}
                    className="assist-doc-grid-item-root"
                  >
                    <a
                      className="assist-doc-grid-item link-basic"
                      href={doc.Link}
                    >
                      <div className="assist-doc-grid-item-icon">
                        <img
                          src={doc.isFilled ? DocIcon : DocGrayscaleIcon}
                          alt=""
                        />
                      </div>

                      <div className="assist-doc-grid-item-text-wrapper">
                        <div className="assist-doc-grid-item-heading">
                          {doc.Name}
                        </div>
                        <div className="assist-doc-grid-item-subheading">
                          {doc.isFilled
                            ? "Document is filled in"
                            : "Document yet to be filled"}
                        </div>
                      </div>
                    </a>
                  </Grid>
                );
              })}
            </Grid>
          </div>
        </AssistAccordion>

        {/* ADD TASK MODAL */}
        <SideDrawer
          visible={this.state.isAddTaskDrawerVisible}
          dismissCallback={() => this.hideAddTaskDrawer()}
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
                  value={this.state.taskTitle}
                  onChange={this.handleChange}
                  error={this.state.showError && this.titleError.hasError}
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
                  value={this.state.taskDescription}
                  onChange={this.handleChange}
                  error={this.state.showError && this.descriptionError.hasError}
                />
              </div>
            </FormGroup>

            <FormGroup row className="assist-add-task-drawer-form-field-group">
              <CalendarIcon size={25} className="tag-icon" />
              <div>
                <TextField
                  fullWidth
                  variant="outlined"
                  label="Date"
                  type="date"
                  name="date"
                  value={this.state.taskDate}
                  onChange={this.handleChange}
                  error={this.state.showError && this.dateError.hasError}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </div>
            </FormGroup>

            <FormGroup row className="assist-add-task-drawer-form-field-group">
              <IssueOpenedIcon size={25} className="tag-icon" />
              <div>
                <TextField
                  fullWidth
                  variant="outlined"
                  label="Priority"
                  type="number"
                  name="priority"
                  value={this.state.taskPriority}
                  onChange={this.handleChange}
                  error={this.state.showError && this.priorityError.hasError}
                />
              </div>
            </FormGroup>
          </div>

          <div className="assist-add-task-drawer-footer">
            <ReallosButton
              cta
              fullWidth
              onClick={() => this.hideAddTaskDrawer()}
            >
              Back
            </ReallosButton>

            <ReallosButton cta fullWidth primary onClick={this.addTask}>
              Add Task
            </ReallosButton>
          </div>
        </SideDrawer>

        {/* QUESTIONS MODAL */}
        <ReallosModal
          visible={this.state.isQuestionsModalVisible}
          dismissCallback={() => this.hideQuestionsModal()}
          modalWidth={800}
          className="assist-question-modal"
        >
          <div style={{ height: "20px" }}></div>
          <LinearProgress
            variant="determinate"
            value={this.state.quesNo * (100 / 7)}
            className="assist-question-modal-progress"
          />
          <div className="assist-question-modal-heading">
            Questions
            <span className="assist-question-modal-subheading-dot">
              <DotFillIcon />
            </span>
            <span className="assist-question-modal-subheading">
              {this.state.quesNo} out of 7
            </span>
          </div>

          <div style={{ height: "20px" }}></div>
          <div className="assist-question-modal-question">
            What is the Address of the house?
          </div>
          <div className="assist-question-modal-answer">
            <OrganizationIcon size={40} />
            &nbsp;&nbsp;&nbsp;&nbsp;
            <TextField
              multiline
              rows={3}
              fullWidth
              label="Address"
              variant="outlined"
            />
          </div>
          <div style={{ height: "50px" }}></div>
          <Grid container direction="row" justify="flex-end" spacing={3}>
            <Grid item xs={3}>
              <ReallosButton
                fullWidth
                secondary
                className="assist-question-modal-btn"
              >
                Back
              </ReallosButton>
            </Grid>
            <Grid item xs={3}>
              <ReallosButton
                fullWidth
                primary
                className="assist-question-modal-btn"
              >
                Next&nbsp;
                <ArrowRightIcon size={20} />
              </ReallosButton>
            </Grid>
          </Grid>
        </ReallosModal>

        {/* ERROR ALERTS */}
        <Snackbar
          open={this.state.showError}
          autoHideDuration={6000}
          onClose={() => this.setState({ showError: false })}
        >
          <Alert
            onClose={() => this.setState({ showError: false })}
            severity="warning"
            variant="filled"
          >
            {/* {this.titleError.hasError
              ? this.titleError.errorText
              : this.descriptionError.hasError
              ? this.descriptionError.errorText
              : this.dateError.hasError
              ? this.dateError.errorText
              : "Fill all the details correctly"} */}
            Fill all the details correctly
          </Alert>
        </Snackbar>
      </>
    );
  }
}

export default connect(null, mapActionToProps)(AssistFindHome);
