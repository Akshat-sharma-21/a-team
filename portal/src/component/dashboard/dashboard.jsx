import { useState } from "react";
import "./dashboard.css";
import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  TextField,
  Divider,
} from "@material-ui/core";
import Modal from "../utilities/modal/modal";
import TransactionCard from "./transactionCard";
import Navbar from "../navbar/navbar";
import ReallosButton from "../utilities/reallos_button/ReallosButton";
import dashboardImg from "../../assets/dashboard-empty.png";
import {
  PlusIcon,
  MailIcon,
  DeviceMobileIcon,
  InfoIcon,
  PaperAirplaneIcon,
} from "@primer/octicons-react";
import Scaffold from "../utilities/scaffold/Scaffold";

function Dashboard(props) {
  const [invite, setInvitation] = useState(false);

  function openInvitation() {
    // function to open the invitation modal
    setInvitation(true);
  }

  function closeInvitation() {
    // function to close the invitation modal
    setInvitation(false);
  }

  function inviteModal() {
    // function to display the invitation modal
    return (
      <Modal
        visible={invite ? true : false}
        dismissCallback={closeInvitation}
        modalWidth={780}
        modalHeight={550}
      >
        <Grid container direction="column">
          <Grid item>
            <Typography className="invite-heading">Send Invitation</Typography>
          </Grid>
          <Grid item>
            <Typography className="invite-text">
              Invite your client using their Email or their Phone No.
            </Typography>
          </Grid>
          <Grid item style={{ marginTop: 50, marginLeft: 50 }}>
            <Typography className="invite-input-text">
              Enter the email of the recipient in order to send an invite link
              to them
            </Typography>
          </Grid>
          <Grid item>
            <Grid
              container
              direction="row"
              alignItems="center"
              justify="center"
              style={{ marginTop: 10 }}
            >
              <Grid item>
                <MailIcon size={30} />
              </Grid>
              <Grid item>
                <TextField
                  label="Email"
                  variant="outlined"
                  style={{ width: 650, marginLeft: 20 }}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item style={{ marginTop: 20 }}>
            <Grid
              container
              direction="row"
              alignItems="center"
              justify="center"
              spacing={2}
            >
              <Grid item>
                <Divider
                  style={{ width: 125, height: 2.5, background: "#707070" }}
                />
              </Grid>
              <Grid item>
                <Typography
                  style={{
                    fontFamily: "Gilroy",
                    fontSize: 18.5,
                    opacity: "60%",
                  }}
                >
                  OR
                </Typography>
              </Grid>
              <Grid item>
                <Divider
                  style={{
                    width: 125,
                    height: 2.5,
                    background: "#707070",
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item style={{ marginLeft: 50, marginTop: 20 }}>
            <Typography className="invite-input-text">
              Enter the cell number of the recipient in order to send them an
              invite
            </Typography>
          </Grid>
          <Grid item>
            <Grid
              container
              direction="row"
              alignItems="center"
              justify="center"
              style={{ marginTop: 10 }}
            >
              <Grid item>
                <DeviceMobileIcon size={30} />
              </Grid>
              <Grid item>
                <TextField
                  label="Phone"
                  variant="outlined"
                  style={{ width: 650, marginLeft: 20 }}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item style={{ marginTop: 20 }}>
            <Grid container direction="row" spacing={3}>
              <Grid item style={{ marginLeft: 10 }}>
                <InfoIcon className="invite-info-icon" size={20} />
              </Grid>
              <Grid item>
                <Typography className="invite-info-text">
                  The user will be invited though e-mail and SMS.
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item style={{ marginTop: 35 }}>
            <Grid container direction="row" justify="flex-end" spacing={2}>
              <Grid item>
                <ReallosButton>Cancel</ReallosButton>
              </Grid>
              <Grid item>
                <ReallosButton primary>
                  Send Invite &nbsp;&nbsp;
                  <PaperAirplaneIcon className="invite-send-icon" />
                </ReallosButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Modal>
    );
  } // first time modal done

  if (true) {
    // from the database
    return (
      <Scaffold navBar>
        {inviteModal()}
        <Grid container direction="column">
          <Grid item>
            <Grid container alignItems="flex-start">
              <Box
                className="dashboard-heading"
                paddingTop={6}
                paddingLeft={3}
                paddingBottom={3}
              >
                My Transactions
              </Box>
            </Grid>
          </Grid>
          <Grid item>
            <Grid container alignItems="center" justify="center">
              <img src={dashboardImg} alt="" className="dashboard-img" />
            </Grid>
          </Grid>
          <Grid item style={{ textAlign: "center" }}>
            <Box className="dashboard-heading" paddingTop={5}>
              Feels Empty here...
            </Box>
          </Grid>
          <Grid item style={{ textAlign: "center" }}>
            <Box className="dashbaord-text" paddingTop={1.5} paddingBottom={1}>
              Sit tight and get your Game Face Ready. <b>Reallos</b> will send
              <br />
              Leads your way very soon!
            </Box>
          </Grid>
          <Grid item>
            <Grid
              container
              direction="row"
              justify="flex-end"
              alignItems="center"
            >
              <Button
                variant="contained"
                startIcon={<PlusIcon size={20} />}
                className="dashboard-button"
                onClick={openInvitation}
              >
                New Transaction
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Scaffold>
    );
  } else {
    return <TransactionCard />;
  }
}

export default Dashboard;
