import { useState, useEffect } from "react";
import TransactionCard from "./TransactionCard";
import dashboardImg from "../../assets/dashboard-empty.png";
import Skeleton from "@material-ui/lab/Skeleton";
import "./Dashboard.css";

import {
  ReallosModal,
  ReallosButton,
  Scaffold,
  SearchBar,
  ReallosPageHeader,
  ReallosFab,
} from "../utilities/core";

import { Box, Grid, Typography, TextField } from "@material-ui/core";

import {
  PlusIcon,
  MailIcon,
  DeviceMobileIcon,
  InfoIcon,
  PaperAirplaneIcon,
  SearchIcon,
} from "@primer/octicons-react";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchUser } from "../../actions/userActions";

const mapStateToProps = (state) => ({
  user: state.user,
  utils: state.utils,
  transaction: state.transaction,
});

const mapActionsToProps = (dispatch) => {
  return bindActionCreators({ fetchUser }, dispatch);
};

function Dashboard(props) {
  let [isInvitationModalVisible, setInvitationModalVisiblity] = useState(false);
  let [filteredList, setFilteredList] = useState(null);
  let [invitationEmail, setInvitationEmail] = useState("");
  let [invitationPhone, setInvitationPhone] = useState("");

  console.log(props.transaction);
  useEffect(() => {
    if (props.utils.reload === true) {
      // if the page was reloaded
      props.fetchUser(); // calling a function to fetch the user
    }
  }, []);
  /**
   * Opens Invitation Modal
   */
  const showInvitationModal = () => {
    setInvitationModalVisiblity(true);
  };

  /**
   * Hides Invitation Modal
   */
  const closeInvitation = () => {
    setInvitationModalVisiblity(false);
  };

  /**
   * Renders Invitation Modal
   */
  const InvitationModal = () => {
    return (
      <ReallosModal
        visible={isInvitationModalVisible}
        title="Send Invitation"
        dismissCallback={closeInvitation}
        modalWidth={780}
      >
        <Grid container direction="column">
          <Grid item>
            <div style={{ marginTop: -10 }}>
              Invite your client using their email or their phone number.
            </div>
          </Grid>
          <Grid item style={{ marginTop: 35, marginLeft: 50 }}>
            <Typography className="dashboard-invite-input-helper-text">
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
                  value={invitationEmail}
                  label="Email"
                  variant="outlined"
                  type="email"
                  onChange={(event) => setInvitationEmail(event.target.value)}
                  style={{ width: 650, marginLeft: 20 }}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid
            className="dashboard-invite-or-divider"
            item
            style={{ marginTop: 20 }}
          >
            <div>OR</div>
          </Grid>

          <Grid item style={{ marginLeft: 50, marginTop: 20 }}>
            <Typography className="dashboard-invite-input-helper-text">
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
                  value={invitationPhone}
                  label="Phone"
                  variant="outlined"
                  type="tel"
                  onChange={(event) => setInvitationPhone(event.target.value)}
                  style={{ width: 650, marginLeft: 20 }}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item style={{ marginTop: 30 }}>
            <Grid container direction="row" spacing={3}>
              <Grid item style={{ marginLeft: 5 }}>
                <InfoIcon className="dashboard-invite-info-icon" size={20} />
              </Grid>
              <Grid item>
                <Typography className="dashboard-invite-info-text">
                  {invitationEmail && invitationPhone
                    ? "The user will be invited though e-mail and SMS."
                    : invitationEmail
                    ? "The user will be invited though e-mail."
                    : invitationPhone
                    ? "The user will be invited though SMS."
                    : "Enter e-mail or phone number or both to invite."}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item style={{ marginTop: 30 }}>
            <Grid container direction="row" justify="flex-end" spacing={1}>
              <Grid item>
                <ReallosButton onClick={closeInvitation}>Cancel</ReallosButton>
              </Grid>
              <Grid item>
                <ReallosButton
                  primary
                  disabled={!invitationEmail && !invitationPhone}
                >
                  Send Invite
                  <PaperAirplaneIcon className="dashboard-invite-send-icon" />
                </ReallosButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </ReallosModal>
    );
  };

  /**
   * Renders primary content.
   */
  const PrimaryContent = () => {
    if (props.utils.loading === true) {
      // Loading - Fetching transactions
      return (
        <Grid container spacing={2}>
          {Array(6)
            .fill(0)
            .map(() => (
              <Grid item xs={12} sm={6} md={6} lg={4}>
                <Skeleton
                  animation="wave"
                  variant="rect"
                  height={280}
                  style={{ borderRadius: 10 }}
                />
              </Grid>
            ))}
        </Grid>
      );
    } else if (props.transaction.length === 0) {
      // No transactions created

      return (
        <div className="zoom-in-animation">
          <Grid item>
            <Grid container alignItems="center" justify="center">
              <img src={dashboardImg} alt="" className="dashboard-img" />
            </Grid>
          </Grid>
          <Grid item style={{ textAlign: "center" }}>
            <Box
              component="h1"
              fontFamily="Gilroy"
              marginTop={5}
              marginBottom={0}
            >
              Feels empty here...
            </Box>
          </Grid>
          <Grid item style={{ textAlign: "center" }}>
            <Box
              fontSize={18}
              paddingTop={1.5}
              paddingBottom={1}
              margin={"auto"}
              width="50ch"
            >
              Sit tight and get your Game Face ready.
              <strong> Reallos </strong>
              will send leads your way very soon!
            </Box>
          </Grid>
        </div>
      );
    } else if (filteredList.length === 0) {
      // If no search results

      return (
        <Grid
          container
          direction="column"
          alignItems="center"
          justify="center"
          spacing={2}
          className="zoom-in-animation"
        >
          <Grid
            item
            style={{
              paddingTop: 50,
              paddingBottom: 60,
              opacity: 0.5,
            }}
          >
            <SearchIcon size={150} />
          </Grid>
          <Grid item>
            <Box marginTop={-3} marginLeft={4}>
              <Typography className="document-heading reallos-text">
                No results found
              </Typography>
            </Box>
          </Grid>
          <Grid item>
            <Box marginTop={-1} marginLeft={4}>
              <Typography className="document-subheading reallos-text">
                The entered search term did not match any transactions
              </Typography>
            </Box>
          </Grid>
        </Grid>
      );
    } else {
      // Render transactions as cards

      return (
        <Grid container spacing={2} className="transaction-list">
          {filteredList.map((transaction) => (
            <TransactionCard
              key={transaction.id}
              transactionDetails={transaction}
            />
          ))}
        </Grid>
      );
    }
  };
  return (
    <Scaffold navBar>
      <Grid container direction="column">
        <div
          style={{
            background: "#eeeeee",
            position: "sticky",
            top: 84,
            zIndex: 120,
          }}
        >
          <ReallosPageHeader pageName="My Transactions" />

          <div
            style={{
              paddingBottom: props.transaction?.length !== 0 ? 20 : 0,
              paddingTop: props.transaction?.length !== 0 ? 20 : 0,
            }}
          >
            {props.transaction === null ? (
              <Skeleton
                animation="wave"
                variant="rect"
                height={56}
                style={{ borderRadius: 10 }}
              />
            ) : (
              props.transaction.length !== 0 && (
                <SearchBar
                  placeholder="Search by transaction name, buyer, stage or address"
                  list={props.transaction}
                  filterByFields={["Name", "Buyer", "Stage.Step", "Address"]}
                  onUpdate={(filteredTransactionList) => {
                    setFilteredList(filteredTransactionList);
                  }}
                />
              )
            )}
          </div>
        </div>

        {PrimaryContent()}
        {InvitationModal()}

        {props.transaction.length !== 0 && (
          <ReallosFab
            title="New Transaction"
            LeadingIcon={<PlusIcon size={20} />}
            onClick={() => showInvitationModal()}
          />
        )}
      </Grid>
    </Scaffold>
  );
}

export default connect(mapStateToProps, mapActionsToProps)(Dashboard);
