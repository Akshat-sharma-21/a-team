import React, { useState, useRef, useEffect } from "react";
import { myStorage } from "../../../FirebaseConfig";
import { useHistory } from "react-router-dom";
import webviewer from "@pdftron/webviewer";
import { Button, CircularProgress } from "@material-ui/core";
import { ArrowBack, CreateRounded, SaveOutlined } from "@material-ui/icons";

import "./DocumentViewer.css";

const diabledElements = [
  "zoomInButton",
  "zoomOutButton",
  "zoomOverlayButton",
  "startFormEditingToolGroupButton",
  "cropToolGroupButton",
  "printButton",
  "eraserToolButton",
  "themeChangeButton",
  "fullscreenButton",
  "eraserToolButton",
  "redoButton",
  "undoButton",
  "calloutToolGroupButton",
  "fileAttachmentToolGroupButton",
  "fileAttachmentToolGroupButton",
  "stampToolGroupButton",
  "rubberStampToolGroupButton",
  "leftPanelButton",
  "viewControlsButton",
  "zoomOverlay",
  "panToolButton",
  "textSelectButton",
  "selectToolButton",
  "searchButton",
  "toggleNotesButton",
  "toolbarGroup-Annotate",
  "toolbarGroup-Shapes",
  "toolbarGroup-Edit",
  "toolbarGroup-Annotate",
  "menuButton",
]; // Storing all the elements to disable
let viewer = null; // To store the viewer for the pdf

function DocumentViewer(props) {
  let viewerRoot = useRef(null);
  let loadingRoot = React.createRef();
  let [documentSaving, setDocumentSaving] = useState(false);
  let history = useHistory();

  async function fetchAndSetDocument(docPath) {
    // function to get the url of the document
    let downloadUrl = await myStorage.ref(docPath).getDownloadURL();
    viewer.loadDocument(downloadUrl);
  }

  async function showSignaturePanel() {
    // function to show the signature panel
    if (viewerRoot.current.querySelector("iframe").contentDocument) {
      viewerRoot.current
        .querySelector("iframe")
        .contentDocument.querySelector(
          'div[data-element="signatureToolButton"]'
        )
        .firstChild.click();
    }
  }

  async function saveChangesToCloud(docPath) {
    setDocumentSaving(true);
    const doc = viewer.docViewer.getDocument();
    const xfdfString = await viewer.annotManager.exportAnnotations();

    const options = { xfdfString, flatten: false };
    const data = await doc.getFileData(options);
    const arr = new Uint8Array(data);
    const docBlob = new Blob([arr], { type: "application/pdf" });

    let fileRef = myStorage.ref().child(docPath);
    fileRef.put(docBlob).then((snapshot) => {
      if (snapshot.totalBytes === snapshot.bytesTransferred) {
        setDocumentSaving(false);
      }
    });
  }

  useEffect(() => {
    if (props.location) {
      webviewer({ path: "/webviewer/lib" }, viewerRoot.current)
        .then((viewerInstance) => {
          const { docViewer, annotManager, FitMode } = viewerInstance;
          viewerInstance.disableElements(diabledElements);
          viewer = viewerInstance;

          fetchAndSetDocument(props.location.state.location);
          docViewer.on("documentLoaded", () => {
            viewerInstance.setFitMode(FitMode.FitPage);
            annotManager.setCurrentUser(localStorage.Id); // Setting the current user
          });

          annotManager.on("annotationChanged", () => {});
        })
        .catch((err) => {
          console.error(err);
          window.location.href = `/documents/${props.location.state.title}`;
        });
    }
  }, []);

  if (props.location) {
    return (
      <>
        <div className="document-viewer-container" ref={viewerRoot} />
        {documentSaving && (
          <CircularProgress className="documents-viewer-circular-progress" />
        )}
        <Button>
          <CreateRounded
            className={
              documentSaving !== true
                ? "document-viewer-signature-btn"
                : "document-viewer-signature-btn-disabled"
            }
            onClick={() => {
              if (documentSaving !== true) showSignaturePanel();
            }}
          />
        </Button>
        <Button>
          <SaveOutlined
            className={
              documentSaving !== true
                ? "document-viewer-save-btn"
                : "document-viewer-save-btn-disbaled"
            }
            onClick={() => {
              if (documentSaving !== true)
                saveChangesToCloud(props.location.state.location);
            }}
            disabled={documentSaving}
          />
        </Button>
        <Button
          onClick={() => history.push("/documents")}
          disabled={documentSaving}
        >
          <ArrowBack className="document-viewer-back-button" />
        </Button>
      </>
    );
  } else {
    // error occured page here
  }
}

export default DocumentViewer;
