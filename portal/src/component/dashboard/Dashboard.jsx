import { useState } from "react";
import TransactionCard from "./TransactionCard";
import dashboardImg from "../../assets/dashboard-empty.png";
import "./Dashboard.css";
import {
  ReallosModal,
  ReallosButton,
  Scaffold,
  SearchBar,
} from "../utilities/core";

import {
  Box,
  Button,
  Grid,
  Typography,
  TextField,
  Divider,
  InputAdornment,
  OutlinedInput,
  FormControl,
  Fab,
} from "@material-ui/core";

import {
  PlusIcon,
  MailIcon,
  DeviceMobileIcon,
  InfoIcon,
  PaperAirplaneIcon,
  SearchIcon,
} from "@primer/octicons-react";

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
      <ReallosModal
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
                <ReallosButton onClick={closeInvitation}>Cancel</ReallosButton>
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
      </ReallosModal>
    );
  } // first time modal done

  if (false) {
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
    return (
      <Scaffold navBar>
        {inviteModal()}
        <Grid container direction="row" justify="center" alignItems="center">
          <Grid item xs={12}>
            <Grid container alignItems="flex-start">
              <Box
                className="dashboard-heading"
                paddingTop={5}
                paddingLeft={3}
                paddingBottom={2}
              >
                My Transactions
              </Box>
            </Grid>
          </Grid>

          <Grid item xs={12} style={{ paddingBottom: 18, paddingTop: 4 }}>
            <FormControl fullWidth variant="outlined">
              <OutlinedInput
                className="dashboard-search-bar"
                startAdornment={
                  <InputAdornment position="start">
                    <div
                      style={{
                        paddingRight: 10,
                        paddingLeft: 10,
                      }}
                    >
                      <SearchIcon className="dashboard-search-icon" size={18} />
                    </div>
                  </InputAdornment>
                }
                placeholder="Search"
              />
            </FormControl>
          </Grid>

          <Grid
            xs={12}
            className="transaction-list"
            container
            direction="row"
            justify="center"
            alignItems="center"
            spacing={2}
          >
            <Grid item xs={6}>
              <TransactionCard />
            </Grid>
            <Grid item xs={6}>
              <TransactionCard />
            </Grid>

            <Grid item xs={6}>
              <TransactionCard />
            </Grid>
            <Grid item xs={6}>
              <TransactionCard />
            </Grid>
          </Grid>
        </Grid>
        <Button
          variant="contained"
          startIcon={<PlusIcon size={20} />}
          className="dashboard-button"
          onClick={openInvitation}
        >
          New Transaction
        </Button>
      </Scaffold>
    );
  }
}

export default Dashboard;
