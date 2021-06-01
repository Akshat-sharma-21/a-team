import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { ReactComponent as StampIcon } from "../../../assets/stamp_icon.svg";
import DocUploadStatus from "../uploader/DocUploadStatus";
import { myStorage } from "../../../FirebaseConfig";
import WebViewer from "@pdftron/webviewer";

import {
  ReallosModal,
  ModalActionFooter,
  ReallosPageHeader,
  ReallosButton,
  ReallosFab,
  Scaffold,
} from "../../utilities/core";

import { Grid, Box, Divider, Snackbar } from "@material-ui/core";

import "./DocumentViewer.css";

let viewer = null; // The viewer must not change with every rendering
let documentLink = null; // The document link that is being displayed

function DocumentViewer(props) {
  let { tid } = useParams();
  let viewerRoot = React.createRef(); // Intializing viewerRoot
  // Defining all the states
  let [documentLoaded, setDocumentLoaded] = useState(true);
  let [documentChanged, setDocumentChanged] = useState(false);
  let [uploadModalVisible, setUploadModalVisible] = useState(false);
  let [resetModalVisbile, setResetModalVisible] = useState(false);
  let [uploadTaskStatus, setUploadTaskStatus] = useState({
    filename: "",
    progress: 0,
    isPaused: false,
    uploadTask: null,
  });
  let [snackbarVisible, setSnackBarVisible] = useState(false);
  let [snackbarMessage, setSnackBarMessage] = useState("");

  async function fetchAndSetDocument(docPath) {
    // To fetch and set the document
    let downloadUrl = await myStorage.ref(docPath).getDownloadURL(); // Getting the download url
    viewer.loadDocument(downloadUrl);
    documentLink = downloadUrl;
  }

  function resetDocument() {
    // To reset the document
    if (documentLink) {
      viewer.loadDocument(documentLink);
      setDocumentChanged(false);
    }
  }

  async function saveChangesToCloud(docPath) {
    // To save any changes done to the pdf
    const doc = viewer.docViewer.getDocument();
    const xfdfString = await viewer.annotManager.exportAnnotations();

    const options = { xfdfString, flatten: false };
    const data = await doc.getFileData(options);
    const arr = new Uint8Array(data);
    const docBlob = new Blob([arr], { type: "application/pdf" });

    let fileRef = myStorage.ref().child(docPath);
    let uploadTask = fileRef.put(docBlob);

    uploadTask.on("state_changed", (snapshot) => {
      let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      let isPaused = snapshot.state === "paused";

      let newUploadTaskDetails = {
        filename: props.location.state.title,
        progress,
        isPaused,
        uploadTask,
      };

      setUploadTaskStatus(newUploadTaskDetails);
      setUploadModalVisible(true);
      setDocumentChanged(false);
    });
  }

  async function showSignaturePanel() {
    // To open the signature panel
    if (viewerRoot.current.querySelector("iframe").contentDocument) {
      viewerRoot.current
        .querySelector("iframe")
        .contentDocument.querySelector(
          'div[data-element="signatureToolButton"]'
        )
        .firstChild.click();
    }
  }

  useEffect(() => {
    if (props.location) {
      // If the location object exists in props
      WebViewer({ path: "/webviewer/lib", fullAPI: true }, viewerRoot.current)
        .then((viewerInstance) => {
          const { docViewer, annotManager, FitMode } = viewerInstance;
          viewer = viewerInstance;
          fetchAndSetDocument(props.location.state.location);

          docViewer.on("documentLoaded", () => {
            setDocumentLoaded(false);
            viewerInstance.setFitMode(FitMode.FitWidth);
            annotManager.setCurrentUser(localStorage.Id); // Setting the id of the current user
          });

          annotManager.on("annotationChanged", () => {
            setDocumentChanged(true);
          });
        })
        .catch(() => {
          window.location.href = `/transactions/${props.location.state.location}`;
        });
    }
  }, []);

  if (props.location) {
    // Proceed if document metadata is available in props
    const docData = props.location.state;
    return (
      <Scaffold
        navBar
        navRail
        navRailProps={{
          backButtonRoute: `/transactions/${tid}/documents`,
        }}
        userRole={props.location.state.Role}
      >
        <Box component="div" paddingBottom={5}>
          <ReallosPageHeader
            transactionName="Transaction 1"
            pageName="Document Editor"
          />

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <NavLink to={`/transactions/${tid}/documents`} className="link">
                Documents
              </NavLink>
              <span style={{ margin: "0 10px" }}>/</span>
              {docData.title}
            </div>

            <div
              style={{
                display: "flex",
                gap: 10,
              }}
            >
              <ReallosButton
                secondaryButtonBgColor="#eeeeee"
                disabled={!documentChanged}
                onClick={() => {
                  setResetModalVisible(true);
                }}
              >
                Revert Changes
              </ReallosButton>

              <ReallosButton
                primary
                disabled={!documentChanged}
                onClick={() => saveChangesToCloud(docData.location)}
              >
                Save Changes
              </ReallosButton>
            </div>
          </div>
        </Box>

        {/* Holds the PDF Viewer */}
        <div className="pdf-viewer-root" ref={viewerRoot} />

        <ReallosModal
          title="Saving Changes"
          visible={uploadModalVisible}
          dismissCallback={() => {
            setUploadModalVisible(false);
            setUploadTaskStatus({
              progress: 0,
              isPaused: false,
              uploadTask: null,
            });
          }}
          modalWidth={700}
        >
          <DocUploadStatus
            showSnackbarCallback={(message) => {
              setSnackBarVisible(true);
              setSnackBarMessage(message);
            }}
            dismissCallback={() => {
              setUploadModalVisible(false);
              setUploadTaskStatus({
                progress: 0,
                isPaused: false,
                uploadTask: null,
              });
            }}
            uploadStatus={uploadTaskStatus}
            isSavingDocument={true}
            onSuccessCallback={async () => {
              const docPath = props.location.state.location;
              documentLink = await myStorage.ref(docPath).getDownloadURL();
            }}
          />
        </ReallosModal>
        <ReallosModal
          title="Revert Changes"
          visible={resetModalVisbile}
          dismissCallback={() => setResetModalVisible(false)}
          modalWidth={700}
        >
          This will reset all the changes you have made to this document until
          the last save.
          <br />
          This action cannot be undone. Are you sure to continue?
          <ModalActionFooter>
            <ReallosButton
              onClick={() => {
                setResetModalVisible(false);
              }}
            >
              Cancel
            </ReallosButton>

            <ReallosButton
              primary
              onClick={() => {
                resetDocument();
                setResetModalVisible(false);
              }}
            >
              Revert Changes
            </ReallosButton>
          </ModalActionFooter>
        </ReallosModal>
        <Snackbar
          open={snackbarVisible}
          onClose={() => setSnackBarVisible(false)}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          message={snackbarMessage}
        />
        <div style={{ display: "block" }}>
          <ReallosFab
            LeadingIcon={<StampIcon fill="var(--color-primary)" />}
            title="E-Sign Document"
            onClick={() => showSignaturePanel()}
            leadingIconStyle={{
              marginRight: 15,
              height: 25,
            }}
          />
        </div>
      </Scaffold>
    );
  } else {
    // Show error when no document metadata is available in props
    return (
      <Scaffold navBar navRail>
        <Grid
          container
          direction="column"
          justify="center"
          alignContent="center"
          style={{ height: "85vh", textAlign: "center" }}
        >
          <div style={{ fontSize: 150, opacity: 0.5 }}>{"( >_< )"}</div>

          <div style={{ marginTop: 50, marginBottom: 20 }}>
            <h1>Oops!</h1>

            <p style={{ fontSize: 20 }}>
              Can't fetch the document.
              <br />
              <div
                style={{
                  fontStyle: "italic",
                  opacity: 0.5,
                }}
              >
                Did you enter the URL manually?
              </div>
            </p>
          </div>

          <Divider />

          <p>
            Go back to&nbsp;
            <NavLink to={`/transactions/${tid}/documents`} className="link">
              Documents
            </NavLink>
            &nbsp;and select the document you want to view.
          </p>
        </Grid>
      </Scaffold>
    );
  }
}

export default DocumentViewer;
