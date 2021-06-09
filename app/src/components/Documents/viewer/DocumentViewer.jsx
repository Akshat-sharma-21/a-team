import React, { useState, useRef, useEffect } from "react";
import { myStorage } from "../../../FirebaseConfig";
import { useHistory } from "react-router-dom";
import webviewer from "@pdftron/pdfjs-express";
import ExpressUtils from "@pdftron/pdfjs-express-utils";
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
  "header",
  "textToolGroupButton",
  "highlightToolButton",
  "highlightToolButton2",
  "highlightToolButton3",
  "highlightToolButton4",
  "underlineToolButton",
  "squigglyToolButton",
  "strikeoutToolButton",
  "stickyToolGroupButton",
  "underlineToolGroupButton",
  "strikeoutToolGroupButton",
  "freeHandToolGroupButton",
  "shapeToolGroupButton",
  "freeTextToolGroupButton",
  "squigglyToolGroupButton",
]; // Storing all the elements to disable

let viewer = null; // To store the viewer for the pdf
let documentLink = null; // To store the download link of the document
let expressUtils = new ExpressUtils(); // Add the  key here

function DocumentViewer(props) {
  let viewerRoot = useRef(null);
  let loadingRoot = React.createRef();
  let [documentSaving, setDocumentSaving] = useState(false);
  let history = useHistory();

  async function fetchAndSetDocument(docPath) {
    // function to get the url of the document
    let downloadUrl = await myStorage.ref(docPath).getDownloadURL();
    viewer.loadDocument(downloadUrl);
    documentLink = downloadUrl;
  }

  async function showSignaturePanel() {
    // function to show the signature panel
    viewer.openElements(["signatureModal"]);
  }
  async function saveChangesToCloud(docPath) {
    setDocumentSaving(true);
    const xfdfString = await viewer.annotManager.exportAnnotations();
    expressUtils.setFile(documentLink);
    expressUtils.setXFDF(xfdfString);
    const response = await expressUtils.merge(); // merging the pdf with the annotations
    let mergedBlob = await response.getBlob(); // getting the blob
    mergedBlob = mergedBlob.slice(0, mergedBlob.size, "application/pdf"); // setting the blob to be of type pdf

    let fileRef = myStorage.ref().child(docPath);
    fileRef.put(mergedBlob).then((snapshot) => {
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
