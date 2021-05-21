import React from "react";
import { ReallosButton } from "../utilities/core";
import NoDoc from "../../assets/no-doc-img.svg";
import "./Documents.css";

import { Grid } from "@material-ui/core";

function NoDocuments(props) {
  return (
    <Grid container direction="column" alignItems="center">
      <Grid item>
        <img src={NoDoc} alt="" className="no-document-img" />
      </Grid>
      <Grid item>
        <div className="no-doc-heading">Gift Letter</div>
      </Grid>
      <Grid item>
        <div className="no-doc-body">
          Document has not been uploaded yet! Please upload it here or email it
          at <span style={{ color: "#0432FA" }}>my@documents.reallos.com</span>{" "}
          with "{props.location.state.title}" as the subject
        </div>
      </Grid>
      <Grid item>
        <ReallosButton primary variant="primary" className="no-doc-btn">
          Upload
        </ReallosButton>
      </Grid>
    </Grid>
  );
}

export default NoDocuments;
