import React, { useEffect, useState } from "react";
import { Scaffold, SearchBar } from "../utilities/core";
import NoDoc from "../../assets/Documents-Img.png";
import DocumentCard from "./DocumentCard";
import { SearchIcon } from "@primer/octicons-react";
import "./Documents.css";

import { Grid, Box, CircularProgress } from "@material-ui/core";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchUser } from "../../actions/userActions";

const mapStateToProps = (state) => ({
  utils: state.utils,
  user: state.user,
  documents: state.documents,
});

const mapActionsToProps = (dispatch) => {
  return bindActionCreators({ fetchUser }, dispatch);
};

function Documents(props) {
  let [documents, setDocuments] = useState(null);
  let [filtered, setFiltered] = useState(null);
  let [preApprovalDocuments, setPreApprovalDocuments] = useState(null);
  let [findAgentDocuments, setFindAgentDocuments] = useState(null);
  let [findHomeDocuments, setFindHomeDocuments] = useState(null);
  let [homeInspectionDocuments, setHomeInspectionDocuments] = useState(null);
  let [escrowTitleDocuments, setEscrowTitleDocuments] = useState(null);
  let [homeInsuranceDocuments, setHomeInsuranceDocuments] = useState(null);
  let [closingDocuments, setClosingDocuments] = useState(null);
  let [documentSet, updateDocumentSet] = useState(false);

  useEffect(() => {
    if (props.utils.reload === true) props.fetchUser();
  }, []);

  if (props.utils.reload === false && documentSet === false) {
    let array = [];
    // If the user is fetched but the documents has not been set
    setPreApprovalDocuments(props.documents.PreApprovalDocuments);
    setFindAgentDocuments(props.documents.FindAgentDocuments);
    setFindHomeDocuments(props.documents.FindHomeDocuments);
    setHomeInspectionDocuments(props.documents.HomeInspectionDocuments);
    setEscrowTitleDocuments(props.documents.EscrowTitleDocuments);
    setHomeInsuranceDocuments(props.documents.HomeInsuranceDocuments);
    setClosingDocuments(props.documents.ClosingDocuments);
    //Storing all the documents in the documents array
    props.documents.PreApprovalDocuments.forEach((doc) => {
      array.push(doc);
    });
    props.documents.FindAgentDocuments.forEach((doc) => {
      array.push(doc);
    });
    props.documents.FindHomeDocuments.forEach((doc) => {
      array.push(doc);
    });
    props.documents.HomeInspectionDocuments.forEach((doc) => {
      array.push(doc);
    });
    props.documents.EscrowTitleDocuments.forEach((doc) => {
      array.push(doc);
    });
    props.documents.HomeInsuranceDocuments.forEach((doc) => {
      array.push(doc);
    });
    props.documents.ClosingDocuments.forEach((doc) => {
      array.push(doc);
    });
    setDocuments(array); // Storing all the documents in one array
    setFiltered(array); // Initially storing all the documents in filtered
    updateDocumentSet(true); // updating the state of documentSet
  } // All the documents set

  const PrimaryContent = () => {
    if (documentSet === false) {
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
    } else if (documents.length == 0) {
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
    } else if (filtered.length === 0) {
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
      if (documents.length === filtered.length) {
        // If all the documents are being showed
        return (
          <div>
            {preApprovalDocuments.length !== 0 && (
              <>
                <div style={{ marginTop: 20, marginBottom: 20 }}>
                  <div className="documents-heading-2">Pre-approval</div>
                </div>

                <Grid container spacing={2}>
                  {preApprovalDocuments.map((docData) => (
                    <DocumentCard key={docData.id} docData={docData} />
                  ))}
                </Grid>
              </>
            )}
            {findAgentDocuments.length !== 0 && (
              <>
                <div style={{ marginTop: 30, marginBottom: 20 }}>
                  <div className="documents-heading-2">Find Agent</div>
                </div>

                <Grid container spacing={2}>
                  {findAgentDocuments.map((docData) => (
                    <DocumentCard key={docData.id} docData={docData} />
                  ))}
                </Grid>
              </>
            )}
            {findHomeDocuments.length !== 0 && (
              <>
                <div style={{ marginTop: 30, marginBottom: 20 }}>
                  <div className="documents-heading-2">Find Home</div>
                </div>

                <Grid container spacing={2}>
                  {findHomeDocuments.map((docData) => (
                    <DocumentCard key={docData.id} docData={docData} />
                  ))}
                </Grid>
              </>
            )}
            {homeInspectionDocuments.length !== 0 && (
              <>
                <div style={{ marginTop: 30, marginBottom: 20 }}>
                  <div className="documents-heading-2">Home Inspection</div>
                </div>

                <Grid container spacing={2}>
                  {homeInspectionDocuments.map((docData) => (
                    <DocumentCard key={docData.id} docData={docData} />
                  ))}
                </Grid>
              </>
            )}
            {escrowTitleDocuments.length !== 0 && (
              <>
                <div style={{ marginTop: 30, marginBottom: 20 }}>
                  <div className="documents-heading-2">Escrow Title</div>
                </div>

                <Grid container spacing={2}>
                  {escrowTitleDocuments.map((docData) => (
                    <DocumentCard key={docData.id} docData={docData} />
                  ))}
                </Grid>
              </>
            )}
            {homeInsuranceDocuments.length !== 0 && (
              <>
                <div style={{ marginTop: 30, marginBottom: 20 }}>
                  <div className="documents-heading-2">Home Insurance</div>
                </div>

                <Grid container spacing={2}>
                  {homeInsuranceDocuments.map((docData) => (
                    <DocumentCard key={docData.id} docData={docData} />
                  ))}
                </Grid>
              </>
            )}
            {closingDocuments.length !== 0 && (
              <>
                <div style={{ marginTop: 30, marginBottom: 20 }}>
                  <div className="documents-heading-2">Closing</div>
                </div>

                <Grid container spacing={2}>
                  {closingDocuments.map((docData) => (
                    <DocumentCard key={docData.id} docData={docData} />
                  ))}
                </Grid>
              </>
            )}
          </div>
        );
      } else {
        // pa - Pre-Approval, fa - FindAgent, fh - FindHome, hi - Home Inspection, et - EscrowTitle, hin - Home Insurance, c = Closing
        let paId = [],
          faId = [],
          fhId = [],
          hiId = [],
          etId = [],
          hinId = [],
          cId = [];

        // Storing all the doc Ids and whether we should display a particular step or not
        preApprovalDocuments.forEach((doc) => {
          filtered.forEach((e) => {
            if (e.id === doc.id) {
              paId.push(e);
            }
          });
        });

        findAgentDocuments.forEach((doc) => {
          filtered.forEach((e) => {
            if (e.id === doc.id) {
              faId.push(e);
            }
          });
        });

        findHomeDocuments.forEach((doc) => {
          filtered.forEach((e) => {
            if (e.id === doc.id) {
              fhId.push(e);
            }
          });
        });

        escrowTitleDocuments.forEach((doc) => {
          filtered.forEach((e) => {
            if (e.id === doc.id) {
              etId.push(e);
            }
          });
        });

        homeInspectionDocuments.forEach((doc) => {
          filtered.forEach((e) => {
            if (e.id === doc.id) {
              hiId.push(e);
            }
          });
        });

        homeInsuranceDocuments.forEach((doc) => {
          filtered.forEach((e) => {
            if (e.id === doc.id) {
              hinId.push(e);
            }
          });
        });

        closingDocuments.forEach((doc) => {
          filtered.forEach((e) => {
            if (e.id === doc.id) {
              cId.push(e);
            }
          });
        });

        return (
          <div>
            {paId.length !== 0 && (
              <>
                <div style={{ marginTop: 20, marginBottom: 20 }}>
                  <div className="documents-heading-2">Pre-approval</div>
                </div>

                <Grid container spacing={2}>
                  {paId.map((docData) => (
                    <DocumentCard key={docData.id} docData={docData} />
                  ))}
                </Grid>
              </>
            )}
            {faId.length !== 0 && (
              <>
                <div style={{ marginTop: 30, marginBottom: 20 }}>
                  <div className="documents-heading-2">Find Agent</div>
                </div>

                <Grid container spacing={2}>
                  {faId.map((docData) => (
                    <DocumentCard key={docData.id} docData={docData} />
                  ))}
                </Grid>
              </>
            )}
            {fhId.length !== 0 && (
              <>
                <div style={{ marginTop: 30, marginBottom: 20 }}>
                  <div className="documents-heading-2">Find Home</div>
                </div>

                <Grid container spacing={2}>
                  {fhId.map((docData) => (
                    <DocumentCard key={docData.id} docData={docData} />
                  ))}
                </Grid>
              </>
            )}
            {hiId.length !== 0 && (
              <>
                <div style={{ marginTop: 30, marginBottom: 20 }}>
                  <div className="documents-heading-2">Home Inspection</div>
                </div>

                <Grid container spacing={2}>
                  {hiId.map((docData) => (
                    <DocumentCard key={docData.id} docData={docData} />
                  ))}
                </Grid>
              </>
            )}
            {etId.length !== 0 && (
              <>
                <div style={{ marginTop: 30, marginBottom: 20 }}>
                  <div className="documents-heading-2">Escrow Title</div>
                </div>

                <Grid container spacing={2}>
                  {etId.map((docData) => (
                    <DocumentCard key={docData.id} docData={docData} />
                  ))}
                </Grid>
              </>
            )}
            {hinId.length !== 0 && (
              <>
                <div style={{ marginTop: 30, marginBottom: 20 }}>
                  <div className="documents-heading-2">Home Insurance</div>
                </div>

                <Grid container spacing={2}>
                  {hinId.map((docData) => (
                    <DocumentCard key={docData.id} docData={docData} />
                  ))}
                </Grid>
              </>
            )}
            {cId.length !== 0 && (
              <>
                <div style={{ marginTop: 30, marginBottom: 20 }}>
                  <div className="documents-heading-2">Closing</div>
                </div>

                <Grid container spacing={2}>
                  {cId.map((docData) => (
                    <DocumentCard key={docData.id} docData={docData} />
                  ))}
                </Grid>
              </>
            )}
          </div>
        );
      }
    }
  };

  return (
    <Scaffold bottomNav bottomNavActive="Documents">
      <Grid container direction="column">
        <div className="page-header">
          <h1 className="documents-heading">Documents</h1>
          {documentSet === true && documents.length !== 0 && (
            <SearchBar
              filterByFields={["title"]}
              list={documents}
              onUpdate={(filtered) => {
                setFiltered(filtered);
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
