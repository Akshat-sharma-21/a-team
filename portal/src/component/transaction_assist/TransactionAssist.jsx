import { useState } from "react";
import TransactionAssistIllustration from "../../assets/transaction-assist-first-time.png";
import AssistPreApproval from "./AssistPreApproval";
import AssistFindAgent from "./AssistFindAgent";
import { PackageIcon } from "@primer/octicons-react";
import "./TransactionAssist.css";

import {
  ReallosModal,
  Scaffold,
  ReallosButton,
} from "../utilities/core";

import {
  Grid,
  Typography,
  Box,
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
      <Box component="div" paddingTop={6} paddingBottom={1}>
        <Grid
          container
          direction="row"
          alignItems="center"
          spacing={2}
        >
          <Grid item>
            <PackageIcon size={28} />
          </Grid>
          <Grid item style={{
            fontSize: 20
          }}>
            Transaction 1
          </Grid>
        </Grid>
        <h1 style={{
          marginTop: 15
        }}>
          Transaction Assist
        </h1>
      </Box>

      {displayAccordions()}
      {initModal()}
    </Scaffold>
  );
}

export default TransactionAssist;
