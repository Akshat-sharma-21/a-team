import { useState, useEffect } from "react";
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

import { PaperAirplaneIcon, SearchIcon } from "@primer/octicons-react";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchUser } from "../../actions/userActions";
import { fetchPeople } from "../../actions/peopleAction";

const mapStateToProps = (state) => ({
  utils: state.utils,
  transaction: state.transaction,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      fetchUser,
      fetchPeople,
    },
    dispatch
  );
};

function PeopleInvolved(props) {
  let [isSendMailModalVisible, toggleSendMailModalVisibility] = useState(false);
  let [filteredPeopleList, setFilteredPeopleList] = useState([]);
  let [sendMailUserDetails, setSendMailUserDetails] = useState({});
  let { tid } = useParams();
  /**
   * @todo `organization` is not dealt with
   * when setting up account
   */

  useEffect(() => {
    if (props.utils.reload === true) {
      // if the page has been reloaded
      props.fetchUser();
      props.fetchPeople(tid);
    }
  }, []);

  const peopleList = [
    {
      id: "qwertyuiop",
      name: "John Doe",
      role: "buyer",
      organization: null,
      phone: "4693509711",
      email: "john.doe@reallos.com",
      profilePicUrl: "https://miro.medium.com/max/785/0*Ggt-XwliwAO6QURi.jpg",
    },
    {
      id: "asdfghjkl",
      name: "Paxton Yoshida",
      role: "lender",
      organization: "Bank of America",
      phone: "5985744111",
      email: "paxton.yoshida@reallos.com",
      profilePicUrl:
        "https://i.pinimg.com/originals/cc/18/8c/cc188c604e58cffd36e1d183c7198d21.jpg",
    },
    {
      id: "zxcvbnm",
      name: "Ross Geller",
      role: "seller",
      organization: null,
      phone: "1192773489",
      email: "dr-geller@reallos.com",
      profilePicUrl:
        "https://a1cf74336522e87f135f-2f21ace9a6cf0052456644b80fa06d4f.ssl.cf2.rackcdn.com/images/characters/p-friends-david-schwimmer.jpg",
    },
    {
      id: "asdpwefvjso",
      name: "Chandler Bing",
      role: "home-inspector",
      organization: null,
      phone: "7372993647",
      email: "chandler.bong@gmail.com",
      profilePicUrl:
        "https://pyxis.nymag.com/v1/imgs/079/792/3ed0d94be0a9bd3d023f00532889bab152-30-chandler-bing.rsquare.w330.jpg",
    },
    {
      id: "oiwdbjbhds",
      name: "Joseph Tribbiani",
      role: "seller",
      organization: null,
      phone: "9227354839",
      email: "drake_ramoray@gmail.com",
      profilePicUrl:
        "https://thesecondangle.com/tsa-content/uploads/2020/08/Screenshot_20200813-175656_Chrome-scaled.jpg",
    },
    {
      id: "dsfhbiwqiw",
      name: "Pheobe Buffay",
      role: "buyer",
      organization: null,
      phone: "9022324812",
      email: "regina.phelange@gmail.com",
      profilePicUrl: null,
    },
    {
      id: "hdwqwehhwei",
      name: "Rachel Green",
      role: "buyer",
      organization: null,
      phone: "92279103169",
      email: "rachelgreen@gmail.com",
      profilePicUrl: null,
    },
    {
      id: "snuqiwbdaqqo",
      name: "Monica Geller",
      role: "buyer",
      organization: null,
      phone: "8230654839",
      email: "mon.geller@gmail.com",
      profilePicUrl: null,
    },
    {
      id: "dsfhbiwqiw",
      name: "Pheobe Buffay",
      role: "buyer",
      organization: null,
      phone: "9022324812",
      email: "regina.phelange@gmail.com",
      profilePicUrl: null,
    },
    {
      id: "hdwqwehhwei",
      name: "Rachel Green",
      role: "buyer",
      organization: null,
      phone: "92279103169",
      email: "rachelgreen@gmail.com",
      profilePicUrl: null,
    },
    {
      id: "snuqiwbdaqqo",
      name: "Monica Geller",
      role: "buyer",
      organization: null,
      phone: "8230654839",
      email: "mon.geller@gmail.com",
      profilePicUrl: null,
    },
  ];

  /**
   * Returns JSX component to be rendered
   * as primary content, like Cards and
   * error screen.
   */
  const primaryContent = () => {
    if (filteredPeopleList.length) {
      // If results found
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
            paddingBottom: 20,
            paddingTop: 20,
          }}
        >
          <SearchBar
            filterByFields={["name", "role", "organization", "phone", "email"]}
            list={peopleList}
            onUpdate={(filtered) => setFilteredPeopleList(filtered)}
            placeholder="Search by name, role, organization, phone or email"
          />
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
            src={sendMailUserDetails.profilePicUrl}
            style={{ height: 30, width: 30 }}
          />

          <div style={{ marginLeft: 10 }}>
            Sending to&nbsp;
            <Tooltip
              arrow
              title={
                <div style={{ fontSize: 12, padding: "2px 5px" }}>
                  {sendMailUserDetails.email}
                </div>
              }
              PopperProps={{
                style: { marginTop: -5 },
              }}
            >
              <b>{sendMailUserDetails.name}</b>
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
