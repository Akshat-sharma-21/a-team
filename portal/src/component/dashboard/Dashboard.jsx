import { useState, useEffect } from "react";
import TransactionCard from "./TransactionCard";
import dashboardImg from "../../assets/dashboard-empty.png";
import Skeleton from '@material-ui/lab/Skeleton';
import "./Dashboard.css";

import {
  ReallosModal,
  ReallosButton,
  Scaffold,
  SearchBar,
  ReallosPageHeader,
  ReallosFab
} from "../utilities/core";

import {
  Box,
  Grid,
  Typography,
  TextField,
} from "@material-ui/core";

import {
  PlusIcon,
  MailIcon,
  DeviceMobileIcon,
  InfoIcon,
  PaperAirplaneIcon,
  SearchIcon
} from "@primer/octicons-react";


function Dashboard(props) {
  let [isInvitationModalVisible, setInvitationModalVisiblity] = useState(false);
  let [transactionList, setTransactionList] = useState(null);
  let [filteredList, setFilteredList] = useState(null);
  let [invitationEmail, setInvitationEmail] = useState('');
  let [invitationPhone, setInvitationPhone] = useState('');

  useEffect(async () => {
    // onMount
    let transactions = await _dummyApi(false, 2000);

    setTransactionList(transactions);
    setFilteredList(transactions);

    // onUnmount
    return () => {}
  }, []);

  const _dummyApi = async (returnEmpty=false, responseTimeout=2000) => {
    let response = new Promise((resolve, _) => {
      let dummyResponse = [
        {
          id: 'qwyetquwe',
          transaction: 'Transaction 1',
          progress: 0.6,
          createdBy: 'John Doe',
          latestTask: {
            title: 'Home Insurance',
            subtask: {
              title: 'Select a Proposal',
              dueTimestamp: 1612764397,
            }
          },
          address: 'Mountain View, California, United States',
          linkTo: '/assist'
        },
        {
          id: 'jsdjaihwyd',
          transaction: 'Transaction 2',
          progress: 0.2,
          createdBy: 'Joseph Tribbiani',
          latestTask: {
            title: 'Pre-approval',
            subtask: {
              title: 'Choose an agent',
              dueTimestamp: 1612764397,
            }
          },
          address: 'Mountain View, California, United States',
          linkTo: '/assist'
        },
        {
          id: 'pwiiqudquq',
          transaction: 'Transaction 3',
          progress: 0.5,
          createdBy: 'Chandler Bing',
          latestTask: {
            title: 'Home Insurance',
            subtask: {
              title: 'Select a Proposal',
              dueTimestamp: 1612764397,
            }
          },
          address: 'Mountain View, California, United States',
          linkTo: '/assist'
        },
        {
          id: 'kkdlqoeuwi',
          transaction: 'Transaction 4',
          progress: 0.9,
          createdBy: 'Ross Geller',
          latestTask: {
            title: 'Pre-approval',
            subtask: {
              title: 'Choose an agent',
              dueTimestamp: 1612764397,
            }
          },
          address: 'Mountain View, California, United States',
          linkTo: '/assist'
        },
      ];

      setTimeout(()=> {
        resolve((returnEmpty) ? [] : dummyResponse);
      }, responseTimeout);
    });

    return response;
  };

  /**
   * Opens Invitation Modal
   */
  const showInvitationModal = () => {
    setInvitationModalVisiblity(true);
  }

  /**
   * Hides Invitation Modal
   */
  const closeInvitation = () => {
    setInvitationModalVisiblity(false);
  }

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

          <Grid className="dashboard-invite-or-divider" item style={{ marginTop: 20 }}>
            <div>
              OR
            </div>
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
                  {
                    (invitationEmail && invitationPhone)
                      ? 'The user will be invited though e-mail and SMS.'
                      : (invitationEmail)
                        ? 'The user will be invited though e-mail.'
                        : (invitationPhone)
                          ? 'The user will be invited though SMS.'
                          : 'Enter e-mail or phone number or both to invite.'
                  }
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
  }

  /**
   * Renders primary content.
   */
  const PrimaryContent = () => {
    if ([transactionList, filteredList].some(list => list === null)) {
      // Loading - Fetching transactions

      return (
        <Grid
          container
          spacing={2}
        >
          {Array(6).fill(0).map(() => (
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
      )
    }

    else if (transactionList.length === 0) {
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
              margin={'auto'}
              width="50ch"
            >
              Sit tight and get your Game Face ready.
              <strong> Reallos </strong>
              will send leads your way very soon!
            </Box>
          </Grid>
        </div>
      )
    }

    else if (filteredList.length === 0) {
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
          <Grid item style={{
            paddingTop: 50,
            paddingBottom: 60,
            opacity: 0.5
          }}>
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
      )
    }

    else {
      // Render transactions as cards

      return (
        <>
          <Grid
            container
            spacing={2}
            className="transaction-list"
          >
            {filteredList.map((transaction) => (
              <TransactionCard key={transaction.id} transactionDetails={transaction} />
            ))}
          </Grid>
        </>
      )
    }
  }

  return (
    <Scaffold navBar>
      <Grid container direction="column">
        <div style={{
          background: '#eeeeee',
          position: 'sticky',
          top: 84,
          zIndex: 120
        }}>
          <ReallosPageHeader pageName="My Transactions" />

          <div style={{
            paddingBottom: (transactionList?.length !== 0) ? 20 : 0,
            paddingTop: (transactionList?.length !== 0) ? 20 : 0,
          }}>
            {(transactionList === null) ? (
              <Skeleton
                animation="wave"
                variant="rect"
                height={56}
                style={{ borderRadius: 10 }}
              />
              ) : (transactionList.length !== 0) && (
                <SearchBar
                  placeholder="Search by transaction name, creator, task or address"
                  list={transactionList}
                  filterByFields={[
                    'transaction',
                    'createdBy',
                    'latestTask.title',
                    'address'
                  ]}
                  onUpdate={(filteredTransactionList) => {
                    setFilteredList(filteredTransactionList);
                  }}
                />
              )
            }
          </div>
        </div>

        {PrimaryContent()}
        {InvitationModal()}

        {(transactionList !== null) &&
          <ReallosFab
            title="New Transaction"
            LeadingIcon={<PlusIcon size={20} />}
            onClick={() => showInvitationModal()}
          />
        }
      </Grid>
    </Scaffold>
  );
}

export default Dashboard;
