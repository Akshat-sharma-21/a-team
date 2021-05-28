import { useState, useEffect } from "react";
import TransactionAssistIllustration from "../../assets/transaction-assist-first-time.png";
import AssistInitialConsultation from "./AssistInitialConsultation";
import AssistPreApproval from "./AssistPreApproval";
import AssistFindAgent from "./AssistFindAgent";
import AssistFindHome from "./AssistFindHome";
import AssistHomeInspection from "./AssistHomeInspection";
import AssistEscrowTitle from "./AssistEscrowTitle";
import AssistClosing from "./AssistClosing";
import AssistHomeInsurance from "./AssistHomeInsurance";
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
import { setTasks } from "../../actions/taskActions";

const mapStateToProps = (state) => ({
  task: state.task,
  utils: state.utils,
  transaction: state.transaction,
});

const mapActionToProps = (dispatch) => {
  return bindActionCreators(
    {
      fetchUser,
      setTasks,
    },
    dispatch
  );
};

function TransactionAssist(props) {
  const [isInitModalVisibile, setInitModalVisibility] = useState(false);
  let { tid } = useParams(); // getting the id of the transaction
  useEffect(() => {
    if (props.utils.reload === true) {
      // if the page was reloaded
      props.fetchUser(); // fetching the user and storing its state in Redux
    } else {
      // If the active transaction is not set
      props.setTasks(
        props.transaction.filter((transaction) => transaction.id === tid)[0]
      );
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
    if (props.task.SET === true && props.utils.loading === false)
      // only return when the component is loaded
      return (
        <Grid
          container
          direction="column"
          spacing={2}
          style={{ marginBottom: 20 }}
        >
          {!props.task.PreApproval.Locked && (
            <AssistPreApproval list={props.task.PreApproval} tid={tid} />
          )}
          {props.task.FindAgent.Questions.length !== 0 && ( // If the questions are answered by the user
            <AssistInitialConsultation // Sending the Questions and the Buyer information
              Questions={props.task.FindAgent.Questions}
              Buyer={props.task.Buyer}
            />
          )}
          {props.task.FindHome.Locked && (
            <AssistFindHome
              list={props.task.FindHome}
              tid={tid}
              questionsAnswered={
                // If any of the questions are not answered
                !(
                  props.task.SquareFt === null ||
                  props.task.Floors === null ||
                  props.task.Pool === null ||
                  props.task.Address === null ||
                  props.task.ClosingDate === null ||
                  props.task.HomeInspectionVoided === null
                )
              }
            />
          )}
          {!props.task.EscrowTitle.Locked && (
            <AssistEscrowTitle list={props.task.EscrowTitle} tid={tid} />
          )}
          {!props.task.HomeInspection.Locked && (
            <AssistHomeInspection list={props.task.HomeInspection} tid={tid} />
          )}
          {!props.task.HomeInsurance.Locked && (
            <AssistHomeInsurance list={props.task.HomeInsurance} tid={tid} />
          )}
          {!props.task.Closing.Locked && (
            <AssistClosing list={props.task.Closing} tid={tid} />
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
    } else if (props.task.SET === false && props.utils.reload === false) {
      // if the active transaction is not set and the user has been loaded
      props.setTasks(
        props.transaction.filter((transaction) => transaction.id === tid)[0]
      );
    }
  };
  return (
    <Scaffold navBar navRail>
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
