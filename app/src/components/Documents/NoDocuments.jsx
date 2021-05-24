import React, { useState } from "react";
import { Scaffold } from "../utilities/core";
import { Button, CircularProgress } from "@material-ui/core";
import NoDoc from "../../assets/no-doc-img.svg";
import { uploadDocument } from "../../actions/documentsActions";
import "./Documents.css";

import { Grid } from "@material-ui/core";

//TODO: EDIT the upload button & add a back button
function NoDocuments(props) {
  let [uploadingDocument, setUploadingDocument] = useState(false);

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
    if (uploadingDocument !== true)
      return (
        <Scaffold>
          <Grid container direction="column" alignItems="center">
            <Grid item>
              <img src={NoDoc} alt="" className="no-document-img" />
            </Grid>
            <Grid item>
              <div className="no-doc-heading">Gift Letter</div>
            </Grid>
            <Grid item>
              <div className="no-doc-body">
                Document has not been uploaded yet! Please upload it here or
                email it at{" "}
                <span style={{ color: "#0432FA" }}>
                  my@documents.reallos.com
                </span>{" "}
                with "{props.location.state.title}" as the subject
              </div>
            </Grid>
            <Grid item>
              <Button
                primary
                variant="primary"
                className="no-doc-btn"
                component="label"
              >
                Upload
                <input
                  type="file"
                  hidden
                  multiple={false}
                  accept={".pdf"}
                  onChange={getSelectedFile}
                />
              </Button>
            </Grid>
          </Grid>
        </Scaffold>
      );
    else
      return (
        <Scaffold>
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
