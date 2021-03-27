import React from "react";
import DocIcon from "../../assets/doc_icon.png";
import DocGrayscaleIcon from "../../assets/doc_icon_grayscale.png";
import AssistAccordion from "./AssistAccordion";
import { ReallosButton, SideDrawer } from "../utilities/core";

import {
  CheckCircleIcon,
  CheckIcon,
  DotFillIcon,
  TagIcon,
  PencilIcon,
  CalendarIcon,
  IssueOpenedIcon,
} from "@primer/octicons-react";

import {
  ListItem,
  ListItemIcon,
  ListItemText,
  Grid,
  FormGroup,
  TextField,
} from "@material-ui/core";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { addLoanApprovalTask } from "../../actions/taskActions";

const mapActionToProps = (dispatch) => {
  return bindActionCreators(
    {
      addLoanApprovalTask,
    },
    dispatch
  );
};

/**
 * Implements Loan-approval tasks, documents, etc.
 * to be displayed in transaction assist
 */
class AssistLoanApproval extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isAddTaskDrawerVisible: false,
      isEntireTaskListVisible: false,

      taskList: this.props.list.Tasks,
      docList: this.props.list.Documents,

      taskTitle: "",
      taskDescription: "",
      taskDate: "",
      taskPriority: "",
    };
    this.addTask = this.addTask.bind(this);
    this.newList = {};
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
    });
  }

  handleChange = (event) => {
    event.preventDefault();
    switch (event.target.name) {
      case "taskTitle":
        this.setState({ taskTitle: event.target.value });
        break;

      case "taskDescription":
        this.setState({ taskDescription: event.target.value });
        break;

      case "taskDate":
        this.setState({ taskDate: event.target.value });
        break;

      case "taskPriority":
        this.setState({ taskPriority: event.target.value });
        break;

      default:
        break;
    }
  };

  dateToString(date) {
    let dateObj = new Date(date);
    const months = [
      "Jan",
      "Feb",
      "March",
      "Aril",
      "May",
      "June",
      "July",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return dateObj.getDate() + " " + months[dateObj.getMonth()];
  }

  addTask() {
    let dateString = this.dateToString(this.state.taskDate);
    let newTask = {
      Title: this.state.taskTitle,
      Decreption: this.state.taskDescription,
      Date: dateString,
      Priority: this.state.taskPriority,
      Completed: false,
    };
    this.props.addLoanApprovalTask(this.props.list, newTask, this.props.tid);
    this.hideAddTaskDrawer();
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
          title="Loan-Approval"
          itemIndex={0}
        >
          {/* TASK LIST */}
          <div className="assist-accordion-section-root">
            <div className="assist-accordion-section-heading-group">
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
                    ? this.state.taskList1.length
                    : taskListSplitPoint
                )
                .map((task) => {
                  return (
                    <ListItem
                      className={[
                        "assist-task-list-item",
                        task.Completed ? "assist-task-completed" : "",
                      ].join(" ")}
                    >
                      <ListItemIcon className="assist-task-list-item-icon">
                        {task.Completed ? (
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
                          {task.Date}
                        </span>
                        <span className="assist-task-list-item-label">
                          {task.Title}
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
                  name="taskTitle"
                  value={this.state.taskTitle}
                  onChange={this.handleChange}
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
                  name="taskDescription"
                  value={this.state.taskDescription}
                  onChange={this.handleChange}
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
                  name="taskDate"
                  value={this.state.taskDate}
                  onChange={this.handleChange}
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
                  type="text"
                  name="taskPriority"
                  value={this.state.taskPriority}
                  onChange={this.handleChange}
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
      </>
    );
  }
}

export default connect(null, mapActionToProps)(AssistLoanApproval);
