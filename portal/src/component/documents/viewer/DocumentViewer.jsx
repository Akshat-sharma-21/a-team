import React from "react";
import { NavLink } from "react-router-dom";
import { ReactComponent as StampIcon } from "../../../assets/stamp_icon.svg";
import DocUploadStatus from "../uploader/DocUploadStatus";
// import { myStorage } from "../../Config/MyFirebase.js";
import { getCurrentUser, getTransactionID } from "../../../utils";
import WebViewer from '@pdftron/webviewer';

import {
  ReallosModal,
  ModalActionFooter,
  ReallosPageHeader,
  ReallosButton,
  ReallosFab,
  Scaffold
} from '../../utilities/core';

import {
  Grid,
  Box,
  Divider,
  Snackbar,
} from "@material-ui/core";

import "./DocumentViewer.css";

/**
 * Component for viewing, editing & saving
 * documents
 *
 * @augments React.Component<Props>
 */
class DocumentViewer extends React.Component {
  constructor() {
    super();

    this.state = {
      hasChanges: false,
      isLoadingDocument: true,
      isUploadModalVisible: false,
      isResetModalVisible: false,
      isSnackbarVisible: false,
      snackbarMessage: null,
      uploadTaskStatus: {
        filename: "",
        progress: 0,
        isPaused: false,
        uploadTask: null,
      },
    };

    this.documentLink = null;
    this.viewerRoot = React.createRef();
  }

  componentDidMount() {
    if (this.getState) {
      WebViewer(
        { path: '/webviewer/lib', fullAPI: true },
        this.viewerRoot.current
      )
        .then(viewerInstance => {
          const { docViewer, annotManager, FitMode } = viewerInstance;
          this.viewer = viewerInstance;
          this.setDocument(this.getState.path);

          docViewer.on('documentLoaded', () => {
            this.setDocumentLoaded();
            viewerInstance.setFitMode(FitMode.FitWidth);
            annotManager.setCurrentUser(getCurrentUser().email);
          });

          annotManager.on('annotationChanged', () => {
            this.setDocumentChanged();
          });
        });
    }
  }

  /**
   * Show signature panel provided by **PDFTron**
   *
   * @returns {void}
   * Void
   */
  async showSignaturePanel() {
    if (this.viewerRoot.current.querySelector('iframe').contentDocument)
      this.viewerRoot.current.querySelector('iframe').contentDocument.querySelector(
        'div[data-element="signatureToolButton"]'
      ).firstChild.click();
  }

  /**
   * Set document within the viewer using relative document path.
   *
   * @param {string} docPath
   * Relative path to the document in Firebase Storage.
   *
   * @returns {Promise<void>}
   * Void
   */
  async setDocument(docPath) {
    // @TODO
    // DUMMY value

    // let downloadLink = await myStorage.ref(docPath).getDownloadURL();
    let downloadLink = '/SamplePDF.pdf';
    this.viewer.loadDocument(downloadLink);
    this.documentLink = downloadLink;
  }

  /**
   * Resets the document in the viewer.
   *
   * Call to this function will not do anything
   * if `setDocument` was not called initially.
   */
  resetDocument() {
    if (this.documentLink) {
      this.viewer.loadDocument(this.documentLink);

      this.setState({
        hasChanges: false,
      });
    }
  }

  /**
   * Saves the changes made in the PDF viewer to
   * the cloud **(Firebase)**.
   *
   * @param {string} docPath
   * Relative path to the document in Firebase Storage.
   *
   * @returns {Promise<void>}
   * Void
   */
  async saveChangesToCloud(docPath) {
    // @TODO
    // DUMMY: Do nothing
    
    // const doc = this.viewer.docViewer.getDocument();
    // const xfdfString = await this.viewer.annotManager.exportAnnotations();
    // const options = { xfdfString, flatten: true };
    // const data = await doc.getFileData(options);
    // const arr = new Uint8Array(data);
    // const docBlob = new Blob([arr], { type: 'application/pdf' });

    // let fileRef = myStorage.ref().child(docPath);
    // let uploadTask = fileRef.put(docBlob);

    // uploadTask.on("state_changed", (snapshot) => {
    //   let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    //   let isPaused = snapshot.state === "paused";

    //   let newUploadTaskDetails = {
    //     filename: this.getState.name,
    //     progress,
    //     isPaused,
    //     uploadTask,
    //   };

    //   this.setState({
    //     isUploadModalVisible: true,
    //     uploadTaskStatus: newUploadTaskDetails,
    //   });
    // });
  }

