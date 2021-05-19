import { Box, CircularProgress, Grid, IconButton } from "@material-ui/core";
import { ArrowLeftIcon, SearchIcon } from "@primer/octicons-react";
import React, { useState, useEffect } from "react";
import { Scaffold, SearchBar } from "../utilities/core";
import LenderCard from "./LenderCard";
import "./Lenders.css";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchUser } from "../../actions/userActions";
import { fetchLenders, selectLender } from "../../actions/lenderActions";

const mapStateToProps = (state) => ({
  utils: state.utils,
  user: state.user,
});

const mapActionToProps = (dispatch) => {
  return bindActionCreators({ fetchUser, selectLender }, dispatch);
};

function Lenders(props) {
  let [lenderList, setlenderList] = useState(null);
  let [filteredList, setFilteredList] = useState(null);

  useEffect(() => {
    if (props.utils.reload === true) {
      props.fetchUser();
    }
    fetchLenders()
      .then((dataArray) => {
        setlenderList(dataArray);
        setFilteredList(dataArray);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const PrimaryContent = () => {
    if (props.utils.loading == true) {
      return (
        <div className="documents-single-view-container">
          <CircularProgress />

          <div
            style={{
              marginTop: 50,
              fontSize: 20,
            }}
          >
            Loading...
          </div>
        </div>
      );
    }
    if (lenderList === null || filteredList === null) {
      return (
        <div className="documents-single-view-container">
          <CircularProgress />

          <div
            style={{
              marginTop: 50,
              fontSize: 20,
            }}
          >
            Fetching Lenders...
          </div>
        </div>
      );
    } else if (lenderList.length === 0) {
      // If there is no lenderList
      return (
        <div className="documents-single-view-container">
          {/* <img src={NoDoc} alt="" /> */}

          <h2 className="documents-subheading">
            Find all your lenders right here!
          </h2>

          <p className="documents-text">
            View all the lenders available for you in one place...
          </p>
        </div>
      );
    } else if (filteredList.length === 0) {
      // If no list matched the search term
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
              The entered search term did not match any lender's name
            </Box>
          </Grid>
        </div>
      );
    } else {
      // If list is present to be rendered
      return (
        <Grid container spacing={2}>
          {filteredList.map((lenderData) => (
            <LenderCard
              key={lenderData.id}
              lenderData={lenderData}
              tid={props.user.Transaction}
              selectLender={props.selectLender}
            />
          ))}
        </Grid>
      );
    }
  };

  return (
    <div>
      <Scaffold>
        <div className="page-header">
          <Grid container direction="row" justify="center" alignItems="center">
            <Grid item xs={12} style={{ textAlign: "left" }}>
              <IconButton
                size="small"
                style={{ margin: "20px 0" }}
                onClick={() => (window.location.href = "/dashboard")}
              >
                <ArrowLeftIcon size={32} className="taskSummary-back-icon" />
              </IconButton>
            </Grid>

            <Grid item xs={12} style={{ textAlign: "left" }}>
              <div className="lenders-heading">Lenders</div>
            </Grid>
          </Grid>

          <SearchBar
            filterByFields={["title", "description", "dueDate"]}
            list={lenderList}
            onUpdate={(filtered) => {
              setFilteredList(filtered);
            }}
          />
        </div>

        <Grid container direction="row" justify="center" alignItems="center">
          <Grid item xs={12} style={{ height: "10px" }}></Grid>
          {PrimaryContent()}
        </Grid>
      </Scaffold>
    </div>
  );
}

export default connect(mapStateToProps, mapActionToProps)(Lenders);
