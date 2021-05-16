import React, { useEffect, useState } from "react";
import { Scaffold, SearchBar } from "../utilities/core";
import NoDoc from "../../assets/Documents-Img.png";
import DocumentCard from "./DocumentCard";
import { SearchIcon } from "@primer/octicons-react";
import "./Documents.css";

import { Grid, Divider, Box, CircularProgress } from "@material-ui/core";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchUser } from "../../actions/userActions";

const mapStateToProps = (state) => ({
  utils: state.utils,
  roadmap: state.roadmap,
  user: state.user,
});

const mapActionsToProps = (dispatch) => {
  return bindActionCreators({ fetchUser }, dispatch);
};

function Documents(props) {
  let [documents, setDocuments] = useState(null);
  let [filteredDocuments, setFilteredDocuments] = useState(null);

  useEffect(async () => {
    if (props.utils.reload === true) props.fetchUser();
    // Dummy values
    const _documents = await _dummyApi();

    setDocuments(_documents);
    setFilteredDocuments(_documents);

    return () => {
      // Cleanup
    };
  }, []);

  const _dummyApi = (emptyResponse = false, timeout = 2000) => {
    return new Promise((resolve, _) => {
      const _documents = [
        // {
        //   id: "reqsqwexyg",
        //   name: "Document 1",
        //   creator: "John Doe",
        //   path: "",
        // },
        // {
        //   id: "fhuwierwieo",
        //   name: "Document 2",
        //   creator: "You",
        //   path: "",
        // },
        // {
        //   id: "sjqiwuewdad",
        //   name: "Document 3",
        //   creator: "Mr. Bean",
        //   path: "",
        // },
        // {
        //   id: "ascnoqwewqe",
        //   name: "Document 4",
        //   creator: "Mr. Bean",
        //   path: "",
        // },
      ];

      setTimeout(() => {
        resolve(emptyResponse ? [] : _documents);
      }, timeout);
    });
  };

  const PrimaryContent = () => {
    if (documents === null || filteredDocuments === null) {
      return (
        <div className="documents-single-view-container">
          <CircularProgress />

          <div
            style={{
              marginTop: 50,
              fontSize: 20,
            }}
          >
            Fetching Documents...
          </div>
        </div>
      );
    } else if (documents.length === 0) {
      // If there are no documents that are uploaded for the user
      return (
        <div className="documents-single-view-container">
          <img src={NoDoc} alt="" />

          <h2 className="documents-subheading">
            Find all your documents right here!
          </h2>

          <p className="documents-text">
            View all the documents uploaded in your transaction all in one
            place...
          </p>
        </div>
      );
    } else if (filteredDocuments.length === 0) {
      // If no documents matched the search term
      return (
        <div
          className="documents-single-view-container"
          style={{ textAlign: "center" }}
        >
          <Grid
            item
            style={{
              paddingBottom: 20,
              opacity: 0.5,
            }}
          >
            <SearchIcon size={150} />
          </Grid>
          <Grid item>
            <Box marginTop={-3} component="h1">
              <h4>No results found</h4>
            </Box>
          </Grid>
          <Grid item>
            <Box
              marginTop={-2}
              style={{ fontSize: 18, fontFamily: "Open Sans" }}
            >
              The entered search term did not match any documents
            </Box>
          </Grid>
        </div>
      );
    } else {
      // If documents are present to be rendered
      return (
        <div>
          <div style={{ marginTop: 20, marginBottom: 20 }}>
            <div className="documents-heading-2">Pre-approval</div>

            <Divider variant="fullWidth" className="doc-divider" />
          </div>

          <Grid container spacing={2}>
            {filteredDocuments.map((docData) => (
              <DocumentCard key={docData.id} docData={docData} />
            ))}
          </Grid>
        </div>
      );
    }
  };

  return (
    <Scaffold bottomNav bottomNavActive="Documents">
      <Grid container direction="column">
        <div className="page-header">
          <h1 className="documents-heading">Documents</h1>

          {documents && (
            <SearchBar
              filterByFields={["name", "creator"]}
              list={documents}
              onUpdate={(filtered) => {
                setFilteredDocuments(filtered);
              }}
            />
          )}
        </div>

        {PrimaryContent()}
      </Grid>
    </Scaffold>
  );
}

export default connect(mapStateToProps, mapActionsToProps)(Documents);
