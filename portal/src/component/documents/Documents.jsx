import React, { useState } from "react";
import DocUploadModal from "./uploader/DocUploadModal";
import PdfLogo from "../../assets/pdf_icon_duotone.svg";
import NoDocument from "../../assets/no-document-image.png";
import Skeleton from "@material-ui/lab/Skeleton";
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
import { getAllDocuments, downloadPdf } from "../../actions/documentsActions"; // Function to get all the documents
import { fetchUser } from "../../actions/userActions";
import { setReload } from "../../actions/utilActions";
import { useParams } from "react-router";
import { bindActionCreators } from "redux";

const mapStateToProps = (state) => ({
  user: state.user,
  utils: state.utils,
  transaction: state.transaction,
});

const mapActionToProps = (dispatch) => {
  return bindActionCreators({ fetchUser, setReload }, dispatch);
};

function Documents(props) {
  let { tid } = useParams(); // Getting the transaciton id
  let [documentSet, updateDocumentSet] = useState(false);
  let [documentList, setDocumentList] = useState(null);
  let [filteredList, setFilteredList] = useState(null);
  let [menuAnchorElement, setMenuAnchorElement] = useState(null); // To store which document to open
  let [menuTargetMetaData, setMenuTargetMetaData] = useState(null); // To store the data of the document that is opened
  let [uploadModal, setUploadModal] = useState(false);
  let [successfulUpload, setSuccessfulUpload] = useState(false); // If a new document has been uploaded
  let [snackBarVisible, setSnackBarVisible] = useState(false); // If the snackbar is visible
  let [snackBarMessage, setSnackBarMessage] = useState(null); // To store the message of snackbar
  let [fileExistsModal, setFileExitsModal] = useState(false);
  let [existingFile, setExistingFile] = useState(null);

  if (successfulUpload === true) {
    // If the document has been successfully uploaded
    updateDocumentSet(false);
    props.setReload(true);
    props.fetchUser();
    setSuccessfulUpload(false);
  }

  if (props.utils.reload === false && documentSet === false) {
    // If the user has been loaded but the document is not set
    let documents = getAllDocuments(
      props.transaction.filter((transaction) => transaction.id === tid)[0] // Setting the documents
    );
    setDocumentList(documents); // Setting the Documents List
    setFilteredList(documents); // Setting the Filtered List
    updateDocumentSet(true);
  }
  const PrimaryContent = () => {
    if (documentSet === false) {
      // If the document is not loaded and set
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
    } else if (documentSet === true && documentList.length === 0) {
      // If no documents are present
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
    } else if (documentSet === true && filteredList.length === 0) {
      // If no document is found in the search
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
      // To display the documents
      return (
        <Grid container className="doc-card-group">
          {filteredList.map((docData, itemIndex) => (
            <DocumentCard
              key={docData.id}
              docData={docData}
              itemIndex={itemIndex}
              userRole={props.user.Role}
              onOpenMenu={(event) => {
                setMenuAnchorElement(event.currentTarget);
                setMenuTargetMetaData(docData);
              }}
              locationObject={props.location}
            />
          ))}
          <Menu
            open={!!menuAnchorElement}
            anchorEl={menuAnchorElement}
            onClose={() => {
              setMenuAnchorElement(null);
              setMenuTargetMetaData(null);
            }}
            anchorOrigin={{ horizontal: "left", vertical: "top" }}
            transformOrigin={{ horizontal: "left", vertical: "top" }}
            className="reallos-menu-root"
          >
            <MenuItem
              onClick={() => {
                setMenuAnchorElement(null);
                setMenuTargetMetaData(null);
              }}
            >
              <div style={{ margin: "auto 20px auto 0" }}>
                <PaperAirplaneIcon size={19} />
              </div>
              Send Document
            </MenuItem>
            <MenuItem
              onClick={() => {
                downloadPdf(menuTargetMetaData); // Sending the metadata of the currently open document
                setSnackBarMessage("Preparing document for download...");
                setSnackBarVisible(true);
                setMenuAnchorElement(null);
                setMenuTargetMetaData(null);
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
            visible={fileExistsModal}
            dismissCallback={() => setFileExitsModal(true)}
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
                You cannot upload "<strong>{existingFile}</strong>" as it
                already exists in this transaction. If you want to upload this
                document, delete the existing document first.
              </div>
            </Box>

            <ModalActionFooter>
              <ReallosButton primary onClick={() => setFileExitsModal(false)}>
                Close
              </ReallosButton>
            </ModalActionFooter>
          </ReallosModal>
        </Grid>
      );
    }
  };

  return (
    <Scaffold navBar navRail userRole={props.user.Role}>
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
            if (props.utils.loading === true || documentSet === false) {
              // if the component is loading
              return (
                <Skeleton
                  animation="wave"
                  variant="rect"
                  height={56}
                  style={{ borderRadius: 10 }}
                />
              );
            } else if (documentList.length !== 0) {
              return (
                <SearchBar
                  placeholder="Search by document name and creator"
                  list={documentList}
                  filterByFields={["name", "creator", "creatorEmail"]}
                  onUpdate={(filteredDocumentsList) => {
                    setFilteredList(filteredDocumentsList);
                  }}
                />
              );
            } else {
              return <></>;
            }
          })()}
        </div>
      </div>

      {PrimaryContent()}

      {props.utils.loading === false && ( // Only display the button when the data has been loaded
        <ReallosFab
          title="Upload Document"
          LeadingIcon={<ArrowUpIcon size={20} />}
          onClick={() => setUploadModal(true)}
        />
      )}

      <DocUploadModal
        dismissCallback={() => setUploadModal(false)}
        visible={uploadModal}
        onSuccessCallback={() => {
          setSuccessfulUpload(true);
        }}
        onFileExistsCallback={(fileName) => {
          setFileExitsModal(true);
          setExistingFile(fileName);
        }}
        Role={props.user.Role}
      />

      <Snackbar
        open={snackBarVisible}
        onClose={() => setSnackBarVisible(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        message={snackBarMessage}
      />
    </Scaffold>
  );
}

export default connect(mapStateToProps, mapActionToProps)(Documents);
