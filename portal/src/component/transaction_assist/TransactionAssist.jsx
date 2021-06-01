import { useState, useEffect } from "react";
import TransactionAssistIllustration from "../../assets/transaction-assist-first-time.png";
import AssistInitialConsultation from "./AssistInitialConsultation";
import AssistComponent from "./AssistComponent";
import "./TransactionAssist.css";

import {
  ReallosModal,
  Scaffold,
  ReallosButton,
  ReallosPageHeader,
} from "../utilities/core";

import { Grid, Typography } from "@material-ui/core";
import { useParams } from "react-router";
import Skeleton from "@material-ui/lab/Skeleton";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchUser } from "../../actions/userActions";
import { fetchBuyerInfo } from "../../actions/transactionActions";

const mapStateToProps = (state) => ({
  task: state.task,
  utils: state.utils,
  transaction: state.transaction,
  user: state.user,
});

const mapActionToProps = (dispatch) => {
  return bindActionCreators(
    {
      fetchUser,
      fetchBuyerInfo,
    },
    dispatch
  );
};

function TransactionAssist(props) {
  const [isInitModalVisibile, setInitModalVisibility] = useState(false);
  const [BuyerData, setBuyerData] = useState(false);
  let { tid } = useParams(); // getting the id of the transaction

  useEffect(() => {
    if (props.utils.reload === true) {
      // if the page was reloaded
      props.fetchUser(); // fetching the user and storing its state in Redux
    }
  }, []);

  if (
    props.utils.reload === false &&
    props.utils.loading === false &&
    BuyerData === false
  ) {
    // If the user has been loaded
    setBuyerData(true);
    if (
      props.transaction.filter((transaction) => transaction.id === tid)[0] // If the Buyer Data has not been stored
        .BuyerData === null
    ) {
      props.fetchBuyerInfo(
        props.transaction.filter((transaction) => transaction.id === tid)[0]
          .BuyerId,
        tid
      );
    }
  }

  const initModal = () => {
    return (
      <ReallosModal
        visible={isInitModalVisibile}
        modalWidth={750}
        dismissCallback={hideInitModal}
      >
        <Grid container direction="column" justify="center">
          <Grid item style={{ textAlign: "center" }}>
            <img
              src={TransactionAssistIllustration}
              style={{ height: 290 }}
              alt=""
            />
          </Grid>

          <Grid
            item
            style={{
              marginBottom: 20,
              marginTop: 10,
              textAlign: "center",
            }}
          >
            <h1
              style={{
                fontSize: 28,
                fontFamily: "Gilroy",
                fontWeight: "bold",
                paddingTop: 15,
                marginBottom: 15,
              }}
            >
              Transaction Assist
            </h1>

            <Typography
              style={{
                fontSize: 18,
                fontFamily: "Roboto Slab",
              }}
            >
              Exactly know the progress of your client's transaction!
            </Typography>
          </Grid>

          <Grid item style={{ textAlign: "center", paddingTop: "3%" }}>
            <ReallosButton primary buttonWidth={"32%"} onClick={hideInitModal}>
              Continue
            </ReallosButton>
          </Grid>
        </Grid>
      </ReallosModal>
    );
  };

  const hideInitModal = () => {
    setInitModalVisibility(false);
  };

  const displayAccordions = () => {
    if (
      props.transaction.length !== 0 &&
      props.utils.loading === false &&
      props.transaction.filter((transaction) => transaction.id === tid)[0] // If the Buyer Data has not been stored
        .BuyerData !== null
    )
      // only return when the component is loaded
      return (
        <Grid
          container
          direction="column"
          spacing={2}
          style={{ marginBottom: 20 }}
        >
          {!props.transaction.filter((transaction) => transaction.id === tid)[0]
            .PreApproval.Locked && ( // If the Pre-approval component is not locked
            <AssistComponent
              title="Pre-approval"
              completed={false}
              index={0}
              stepObj={
                props.transaction.filter(
                  (transaction) => transaction.id === tid
                )[0].PreApproval
              }
              tid={tid}
            />
          )}
          {props.transaction.filter((transaction) => transaction.id === tid)[0]
            .FindAgent.Questions.length !== 0 && (
            <AssistInitialConsultation
              Questions={
                props.transaction.filter(
                  (transaction) => transaction.id === tid
                )[0].FindAgent.Questions
              }
              Buyer={
                props.transaction.filter(
                  (transaction) => transaction.id === tid
                )[0].BuyerData
              }
            />
          )}
          {!props.transaction.filter((transaction) => transaction.id === tid)[0]
            .FindAgent.Locked && (
            <AssistComponent
              title="Find Agent"
              completed={false}
              index={2}
              stepObj={
                props.transaction.filter(
                  (transaction) => transaction.id === tid
                )[0].FindAgent
              }
              tid={tid}
            />
          )}
          {!props.transaction.filter((transaction) => transaction.id === tid)[0]
            .FindHome.Locked && (
            <AssistComponent
              title="Find Home"
              index={3}
              stepObj={
                props.transaction.filter(
                  (transaction) => transaction.id === tid
                )[0].FindHome
              }
              tid={tid}
              Transaction={
                props.transaction.filter(
                  (transaction) => transaction.id === tid
                )[0]
              }
            />
          )}
          {!props.transaction.filter((transaction) => transaction.id === tid)[0]
            .HomeInspection.Locked && (
            <AssistComponent
              title="Home Inspection"
              completed={false}
              index={4}
              stepObj={
                props.transaction.filter(
                  (transaction) => transaction.id === tid
                )[0].HomeInspection
              }
              tid={tid}
            />
          )}
          {!props.transaction.filter((transaction) => transaction.id === tid)[0]
            .EscrowTitle.Locked && (
            <AssistComponent
              title="Escrow & Title"
              completed={false}
              index={5}
              stepObj={
                props.transaction.filter(
                  (transaction) => transaction.id === tid
                )[0].EscrowTitle
              }
              tid={tid}
            />
          )}
          {!props.transaction.filter((transaction) => transaction.id === tid)[0]
            .HomeInsurance.Locked && (
            <AssistComponent
              title="Home Insurance"
              completed={false}
              index={6}
              stepObj={
                props.transaction.filter(
                  (transaction) => transaction.id === tid
                )[0].HomeInsurance
              }
              tid={tid}
            />
          )}
          {!props.transaction.filter((transaction) => transaction.id === tid)[0]
            .Closing.Locked && (
            <AssistComponent
              title="Closing"
              completed={false}
              index={7}
              stepObj={
                props.transaction.filter(
                  (transaction) => transaction.id === tid
                )[0].Closing
              }
              tid={tid}
            />
          )}
        </Grid>
      );
  };

  const displayLoadingComponent = () => {
    if (props.utils.loading === true) {
      return (
        <Grid container spacing={2}>
          {Array(4)
            .fill(0)
            .map(() => (
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <Skeleton
                  animation="wave"
                  variant="rect"
                  height={68.4}
                  style={{ borderRadius: 10 }}
                />
              </Grid>
            ))}
        </Grid>
      );
    }
  };
  return (
    <Scaffold navBar navRail userRole={props.user.Role}>
      <div style={{ paddingBottom: 10 }}>
        <ReallosPageHeader
          transactionName="Transaction 1"
          pageName="Transaction Assist"
        />
      </div>
      {displayLoadingComponent()}
      {displayAccordions()}
      {initModal()}
    </Scaffold>
  );
}

export default connect(mapStateToProps, mapActionToProps)(TransactionAssist);
