import { withStyles } from "@material-ui/core/styles";
import DocLogo from "../../assets/doc_logo.svg";
import ProfilePic from "../../assets/postmalone.jpg";
import { ModalSheet, Scaffold } from "../utilities/core";
import "./PreApprovalDashboard.css";
import {
  CheckCircleIcon,
  QuestionIcon,
  ListUnorderedIcon,
  ArrowLeftIcon,
  MailIcon,
  DeviceMobileIcon,
  ChevronRightIcon,
} from "@primer/octicons-react";
import {
  LinearProgress,
  List,
  ListItem,
  IconButton,
  Grid,
  Avatar,
  Button,
} from "@material-ui/core";
import { useState } from "react";

const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 5,
    borderRadius: 5,
  },
  colorPrimary: {
    backgroundColor:
      theme.palette.grey[theme.palette.type === "light" ? 300 : 400],
  },
  bar: {
    borderRadius: 5,
    backgroundColor: "#2B44FF",
  },
}))(LinearProgress);

function PreApproval() {
  const [isModalOpen, toggleModal] = useState(false);

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
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid item xs={12} style={{ textAlign: "left" }}>
          <IconButton size="small" style={{ margin: "20px 0" }}>
            <ArrowLeftIcon size={32} className="preapproval-back-icon" />
          </IconButton>
        </Grid>

        <Grid item xs={12} style={{ textAlign: "left" }}>
          <div className="preapproval-heading">Pre-approval</div>
        </Grid>

        <Grid item xs={12} style={{ marginBottom: "15px" }}>
          <BorderLinearProgress variant="determinate" value="50" />
        </Grid>

        <Grid item xs={1}>
          <CheckCircleIcon style={{ color: "#707070" }} />
        </Grid>

        <Grid item xs={11} style={{ textAlign: "left" }}>
          <div className="preapproval-subtext">2 / 5 Tasks Completed</div>
        </Grid>

        <Grid item xs={12} style={{ height: "35px" }}></Grid>

        <Grid item xs={12} style={{ textAlign: "left", marginTop: "5px" }}>
          <div className="preapproval-subheading">Lender</div>
        </Grid>

        <Grid item xs={12} style={{ textAlign: "center" }}>
          <List className="preapproval-list">
            <ListItem className="preapproval-lender-list">
              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
              >
                <Grid item xs={1} style={{ textAlign: "center" }}>
                  <Avatar
                    variant="circle"
                    style={{ backgroundColor: "#2B44FF", marginBottom: "10px" }}
                  />
                </Grid>
                <Grid item xs={1}></Grid>
                <Grid item xs={9} container style={{ paddingLeft: "15px" }}>
                  <Grid item xs={12} style={{ textAlign: "left" }}>
                    <div className="lender-list-title">Lender</div>
                  </Grid>
                  <Grid item xs={12} style={{ textAlign: "left" }}>
                    <div className="doc-list-subtext2">
                      You haven't yet selected a lender. Please select one to
                      move forward
                    </div>
                  </Grid>
                </Grid>
                <Grid item xs={1}></Grid>

                <Grid item xs={12} style={{ height: "20px" }}></Grid>

                <Grid item xs={5}></Grid>
                <Grid item xs={7}>
                  <Button className="lender-btn">
                    View all Offers <ChevronRightIcon size={16} />
                  </Button>
                </Grid>
              </Grid>
            </ListItem>
          </List>
        </Grid>

        <Grid item xs={12} style={{ textAlign: "center" }}>
          <List className="preapproval-list">
            <ListItem className="preapproval-lender-list">
              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
              >
                <Grid item xs={1} style={{ textAlign: "center" }}>
                  <Avatar variant="circle" src={ProfilePic} />
                </Grid>
                <Grid item xs={1}></Grid>
                <Grid item xs={9} container style={{ paddingLeft: "15px" }}>
                  <Grid item xs={12} style={{ textAlign: "left" }}>
                    <div className="lender-list-title">John Smith</div>
                  </Grid>
                  <Grid item xs={12} style={{ textAlign: "left" }}>
                    <div className="doc-list-subtext">Bank of America</div>
                  </Grid>
                </Grid>
                <Grid item xs={1}></Grid>

                <Grid item xs={12} style={{ height: "20px" }}></Grid>

                <Grid item xs={2}></Grid>
                <Grid item xs={1}></Grid>
                <Grid item xs={9} container>
                  <Grid item xs={12} style={{ textAlign: "left" }}>
                    <div className="doc-list-subtext">
                      <MailIcon size={16} /> &nbsp;&nbsp; john.smith@gmail.com
                    </div>
                  </Grid>
                  <Grid item xs={12} style={{ textAlign: "left" }}>
                    <div className="doc-list-subtext">
                      <DeviceMobileIcon size={16} />
                      &nbsp;&nbsp; +1 99999 99999
                    </div>
                  </Grid>
                </Grid>
              </Grid>
            </ListItem>
          </List>
        </Grid>

        <Grid item xs={12} style={{ textAlign: "left", marginTop: "5px" }}>
          <div className="preapproval-subheading">Documents</div>
        </Grid>

        <Grid item xs={12} style={{ textAlign: "center" }}>
          <List className="preapproval-list">
            {documents.map((doc) => (
              <ListItem className="preapproval-list-item">
                <Grid
                  container
                  direction="row"
                  justify="center"
                  alignItems="center"
                >
                  <Grid item xs={1} style={{ textAlign: "center" }}>
                    <Avatar
                      variant="rounded"
                      style={{ backgroundColor: "#00000000" }}
                    >
                      <img src={DocLogo} />
                    </Avatar>
                  </Grid>
                  <Grid item xs={1}></Grid>
                  <Grid item xs={9} container style={{ paddingLeft: "15px" }}>
                    <Grid item xs={12} style={{ textAlign: "left" }}>
                      <div className="doc-list-title1">{doc.title}</div>
                    </Grid>
                    <Grid item xs={12} style={{ textAlign: "left" }}>
                      <div className="doc-list-subtext">{doc.description}</div>
                    </Grid>
                  </Grid>
                  <Grid item xs={1}>
                    <IconButton>
                      <QuestionIcon size={18} style={{ color: "#707070" }} />
                    </IconButton>
                  </Grid>
                </Grid>
              </ListItem>
            ))}
          </List>
        </Grid>

        <Grid item xs={12} style={{ textAlign: "left", marginTop: "5px" }}>
          <div className="preapproval-subheading">Tasks</div>
        </Grid>

        <Grid item xs={12} style={{ textAlign: "center" }}>
          <List className="preapproval-list">
            {tasks.map((task) => (
              <ListItem className="preapproval-list-item">
                <Grid
                  container
                  direction="row"
                  justify="center"
                  alignItems="center"
                >
                  <Grid item xs={2} style={{ textAlign: "center" }}>
                    <ListUnorderedIcon size={32} />
                  </Grid>
                  <Grid item xs={1}></Grid>
                  <Grid item xs={8} container>
                    <Grid item xs={12} style={{ textAlign: "left" }}>
                      <div className="doc-list-title1">{task.title}</div>
                    </Grid>
                    <Grid item xs={12} style={{ textAlign: "left" }}>
                      <div className="doc-list-subtext">{task.description}</div>
                    </Grid>
                  </Grid>
                  <Grid item xs={1}></Grid>
                </Grid>
              </ListItem>
            ))}
          </List>
        </Grid>
      </Grid>
      {/* 
      <ModalSheet
        isOpen={isModalOpen}
        onClose={toggleModal(isModalOpen, true)}
      ></ModalSheet> */}
    </Scaffold>
  );
}

export default PreApproval;
