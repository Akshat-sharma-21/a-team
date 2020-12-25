import "./transactionAssist.css";
import transactionImg from "../../assets/transaction-assist-first-time.png";
import Modal from "../utilities/modal";
import { Container, Grid, Typography, Button } from "@material-ui/core";
import { useState } from "react";

function TransactionAssist(props) {
  const [modalVisibile, setModal] = useState(true);
  return (
    <Container>
      <Modal
        visible={modalVisibile ? true : false}
        modalWidth={750}
        modalHeight={500}
        dismissCallback={closeModal}
      >
        <Grid container direction="column">
          <Grid item>
            <img src={transactionImg} alt="" style={{ height: 290 }} />
          </Grid>
          <Grid item>
            <Typography
              style={{
                fontSize: 25,
                fontFamily: "Roboto Slab",
                fontWeight: "Bold",
                paddingTop: 25,
              }}
            >
              Transaction Tracker
            </Typography>
          </Grid>
          <Grid item>
            <Typography
              style={{
                fontSize: 18,
                fontFamily: "Roboto Slab",
                paddingTop: 10,
              }}
            >
              Exactly know the progress of your client's Transaction!
            </Typography>
          </Grid>
          <Grid item>
            <Button variant="contained" className="continue-button">
              Continue
            </Button>
          </Grid>
        </Grid>
      </Modal>
    </Container>
  );

  function closeModal() {
    setModal(false);
  }
}

export default TransactionAssist;
