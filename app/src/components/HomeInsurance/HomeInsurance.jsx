import { Box, CircularProgress, Grid, IconButton } from "@material-ui/core";
import { ArrowLeftIcon, SearchIcon } from "@primer/octicons-react";
import React, { useState, useEffect } from "react";
import { Scaffold, SearchBar } from "../utilities/core";
import InsuranceCard from "./InsuranceCard";
import "./HomeInsurance.css";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchUser } from "../../actions/userActions";
import {
  fetchHomeInsurance,
  selectHomeInsurance,
} from "../../actions/homeInsuranceActions";

const mapStateToProps = (state) => ({
  utils: state.utils,
  user: state.user,
});

const mapActionToProps = (dispatch) => {
  return bindActionCreators({ fetchUser, selectHomeInsurance }, dispatch);
};

function HomeInsurance(props) {
  let [providerList, setproviderList] = useState(null);
  let [filteredList, setFilteredList] = useState(null);

  useEffect(() => {
    if (props.utils.reload) {
      props.fetchUser();
    }
    fetchHomeInsurance()
      .then((dataArray) => {
        setproviderList(dataArray);
        setFilteredList(dataArray);
      })
      .catch((err) => {
        console.error(err); // logging the error
      });
  }, []);

  const PrimaryContent = () => {
    if (props.utils.loading === true) {
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
    if (providerList === null || filteredList === null) {
      return (
        <div className="documents-single-view-container">
          <CircularProgress />

          <div
            style={{
              marginTop: 50,
              fontSize: 20,
            }}
          >
            Fetching Insurance...
          </div>
        </div>
      );
    } else if (providerList.length === 0) {
      // If there is no providerList
      return (
        <div className="documents-single-view-container">
          {/* <img src={NoDoc} alt="" /> */}

          <h2 className="documents-subheading">
            Find all your insurance providers right here!
          </h2>

          <p className="documents-text">
            View all the insurance providers available for you all in one
            place...
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
              The entered search term did not match any agen's name
            </Box>
          </Grid>
        </div>
      );
    } else {
      // If list is present to be rendered
      return (
        <Grid container spacing={2}>
          {filteredList.map((providerData) => (
            <InsuranceCard
              key={providerData.id}
              providerData={providerData}
              tid={props.user.Transaction}
              selectHomeInsurance={props.selectHomeInsurance}
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
                {window.innerHeight < 750 ? (
                  <ArrowLeftIcon size={29} className="taskSummary-back-icon" />
                ) : (
                  <ArrowLeftIcon size={32} className="taskSummary-back-icon" />
                )}
              </IconButton>
            </Grid>

            <Grid item xs={12} style={{ textAlign: "left" }}>
              <div className="providers-heading">Home Insurance</div>
            </Grid>

            <SearchBar
              filterByFields={["title", "description", "dueDate"]}
              list={providerList}
              onUpdate={(filtered) => {
                setFilteredList(filtered);
              }}
            />
          </Grid>
        </div>

        <Grid container direction="row" justify="center" alignItems="center">
          <Grid item xs={12} style={{ height: "10px" }}></Grid>
          {PrimaryContent()}
        </Grid>
      </Scaffold>
    </div>
  );
}

export default connect(mapStateToProps, mapActionToProps)(HomeInsurance);
