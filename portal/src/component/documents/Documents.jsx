import React from "react";
import DocUploadModal from "./uploader/DocUploadModal";
import PdfLogo from "../../assets/pdf_icon_duotone.svg";
import NoDocument from "../../assets/no-document-image.png";
import Skeleton from "@material-ui/lab/Skeleton";
import { myFirestore, myStorage } from "../../FirebaseConfig";
import DocumentCard from "./DocumentCard";
import "./Documents.css";

import {
  ReallosModal,
  ModalActionFooter,
  ReallosButton,
  Scaffold,
  SearchBar,
  ReallosPageHeader,
  ReallosFab,
} from "../utilities/core";

import {
  getTransactionID,
  getEffectiveDocumentName,
  getCurrentUser,
  getPeopleInvolved,
  getUserName,
} from "../../utils";

import {
  Grid,
  Box,
  Typography,
  Snackbar,
  Menu,
  MenuItem,
} from "@material-ui/core";

import {
  ArrowUpIcon,
  PaperAirplaneIcon,
  DownloadIcon,
  SearchIcon,
} from "@primer/octicons-react";

import { connect } from "react-redux";

const mapStateToProps = (state) => ({
  user: state.user,
});

class Documents extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isUploadModalVisible: false,
      isSnackbarVisible: false,
      isDocumentExistsModalVisible: false,
      uploadFileName: null,
      snackbarMessage: null,
      documents: null,
      filteredDocumentsList: null,
      menuAnchorElement: null,
      menuTagetDocumentData: {
        name: "",
        creator: "",
        path: "",
      },
    };

    this.PrimaryContent = this.PrimaryContent.bind(this);
    this.showUploadModalVisibility = this.showUploadModalVisibility.bind(this);
    this.dismissUploadModal = this.dismissUploadModal.bind(this);
    this.showSnackbar = this.showSnackbar.bind(this);
    this.dismissSnackbar = this.dismissSnackbar.bind(this);
    this.setDocumentList = this.setDocumentList.bind(this);
    this.transactionID = getTransactionID(this.props.location);
  }

  componentDidMount() {
    this.setDocumentList();
  }

  /**
   * Show document upload modal.
   */
  showUploadModalVisibility() {
    this.setState({
      isUploadModalVisible: true,
    });
  }

  /**
   * Dismiss document upload modal.
   */
  dismissUploadModal() {
    this.setState({
      isUploadModalVisible: false,
    });
  }

  /**
   * Display a snackbar.
   *
   * @param {string} message
   * Message to be displayed inside the snackbar.
   */
  showSnackbar(message) {
    this.setState({
      isSnackbarVisible: true,
      snackbarMessage: message,
    });
  }

  /**
   * Dismiss a snackbar.
   */
  dismissSnackbar() {
    this.setState({
      isSnackbarVisible: false,
    });
  }

  /**
   * Sets the anchor element for document menu.
   *
   * @param {HTMLButtonElement} menuAnchorElement
   * The element to be used as menu anchor.
   * Pass `event.targetElement` as the argument.
   *
   * @param {object} menuTagetDocumentData
   * The `docData` of the target document.
   */
  openMenu(menuAnchorElement, menuTagetDocumentData) {
    this.setState({
      menuAnchorElement,
      menuTagetDocumentData,
    });
  }

  /**
   * Sets the anchor element to null in order to
   * dismiss the menu.
   */
  dismissMenu() {
    this.setState({
      menuAnchorElement: null,
    });
  }

  /**
   * Downloads the document to the client's device.
   *
   * @param {object} documentData
   * Data of the associated document to be downloaded.
   *
   * @todo Check if this function works when the origin
   * for CORS is changed in the backend.
   */
  async downloadDocument(documentData) {
    const downloadLink = await myStorage
      .ref(documentData.path)
      .getDownloadURL();
    const documentName = getEffectiveDocumentName(documentData.name);
    const response = await fetch(downloadLink);

    if (response.ok) {
      const responseBlob = await response.blob();
      const objectUrl = window.URL.createObjectURL(responseBlob);

      const anchor = document.createElement("a");
      anchor.href = objectUrl;
      anchor.download = `Reallos - ${documentName}.pdf`;
      anchor.dispatchEvent(new MouseEvent("click"));
    }
  }

  /**
   * Sets `document` state to documents in cloud.
   */
  async setDocumentList() {
    /*
      Return dummy. (Uses Firebase)
      @TODO: Logic to be replaced
    */

    let documentsDataSnapshot = await myFirestore
      .collection("Transactions")
      .doc(this.transactionID)
      .collection("documents")
      .get();

    let documents = [];
    let peopleList = await getPeopleInvolved(this.transactionID);

    documentsDataSnapshot.docs.map((doc) => {
      let documentMetadata = doc.data();

      let documentRef = myStorage.ref().child(documentMetadata.path);
      let creator = "Unknown";
      let filteredPeopleList = peopleList.filter(
        (person) => person.Email === documentMetadata.creator
      );

      if (documentMetadata.creator === getCurrentUser().email) {
        creator = "You";
      } else if (filteredPeopleList[0]?.Email === documentMetadata.creator) {
        creator = getUserName(filteredPeopleList[0].Email, peopleList);
      }

      documents.push({
        name: documentRef.name,
        creator: creator,
        creatorEmail: documentMetadata.creator,
        path: documentMetadata.path,
      });

      return null;
    });

    this.setState({
      documents,
      filteredDocumentsList: documents,
    });
  }

  /**
   * Renders primary content on the document dashboard
   * based on current state.
   */
  PrimaryContent() {
    if (this.state.filteredDocumentsList === null) {
      // If documents are not fetched

      return (
        <Grid container spacing={2}>
          {Array(8)
            .fill(0)
            .map(() => (
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <Skeleton
                  animation="wave"
                  variant="rect"
                  height={350}
                  style={{ borderRadius: 10 }}
                />
              </Grid>
            ))}
        </Grid>
      );
    } else if (this.state.documents.length === 0) {
      // If no document documents are present.

      return (
        <Grid
          container
          direction="column"
          alignItems="center"
          justify="center"
          spacing={2}
          className="zoom-in-animation"
        >
          <Grid item style={{ marginTop: 20 }}>
            <img
              src={NoDocument}
              className="no-document-image"
              alt="Empty Document"
            />
          </Grid>
          <Grid item>
            <Box marginTop={-3} marginLeft={4}>
              <Typography className="document-heading reallos-text">
                Your documents go here...
              </Typography>
            </Box>
          </Grid>
          <Grid item>
            <Box marginTop={-1} marginLeft={4}>
              <Typography className="document-subheading reallos-text">
                Store and E-sign all your documents hassle free here!
              </Typography>
            </Box>
          </Grid>
        </Grid>
      );
    } else if (this.state.filteredDocumentsList.length === 0) {
      // If no document documents are present.

      return (
        <Grid
          container
          direction="column"
          alignItems="center"
          justify="center"
          spacing={2}
          className="zoom-in-animation"
        >
          <Grid
            item
            style={{
              paddingTop: 50,
              paddingBottom: 60,
              opacity: 0.5,
            }}
          >
            <SearchIcon size={150} />
          </Grid>
          <Grid item>
            <Box marginTop={-3} marginLeft={4}>
              <Typography className="document-heading reallos-text">
                No results found
              </Typography>
            </Box>
          </Grid>
          <Grid item>
            <Box marginTop={-1} marginLeft={4}>
              <Typography className="document-subheading reallos-text">
                The entered search term did not match any documents
              </Typography>
            </Box>
          </Grid>
        </Grid>
      );
    } else {
      // If document documents are present.

      return (
        <Grid container className="doc-card-group">
          {this.state.filteredDocumentsList.map((docData, itemIndex) => (
            <DocumentCard
              key={docData.name}
              docData={docData}
              onOpenMenu={(event) =>
                this.openMenu(event.currentTarget, docData)
              }
              itemIndex={itemIndex}
              locationObject={this.props.location}
            />
          ))}

          <Menu
            open={!!this.state.menuAnchorElement}
            anchorEl={this.state.menuAnchorElement}
            onClose={() => this.dismissMenu()}
            anchorOrigin={{ horizontal: "left", vertical: "top" }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            className="reallos-menu-root"
          >
            <MenuItem
              onClick={() => {
                this.dismissMenu();
              }}
            >
              <div style={{ margin: "auto 20px auto 0" }}>
                <PaperAirplaneIcon size={19} />
              </div>
              Send Document
            </MenuItem>
            <MenuItem
              onClick={() => {
                this.showSnackbar("Preparing document for download...");

                this.downloadDocument(this.state.menuTagetDocumentData);
                this.dismissMenu();
              }}
            >
              <div style={{ margin: "auto 20px auto 0" }}>
                <DownloadIcon size={20} />
              </div>
              Download
            </MenuItem>
          </Menu>

          <ReallosModal
            title="Can't Upload"
            visible={this.state.isDocumentExistsModalVisible}
            dismissCallback={() =>
              this.setState({ isDocumentExistsModalVisible: false })
            }
            modalWidth={700}
          >
            <Box
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                marginTop: 30,
              }}
            >
              <img
                src={PdfLogo}
                alt=""
                style={{ marginRight: 30, width: 80 }}
              />

              <div style={{ fontSize: 18 }}>
                You cannot upload "
                <strong>
                  {getEffectiveDocumentName(this.state.uploadFileName)}
                </strong>
                " as it already exists in this transaction. If you want to
                upload this document, delete the existing document first.
              </div>
            </Box>

            <ModalActionFooter>
              <ReallosButton
                primary
                onClick={() =>
                  this.setState({ isDocumentExistsModalVisible: false })
                }
              >
                Close
              </ReallosButton>
            </ModalActionFooter>
          </ReallosModal>
        </Grid>
      );
    }
  }

  render() {
    const isLender = this.props.user.Role === "lender" ? true : false;
    return (
      <Scaffold navBar navRail={!isLender}>
        <div
          style={{
            background: "#eeeeee",
            position: "sticky",
            top: 84,
            zIndex: 120,
          }}
        >
          <ReallosPageHeader
            transactionName="Transaction 1"
            pageName="Documents"
          />

          <div
            style={{
              paddingBottom: 20,
              paddingTop: 20,
            }}
          >
            {(() => {
              if (this.state.documents === null) {
                return (
                  <Skeleton
                    animation="wave"
                    variant="rect"
                    height={56}
                    style={{ borderRadius: 10 }}
                  />
                );
              } else if (this.state.documents.length !== 0) {
                return (
                  <SearchBar
                    placeholder="Search by document name and creator"
                    list={this.state.documents}
                    filterByFields={["name", "creator", "creatorEmail"]}
                    onUpdate={(filteredDocumentsList) => {
                      this.setState({
                        filteredDocumentsList,
                      });
                    }}
                  />
                );
              } else {
                return <React.Fragment />;
              }
            })()}
          </div>
        </div>

        <this.PrimaryContent />

        <ReallosFab
          title="Upload Document"
          LeadingIcon={<ArrowUpIcon size={20} />}
          onClick={this.showUploadModalVisibility}
        />

        <DocUploadModal
          dismissCallback={this.dismissUploadModal}
          visible={this.state.isUploadModalVisible}
          showSnackbarCallback={this.showSnackbar}
          onSuccessCallback={() => this.setDocumentList()}
          onFileExistsCallback={(filename) => {
            this.setState({
              isDocumentExistsModalVisible: true,
              uploadFileName: filename,
            });
          }}
        />
        <Snackbar
          open={this.state.isSnackbarVisible}
          onClose={this.dismissSnackbar}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          message={this.state.snackbarMessage}
        />
      </Scaffold>
    );
  }
}

export default connect(mapStateToProps)(Documents);
