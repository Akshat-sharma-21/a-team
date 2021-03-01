import { useState, useEffect } from "react";
import TransactionAssistIllustration from "../../assets/transaction-assist-first-time.png";
import AssistPreApproval from "./AssistPreApproval";
import AssistFindAgent from "./AssistFindAgent";
import "./TransactionAssist.css";

import {
  ReallosModal,
  Scaffold,
  ReallosButton,
  ReallosPageHeader,
} from "../utilities/core";

import { Grid, Typography } from "@material-ui/core";
import { useParams } from "react-router";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchUser } from "../../actions/userActions";

const mapStateToProps = (state) => ({
  utils: state.utils,
  transaction: state.transaction,
});

const mapActionToProps = (dispatch) => {
  return bindActionCreators(
    {
      fetchUser,
    },
    dispatch
  );
};

function selectTransaction(transactions, id) {
  // function to select the current transaction
  if (transactions) {
    // transactions is not null
    transactions.forEach((transaction) => {
      if (transaction.id === id) {
        return transaction;
      }
    });
  }
}

function TransactionAssist(props) {
  const [isInitModalVisibile, setInitModalVisibility] = useState(true);
  let { tid } = useParams(); // getting the id of the transaction
  useEffect(() => {
    if (props.utils.reload === true) {
      // if the page was reloaded
      props.fetchUser(); // fetching the user and storing its state in Redux
    }
  }, []);

  /**
   * Renders first-time user modal.
   */
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

  /**
   * Hide first-time user modal.
   */
  const hideInitModal = () => {
    setInitModalVisibility(false);
  };

  /**
   * Renders acordions within the screen.
   */
  const displayAccordions = () => {
    return (
      <Grid
        container
        direction="column"
        spacing={2}
        style={{ marginBottom: 20 }}
      >
        <AssistPreApproval />
        <AssistFindAgent />
      </Grid>
    );
  };

  return (
    <Scaffold navBar navRail>
      <div style={{ paddingBottom: 10 }}>
        <ReallosPageHeader
          transactionName="Transaction 1"
          pageName="Transaction Assist"
        />
      </div>

      {displayAccordions()}
      {initModal()}
    </Scaffold>
  );
}

export default connect(mapStateToProps, mapActionToProps)(TransactionAssist);