  /**
   * Resets upload status.
   */
  dismissUploadModalCallback() {
    this.setState({
      isUploadModalVisible: false,
      uploadTaskStatus: {
        progress: 0,
        isPaused: false,
        uploadTask: null,
      },
    });
  }

  /**
   * Set `isLoadingDocument` state to false when
   * document is loaded in the viewer.
   */
  setDocumentLoaded() {
    this.setState({
      isLoadingDocument: false,
    });
  }

  /**
   * Set `hasChanges` state when document changed.
   */
  setDocumentChanged() {
    this.setState({
      hasChanges: true,
    });
  }

  /**
   * Getter which returns the state information (document metadata)
   * from props.
   *
   * @returns {object | null}
   * Document Metadata passed by `Paperwork` component
   */
  get getState() {
    return this.props.location ? this.props.location.state : null;
  }

  render() {
    const transactionId = getTransactionID(this.props.location);
    
    if (this.getState) {
      // Proceed if document metadata is available in props
      const docData = this.getState;

      return (
        <Scaffold navBar navRail>
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
                <NavLink to={`/transactions/${transactionId}/documents`} className="link">
                  Documents
                </NavLink>
                <span style={{ margin: "0 10px" }}>/</span>
                {docData.name}
              </div>

              <div style={{
                display: 'flex',
                gap: 10
              }}>
                <ReallosButton
                  secondaryButtonBgColor="#eeeeee"
                  disabled={!this.state.hasChanges}
                  onClick={() => {
                    this.setState({
                      isResetModalVisible: true,
                    });
                  }}
                >
                  Revert Changes
                </ReallosButton>

                <ReallosButton
                  primary
                  disabled={!this.state.hasChanges}
                  onClick={() => this.saveChangesToCloud(docData.path)}
                >
                  Save Changes
                </ReallosButton>
              </div>
            </div>
          </Box>

          {/* Holds the PDF Viewer */}
          <div className="pdf-viewer-root" ref={this.viewerRoot} />

          <ReallosModal
            title="Saving Changes"
            visible={this.state.isUploadModalVisible}
            dismissCallback={() => this.dismissUploadModalCallback()}
            modalWidth={700}
          >
            <DocUploadStatus
              showSnackbarCallback={(message) => {
                this.setState({
                  isSnackbarVisible: true,
                  snackbarMessage: message,
                });
              }}
              dismissCallback={() => this.dismissUploadModalCallback()}
              uploadStatus={this.state.uploadTaskStatus}
              isSavingDocument={true}
            />
          </ReallosModal>
          <ReallosModal
            title="Revert Changes"
            visible={this.state.isResetModalVisible}
            dismissCallback={() =>
              this.setState({ isResetModalVisible: false })
            }
            modalWidth={700}
          >
            This will reset all the changes you have made to this document after
            the last save.
            <br />
            This action cannot be undone. Are you sure to continue?

            <ModalActionFooter>
              <ReallosButton
                onClick={() => {
                  this.setState({ isResetModalVisible: false });
                }}
              >
                Cancel
              </ReallosButton>

              <ReallosButton
                primary
                onClick={() => {
                  this.setState({ isResetModalVisible: false });
                  this.resetDocument();
                }}
              >
                Revert Changes
              </ReallosButton>
            </ModalActionFooter>
          </ReallosModal>
          <Snackbar
            open={this.state.isSnackbarVisible}
            onClose={() => this.setState({ isSnackbarVisible: false })}
            anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
            message={this.state.snackbarMessage}
          />
          {/* PRELOADER - Use Skeleton */}

          {/* <ReallosLoaderWithOverlay
            visible={this.state.isLoadingDocument}
            strokeWidth={4}
          /> */}

          <div style={{display: 'block'}}>
            <ReallosFab
              LeadingIcon={
                <StampIcon
                  fill="var(--color-primary)"
                />
              }
              title="E-Sign Document"
              onClick={() => this.showSignaturePanel()}
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
              <NavLink to={`/transactions/${transactionId}/documents`} className="link">
                Documents
              </NavLink>
              &nbsp;and select the document you want to view.
            </p>
          </Grid>
        </Scaffold>
      );
    }
  }
}

export default DocumentViewer;
