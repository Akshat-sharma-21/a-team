import { useState } from "react";
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

import {
  Grid,
  Typography,
} from "@material-ui/core";


function TransactionAssist() {
  const [isInitModalVisibile, setInitModalVisibility] = useState(true);

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

          <Grid item style={{
            marginBottom: 20,
            marginTop: 10,
            textAlign: "center"
          }}>
            <h1
              style={{
                fontSize: 28,
                fontFamily: 'Gilroy',
                fontWeight: 'bold',
                paddingTop: 15,
                marginBottom: 15
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
  }

  /**
   * Hide first-time user modal.
   */
  const hideInitModal = () => {
    setInitModalVisibility(false);
  }

  /**
   * Renders acordions within the screen.
   */
  const displayAccordions = () => {
    return (
      <Grid container direction="column" spacing={2} style={{ marginBottom: 20 }}>
        <AssistPreApproval />
        <AssistFindAgent />
      </Grid>
    );
  }

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

export default TransactionAssist;
