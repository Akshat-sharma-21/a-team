import React, { useState } from "react";
import { Scaffold, ReallosButton } from "../utilities/core";
import { CircularProgress, IconButton, Button } from "@material-ui/core";
import { ArrowLeftIcon, DeviceCameraIcon } from "@primer/octicons-react";
import { useHistory } from "react-router-dom";
import NoDoc from "../../assets/no-doc-img.svg";
import Scanner from "./scanner/Scanner";
import { uploadDocument } from "../../actions/documentsActions";
import "./Documents.css";

import { Grid } from "@material-ui/core";

function NoDocuments(props) {
  let history = useHistory();
  let [uploadingDocument, setUploadingDocument] = useState(false);
  let [scanner, setScanner] = useState(false); // to set the scanner

  function getSelectedFile(e) {
    let file = e.target.files[0]; // Getting the selected file
    setUploadingDocument(true);
    uploadDocument(file, props.location.state)
      .then(() => {
        setUploadingDocument(false);
        window.location.href = "/documents";
      })
      .catch((err) => {
        console.error(err);
      });
  }
  if (props.location) {
    if (uploadingDocument !== true) {
      if (scanner) {
        // if the canner is set to open
        return (
          <Scanner
            metadata={props.location.state}
            returnBack={() => setScanner(false)}
          />
        );
      } else
        return (
          <Scaffold>
            <IconButton
              size="small"
              style={{ margin: "20px 0" }}
              onClick={() => history.push("/documents")}
            >
              <ArrowLeftIcon size={32} className="no-document-back-icon" />
            </IconButton>
            <Grid container direction="column" alignItems="center">
              <Grid item>
                <img src={NoDoc} alt="" className="no-document-img" />
              </Grid>
              <Grid item>
                <div className="no-doc-heading">
                  {props.location.state.title}
                </div>
              </Grid>
              <Grid item>
                <div className="no-doc-body">
                  Please upload it here or email it at{" "}
                  <span style={{ color: "#0432FA" }}>
                    my@documents.reallos.com
                  </span>{" "}
                  with "{props.location.state.title}" as the subject or
                </div>
              </Grid>
              <Grid item>
                <Button
                  className="no-doc-scanner-btn"
                  startIcon={
                    <DeviceCameraIcon
                      size={18}
                      className="no-doc-scanner-icon"
                    />
                  }
                  variant="contained"
                  onClick={() => setScanner(true)}
                >
                  Scan
                </Button>
              </Grid>
              <Grid item>
                <input
                  id="inputFile"
                  type="file"
                  hidden
                  multiple={false}
                  accept={".pdf"}
                  onChange={getSelectedFile}
                />

                <ReallosButton
                  primary
                  variant="primary"
                  className="no-doc-btn"
                  onClick={(e) => document.getElementById("inputFile").click()}
                >
                  Upload
                </ReallosButton>
              </Grid>
            </Grid>
          </Scaffold>
        );
    } else
      return (
        <Scaffold>
          <IconButton size="small" style={{ margin: "20px 0" }} disabled={true}>
            <ArrowLeftIcon size={32} className="no-document-back-icon" />
          </IconButton>
          <div className="no-documents-single-view-container">
            <CircularProgress />

            <div
              style={{
                marginTop: 50,
                fontSize: 20,
              }}
            >
              Uploading Document...
            </div>
          </div>
        </Scaffold>
      );
  } else {
    //Add the error message here
  }
}

export default NoDocuments;
