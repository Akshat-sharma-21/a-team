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

/**
 * Implements Pre-approval tasks, documents, etc.
 * to be displayed in transaction assist
 */
class AssistPreApproval extends React.Component {
  constructor() {
    super();

    this.state = {
      isAddTaskDrawerVisible: false,
      isEntireTaskListVisible: false,
      taskList: [
        { name: "Task 1", date: "10 July", completed: true },
        { name: "Task 2", date: "11 July", completed: true },
        { name: "Task 3", date: "12 July", completed: false },
        { name: "Task 4", date: "13 July", completed: false },
        { name: "Task 5", date: "14 July", completed: false },
        { name: "Task 6", date: "15 July", completed: false },
        { name: "Task 7", date: "16 July", completed: false },
      ],
      documentsList: [
        { name: "Document 1", isFilled: true, link: "#" },
        { name: "Document 2", isFilled: true, link: "#" },
        { name: "Document 3", isFilled: false, link: "#" },
        { name: "Document 4", isFilled: false, link: "#" },
        { name: "Document 5", isFilled: false, link: "#" },
        { name: "Document 6", isFilled: true, link: "#" },
      ],
    };
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
    });
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
          title="Pre-approval"
          itemIndex={0}
        >
          {/* TASK LIST */}
          <div className="assist-accordion-section-root">
            <div className="assist-accordion-section-heading-group">
              <h1>Tasks</h1>
              <span className="assist-accordion-section-status">
                {
                  this.state.taskList.filter((taskItem) => taskItem.completed)
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
                          {task.date}
                        </span>
                        <span className="assist-task-list-item-label">
                          {task.name}
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
                  this.state.documentsList.filter((docItem) => docItem.isFilled)
                    .length
                }{" "}
                of {this.state.documentsList.length} completed
              </span>
            </div>

            <Grid container spacing={1} className="assist-doc-grid-root">
              {this.state.documentsList.map((doc) => {
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
                      href={doc.link}
                    >
                      <div className="assist-doc-grid-item-icon">
                        <img
                          src={doc.isFilled ? DocIcon : DocGrayscaleIcon}
                          alt=""
                        />
                      </div>

                      <div className="assist-doc-grid-item-text-wrapper">
                        <div className="assist-doc-grid-item-heading">
                          {doc.name}
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
                <TextField fullWidth variant="outlined" label="Title" />
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
                />
              </div>
            </FormGroup>

            <FormGroup row className="assist-add-task-drawer-form-field-group">
              <CalendarIcon size={25} className="tag-icon" />
              <div>
                <TextField fullWidth variant="outlined" label="Date" />
              </div>
            </FormGroup>

            <FormGroup row className="assist-add-task-drawer-form-field-group">
              <IssueOpenedIcon size={25} className="tag-icon" />
              <div>
                <TextField fullWidth variant="outlined" label="Priority" />
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

            <ReallosButton cta fullWidth primary>
              Add Task
            </ReallosButton>
          </div>
        </SideDrawer>
      </>
    );
  }
}

export default AssistPreApproval;
