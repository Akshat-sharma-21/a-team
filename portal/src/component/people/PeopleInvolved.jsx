import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PeopleInvolvedCard from "./PeopleInvolvedCard";
import "./PeopleInvolved.css";

import {
  ReallosModal,
  ReallosButton,
  SearchBar,
  ReallosPageHeader,
  Scaffold,
} from "../utilities/core";

import {
  Grid,
  Box,
  FormControl,
  OutlinedInput,
  Avatar,
  Tooltip,
} from "@material-ui/core";

import Skeleton from "@material-ui/lab/Skeleton";

import {
  PaperAirplaneIcon,
  SearchIcon,
  PeopleIcon,
} from "@primer/octicons-react";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchPeople, sendMail } from "../../actions/peopleAction";

const mapStateToProps = (state) => ({
  utils: state.utils,
  transaction: state.transaction,
  people: state.people,
  user: state.user,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      fetchPeople,
      sendMail,
    },
    dispatch
  );
};

function PeopleInvolved(props) {
  let [isSendMailModalVisible, toggleSendMailModalVisibility] = useState(false);
  let [filteredPeopleList, setFilteredPeopleList] = useState(null);
  let [sendMailUserDetails, setSendMailUserDetails] = useState({});
  let [mailSubject, changeMailSubject] = useState("");
  let [mailMessage, changeMailMessage] = useState("");
  let { tid } = useParams();

  if (props.utils.reload === false && props.people.peopleSet === false) {
    props.fetchPeople(
      props.transaction.filter((transaction) => transaction.id === tid)[0]
    );
  }

  const primaryContent = () => {
    if (props.people.peopleSet === false) {
      // if the people aren't fetched
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
    } else if (
      props.people.peopleSet === true &&
      props.people.peopleArray.length === 0
    ) {
      return (
        <>
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
                paddingBottom: 20,
                opacity: 0.5,
              }}
            >
              <PeopleIcon size={150} />
            </Grid>
            <Grid item>
              <Box marginTop={-3} component="h1">
                <h4>No Professionals Found</h4>
              </Box>
            </Grid>
            <Grid item>
              <Box marginTop={-5} style={{ fontSize: 18 }}>
                Wait for your Buyer to add more Professionals...
              </Box>
            </Grid>
          </Grid>
        </>
      );
    } else if (filteredPeopleList && filteredPeopleList.length === 0) {
      // If no results found
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
              paddingBottom: 20,
              opacity: 0.5,
            }}
          >
            <SearchIcon size={150} />
          </Grid>
          <Grid item>
            <Box marginTop={-3} component="h1">
              <h4>No results found</h4>
            </Box>
          </Grid>
          <Grid item>
            <Box marginTop={-5} style={{ fontSize: 18 }}>
              The entered search term did not match any people
            </Box>
          </Grid>
        </Grid>
      );
    } else {
      if (filteredPeopleList === null) {
        return (
          <Grid container spacing={2} className="people-involved-card-group">
            {props.people.peopleArray.map((person, index) => (
              <PeopleInvolvedCard
                personDetails={person}
                onSendMail={() => {
                  toggleSendMailModalVisibility(true);
                  setSendMailUserDetails(person);
                }}
                itemIndex={index}
              />
            ))}
          </Grid>
        );
      } else {
        return (
          <Grid container spacing={2} className="people-involved-card-group">
            {filteredPeopleList.map((person, index) => (
              <PeopleInvolvedCard
                personDetails={person}
                onSendMail={() => {
                  toggleSendMailModalVisibility(true);
                  setSendMailUserDetails(person);
                }}
                itemIndex={index}
              />
            ))}
          </Grid>
        );
      }
    }
  };
  return (
    <Scaffold navBar navRail>
      <div
        style={{
          background: "#eeeeee",
          outline: "2px solid #eeeeee",
          position: "sticky",
          top: 84,
          zIndex: 120,
        }}
      >
        <ReallosPageHeader
          transactionName="Transaction 1"
          pageName="People Involved"
        />

        <div
          style={{
            paddingBottom: props.people?.length !== 0 ? 20 : 0,
            paddingTop: props.people?.length !== 0 ? 20 : 0,
          }}
        >
          {(() => {
            if (props.people === null) {
              return (
                <Skeleton
                  animation="wave"
                  variant="rect"
                  height={56}
                  style={{ borderRadius: 10 }}
                />
              );
            } else if (props.people.peopleArray.length !== 0) {
              return (
                <SearchBar
                  list={props.people.peopleArray}
                  filterByFields={["Name", "Role", "Company", "Phone", "Email"]}
                  onUpdate={(filtered) => setFilteredPeopleList(filtered)}
                  placeholder="Search by name, role, organization, phone or email"
                />
              );
            } else {
              return <></>;
            }
          })()}
        </div>
      </div>

      {primaryContent()}

      {/* SEND MAIL MODAL */}
      <ReallosModal
        title="Send Mail"
        modalWidth={650}
        visible={isSendMailModalVisible}
        dismissCallback={() => toggleSendMailModalVisibility(false)}
      >
        <Grid
          container
          direction="row"
          alignItems="center"
          style={{ marginTop: -10, marginBottom: 30 }}
        >
          {sendMailUserDetails.PhotoUrl !== null ? (
            <Avatar src={sendMailUserDetails.PhotoUrl} />
          ) : (
            <Avatar>
              {sendMailUserDetails.FirstName[0] +
                sendMailUserDetails.LastName[0]}
            </Avatar>
          )}

          <div style={{ marginLeft: 10 }}>
            Sending to&nbsp;
            <Tooltip
              arrow
              title={
                <div style={{ fontSize: 12, padding: "2px 5px" }}>
                  {sendMailUserDetails.Email}
                </div>
              }
              PopperProps={{
                style: { marginTop: -5 },
              }}
            >
              <b>
                {sendMailUserDetails.FirstName +
                  " " +
                  sendMailUserDetails.LastName}
              </b>
            </Tooltip>
          </div>
        </Grid>

        <FormControl fullWidth variant="outlined">
          <OutlinedInput
            className="people-involved-mail-textfield"
            placeholder="Subject"
            value={mailSubject}
            onChange={(event) => {
              changeMailSubject(event.target.value);
            }}
          />
        </FormControl>

        <div style={{ marginTop: 10 }}>
          <FormControl fullWidth variant="outlined">
            <OutlinedInput
              className="people-involved-mail-textfield"
              multiline
              rows={10}
              value={mailMessage}
              placeholder="Message"
              onChange={(event) => {
                changeMailMessage(event.target.value);
              }}
            />
          </FormControl>
        </div>

        <Grid container justify="flex-end" style={{ marginTop: 20, gap: 8 }}>
          <ReallosButton
            onClick={() => {
              toggleSendMailModalVisibility(false);
              changeMailMessage("");
              changeMailSubject("");
            }}
          >
            Cancel
          </ReallosButton>

          <ReallosButton
            primary
            onClick={() => {
              props.sendMail(
                sendMailUserDetails.Email,
                {
                  name: props.user.FirstName + " " + props.user.LastName,
                  email: props.user.Email,
                },
                {
                  address: props.transaction.find((obj) => obj.id === tid) // getting the active transaction
                    .Address,
                },
                {
                  subject: mailSubject,
                  message: mailMessage,
                }
              );
              toggleSendMailModalVisibility(false);
              changeMailMessage("");
              changeMailSubject("");
            }}
          >
            <PaperAirplaneIcon size={20} />
            <span style={{ marginLeft: 15 }}>Send Mail</span>
          </ReallosButton>
        </Grid>
      </ReallosModal>
    </Scaffold>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(PeopleInvolved);
