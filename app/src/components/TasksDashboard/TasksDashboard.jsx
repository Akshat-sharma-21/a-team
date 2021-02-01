import { withStyles } from "@material-ui/core/styles";
import DocActiveLogo from "../../assets/doc_logo_active.png";
import { Scaffold } from "../utilities/core";
import "./TasksDashboard.css";
import {
  CheckCircleIcon,
  QuestionIcon,
  ListUnorderedIcon,
  ArrowLeftIcon,
} from "@primer/octicons-react";
import {
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  ListItemSecondaryAction,
  IconButton,
} from "@material-ui/core";

const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 10,
    borderRadius: 5,
  },
  colorPrimary: {
    backgroundColor:
      theme.palette.grey[theme.palette.type === "light" ? 200 : 700],
  },
  bar: {
    borderRadius: 5,
    backgroundColor: "#1a90ff",
  },
}))(LinearProgress);

function TasksDashboard() {
  let documents = [
    {
      title: "Tax Returns",
      description: "Lorum Ipsum fit amet",
    },
    {
      title: "ID",
      description: "Lorum Ipsum fit amet",
    },
    {
      title: "Income & Employment",
      description: "Lorum Ipsum fit amet",
    },
  ];

  let tasks = [
    {
      title: "Tax Returns",
      description: "Lorum Ipsum fit amet",
    },
  ];

  return (
    <Scaffold>
      <IconButton>
        <ArrowLeftIcon size={22} />
      </IconButton>
      <h1>Pre-approval</h1>
      <div>
        <BorderLinearProgress variant="determinate" value="50" />
      </div>

      <div className="tasks-dashboard-tasks-completed">
        <CheckCircleIcon />
        &nbsp; 2 / 5 Tasks Completed
      </div>
      <h3>Documents</h3>
      <List className="tasks-dashboard-list">
        {documents.map((doc) => (
          <ListItem className="tasks-dashboard-list-item">
            <ListItemAvatar>
              <img src={DocActiveLogo} />
            </ListItemAvatar>
            <ListItemText primary={doc.title} secondary={doc.description} />
            <ListItemSecondaryAction>
              <IconButton>
                <QuestionIcon size={20} />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>

      <h3>Tasks</h3>
      <List className="tasks-dashboard-list">
        {tasks.map((task) => (
          <ListItem className="tasks-dashboard-list-item">
            <ListItemAvatar>
              <ListUnorderedIcon size={20} />
            </ListItemAvatar>
            <ListItemText primary={task.title} secondary={task.description} />
          </ListItem>
        ))}
      </List>
    </Scaffold>
  );
}

export default TasksDashboard;
