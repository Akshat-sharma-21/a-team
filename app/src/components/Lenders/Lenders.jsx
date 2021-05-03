import { Box, CircularProgress, Grid, IconButton } from "@material-ui/core";
import { ArrowLeftIcon, SearchIcon } from "@primer/octicons-react";
import React, { useState, useEffect } from "react";
import { Scaffold, SearchBar } from "../utilities/core";
import LenderCard from "./LenderCard";
import "./Lenders.css";

function Lenders() {
  let [lenderList, setlenderList] = useState(null);
  let [filteredList, setFilteredList] = useState(null);

  useEffect(async () => {
    // Dummy values
    const _lenderList = await _dummyApi();

    setlenderList(_lenderList);
    setFilteredList(_lenderList);

    return () => {
      // Cleanup
    };
  }, []);

  const _dummyApi = (emptyResponse = false, timeout = 2000) => {
    return new Promise((resolve, _) => {
      const _lenderList = [
        {
          name: "Shawn Mendes",
          photo: "../../assets/shawn.jpg",
          email: "shawnmendis@gmail.com",
          phone: "+1 999999999",
          desc:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel fermentum risus, at lobortis mauris.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel fermentum risus, at lobortis mauris.",
          interstRate: "10%",
          lifetimeCost: "$120000",
          bankName: "Bank of America",
        },
        {
          name: "Martin Garrix",
          photo: "../../assets/martin.jpg",
          email: "martingarix@gmail.com",
          phone: "+1 999999999",
          desc:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel fermentum risus, at lobortis mauris.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel fermentum risus, at lobortis mauris.",
          interstRate: "15.8%",
          lifetimeCost: "$150000",
          bankName: "Bank of Netherland",
        },
        {
          name: "Weeknd",
          photo: "../../assets/weeknd.jpg",
          email: "weeknd@gmail.com",
          phone: "+1 999999999",
          desc:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel fermentum risus, at lobortis mauris.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel fermentum risus, at lobortis mauris.",
          interstRate: "15.6%",
          lifetimeCost: "$130000",
          bankName: "Bank of Toronto",
        },
        {
          name: "Post Malone",
          photo: "../../assets/postmalone.jpg",
          email: "postmalon@gmail.com",
          phone: "+1 999999999",
          desc:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel fermentum risus, at lobortis mauris.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel fermentum risus, at lobortis mauris.",
          interstRate: "17%",
          lifetimeCost: "$200000",
          bankName: "Bank of New York",
        },
      ];

      setTimeout(() => {
        resolve(emptyResponse ? [] : _lenderList);
      }, timeout);
    });
  };

  const PrimaryContent = () => {
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
            Fetching List...
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
            View all the lendees available for you all in one place...
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
          {filteredList.map((lenderData) => (
            <LenderCard key={lenderData.id} lenderData={lenderData} />
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

export default Lenders;
