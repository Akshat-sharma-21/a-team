import React from "react";
import "./Documents.css";
import Logo2 from "../../assets/Documents_img.png";
import { Container, Grid } from "@material-ui/core";

function Documents() {
  return (
    <Container className="documents">
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid item xs={7}>
          <div className="documents-heading">Documents</div>
        </Grid>
        <Grid item xs={5}></Grid>

        <Grid item xs={12} className="documents-empty-div"></Grid>
        <Grid item xs={12} className="documents-empty-div"></Grid>

        <Grid item xs={6} style={{ textAlign: "center" }}>
          <img src={Logo2} alt="" width="100%" />
        </Grid>

        <Grid item xs={12} className="documents-empty-div"></Grid>

        <Grid item xs={12}>
          <div className="documents-subheading">
            Find all your documents right here!
          </div>
        </Grid>

        <Grid item xs={12} className="documents-empty-div"></Grid>

        <Grid item xs={12}>
          <div className="documents-text">
            View all the documents uploaded in your transaction all in one
            place...
          </div>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Documents;
