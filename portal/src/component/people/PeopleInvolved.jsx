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

import { PaperAirplaneIcon, SearchIcon } from "@primer/octicons-react";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchPeople } from "../../actions/peopleAction";

const mapStateToProps = (state) => ({
  utils: state.utils,
  transaction: state.transaction,
  people: state.people,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      fetchPeople,
    },
    dispatch
  );
};

function PeopleInvolved(props) {
  let [isSendMailModalVisible, toggleSendMailModalVisibility] = useState(false);
  let [filteredPeopleList, setFilteredPeopleList] = useState(null);
  let [sendMailUserDetails, setSendMailUserDetails] = useState({});
  let { tid } = useParams();
  /**
   * @todo `organization` is not dealt with
   * when setting up account
   */

  useEffect(() => {
    props.fetchPeople(tid);
  }, []);

  /**
   * Returns JSX component to be rendered
   * as primary content, like Cards and
   * error screen.
   */
  const primaryContent = () => {
    if (props.utils.loading === true || filteredPeopleList === null) {
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
    } else if (filteredPeopleList.length === 0) {
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
              )
            } else if (props.people.length !== 0) {
              return (
                <SearchBar
                  list={props.people}
                  filterByFields={["Name", "Role", "Company", "Phone", "Email"]}
                  onUpdate={(filtered) => setFilteredPeopleList(filtered)}
                  placeholder="Search by name, role, organization, phone or email"
                />
              )
            } else {
              return <React.Fragment />
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
          <Avatar
            src={sendMailUserDetails.photoUrl}
            style={{ height: 30, width: 30 }}
          />

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
          />
        </FormControl>

        <div style={{ marginTop: 10 }}>
          <FormControl fullWidth variant="outlined">
            <OutlinedInput
              className="people-involved-mail-textfield"
              multiline
              rows={10}
              placeholder="Message"
            />
          </FormControl>
        </div>

        <Grid container justify="flex-end" style={{ marginTop: 20, gap: 8 }}>
          <ReallosButton onClick={() => toggleSendMailModalVisibility(false)}>
            Cancel
          </ReallosButton>

          <ReallosButton primary>
            <PaperAirplaneIcon size={20} />
            <span style={{ marginLeft: 15 }}>Send Mail</span>
          </ReallosButton>
        </Grid>
      </ReallosModal>
    </Scaffold>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(PeopleInvolved);
