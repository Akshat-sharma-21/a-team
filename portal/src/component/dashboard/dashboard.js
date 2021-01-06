import { useState } from "react";
import Modal from "../utilities/modal/modal";
import TransactionCard from "./transactionCard";
import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  TextField,
} from "@material-ui/core";
import Navbar from "../navbar/navbar";
import "./dashboard.css";
import dashboardImg from "../../assets/dashboard-empty.png";
import { PlusIcon, MailIcon } from "@primer/octicons-react";

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
        modalHeight={500}
      >
        <Grid container direction="column" alignItems="flex-start">
          <Grid item>
            <Typography className="invite-heading">Send Invitation</Typography>
          </Grid>
          <Grid item>
            <Typography className="invite-text">
              Invite your client using their Email or their Phone No.
            </Typography>
          </Grid>
          <Grid item style={{ marginTop: 60, marginLeft: 40 }}>
            <Typography className="invite-input-text">
              Enter the email of the recipient in order to send an invite link
              to them
            </Typography>
          </Grid>
          <Grid item>
            <Grid
              container
              direction="row"
              alignItems="flex-end"
              style={{ marginTop: 10 }}
            >
              <Grid item>
                <MailIcon size={25} />
              </Grid>
              <Grid item>
                <TextField label="Email" variant="outlined" />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Modal>
    );
  }

  if (true) {
    // from the database
    return (
      <Container>
        <Navbar />
        {inviteModal()}
        <Grid container direction="column">
          <Grid item></Grid>
          <Grid item>
            <Grid container alignItems="flex-start">
              <Box
                className="dashboard-heading"
                paddingTop={10}
                paddingLeft={3}
              >
                {" "}
                My Transactions
              </Box>
            </Grid>
          </Grid>
          <Grid item>
            <Grid container alignItems="center" justify="center">
              <img src={dashboardImg} alt="" className="dashboard-img" />
            </Grid>
          </Grid>
          <Grid item>
            <Box className="dashboard-heading" paddingTop={4}>
              Feels Empty here...
            </Box>
          </Grid>
          <Grid item>
            <Box className="dashbaord-text" paddingTop={1.5}>
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
      </Container>
    );
  } else {
    return <TransactionCard />;
  }
}

export default Dashboard;
