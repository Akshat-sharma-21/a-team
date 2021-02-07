import React from "react";
import DocUploadModal from "./uploader/DocUploadModal";
import UserAvatar from "../../assets/user.png";
import PdfLogo from "../../assets/pdf_icon_duotone.svg";
import { ReactComponent as StampIcon } from "../../assets/stamp_icon.svg";
import NoDocument from "../../assets/no-document-image.png";
import CardThumbnail from "./CardThumbnail";
import { NavLink } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";

import {
  ReallosModal,
  ModalActionFooter,
  ReallosButton,
  Scaffold,
  SearchBar,
  ReallosPageHeader,
} from "../utilities/core";

import {
  getTransactionID,
  getEffectiveDocumentName,
  getCurrentUser,
  getPeopleInvolved,
  getDecodedHash,
} from "../../utils";

import {
  Grid,
  Box,
  Typography,
  Fab,
  Avatar,
  Card,
  CardContent,
  IconButton,
  Snackbar,
  Menu,
  MenuItem,
} from "@material-ui/core";

import {
  ArrowUpIcon,
  KebabHorizontalIcon,
  PackageIcon,
  PaperAirplaneIcon,
  DownloadIcon,
  SearchIcon,
} from "@primer/octicons-react";

import "./Documents.css";

const styles = (theme) => ({
  docCardUserAvatar: {
    width: 30,
    height: 30,
  },
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

    this.RenderDocumentCards = this.RenderDocumentCards.bind(this);
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
   * Returns URL of thumbnail for a PDF.
   */
  async getThumbnail(docName) {
    try {
      /*
        Uses Firebase
        @TODO: Logic to be replaced
      */

      // const thumbnailRef = myStorage
      //   .ref()
      //   .child(
      //     `${
      //       this.transactionID
      //     }/documents/thumbnails/${getEffectiveDocumentName(docName)}.png`
      //   );

      // const thumbnailUrl = await thumbnailRef.getDownloadURL();
      // return thumbnailUrl;
    } catch (e) {
      // Fallback: return null
      return;
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

    let documents = [
      {
        name: 'Document 1',
        creator: 'John Doe',
        path: ''
      },
      {
        name: 'Document 2',
        creator: 'You',
        path: ''
      },
      {
        name: 'Document 3',
        creator: 'Mr. Bean',
        path: ''
      },
      {
        name: 'Document 4',
        creator: 'Mr. Bean',
        path: ''
      },
    ]

    this.setState({
      documents,
    });
  }

  /**
   * Renders document cards on the document dashboard
   */
  RenderDocumentCards() {
    const { classes } = this.props;

    if (this.state.filteredDocumentsList === null) {
      // If documents are not fetched

      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            textAlign: "center",
            marginTop: 30,
          }}
        >
          <h1>Just a moment...</h1>
          <p style={{ fontSize: 20, marginTop: 0 }}>
            We are fetching your documents.
          </p>
        </div>
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
          <Grid item style={{marginTop: 20}}>
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
          <Grid item style={{
            paddingTop: 50,
            paddingBottom: 60,
            opacity: 0.5
          }}>
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
            <Grid
              item xs={12} sm={6} md={4} lg={3}
              style={{
                opacity: 0,
                animation: `slide-up-anim 150ms ease-out ${
                  itemIndex * 25
                }ms forwards`,
              }}
              key={docData.name}
            >
              <div className="doc-card-root">
                <IconButton
                  className="doc-card-top-action-btn"
                  onClick={(event) =>
                    this.openMenu(event.currentTarget, docData)
                  }
                >
                  <KebabHorizontalIcon />
                </IconButton>

                <div className="doc-card-main">
                  <NavLink
                    to={{
                      pathname: `/transaction/${this.transactionID}/document/${docData.name}`,
                      state: docData,
                    }}
                  >
                    <Card
                      className={
                        "doc-card " +
                        (getDecodedHash(this.props.location) ===
                        `#${docData.name}`
                          ? "paper-highlight"
                          : "")
                      }
                      title={docData.name}
                    >
                      <CardThumbnail
                        getThumbnailFunction={() =>
                          this.getThumbnail(docData.name)
                        }
                      />

                      <CardContent
                        style={{
                          maxWidth: 300,
                          minWidth: 250,
                        }}
                      >
                        <h2
                          style={{
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {getEffectiveDocumentName(docData.name)}
                        </h2>

                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                          }}
                        >
                          <Avatar
                            className={classes.docCardUserAvatar}
                            src={UserAvatar}
                          />

                          <span style={{ marginLeft: 10 }}>
                            Uploaded by <strong>{docData.creator}</strong>
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </NavLink>
                </div>
              </div>
            </Grid>
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
                this.dismissMenu();
              }}
            >
              <div style={{ margin: "auto 20px auto 0" }}>
                <DownloadIcon size={20} />
              </div>
              Download
            </MenuItem>
            <MenuItem
              onClick={() => {
                this.dismissMenu();
              }}
            >
              <div style={{ margin: "auto 20px auto 0" }}>
                <StampIcon />
              </div>
              Sign the document
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
    return (
      <Scaffold navBar navRail>
        <ReallosPageHeader
          transactionName="Transaction 1"
          pageName="Documents"
        />

        <div style={{
          paddingBottom: 20,
          paddingTop: 20,
          display: (this.state.documents?.length === 0) ? 'none' : 'block',
          background: '#eeeeeee8',
          position: 'sticky',
          top: 84,
          zIndex: 120
        }}>
          <SearchBar
            placeholder="Search by document name and creator"
            list={this.state.documents}
            filterByFields={[
              'name',
              'creator'
            ]}
            onUpdate={(filteredDocumentsList) => {
              this.setState({
                filteredDocumentsList
              });
            }}
          />
        </div>
        <this.RenderDocumentCards />
        <Grid
          container
          direction="row"
          justify="flex-end"
          alignItems="flex-end"
        >
          <Fab
            variant="extended"
            className="reallos-fab"
            size="large"
            onClick={this.showUploadModalVisibility}
          >
            <ArrowUpIcon className="fab-icon" size={20} /> &nbsp;
            Upload Document
          </Fab>
        </Grid>

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

export default withStyles(styles)(Documents);
