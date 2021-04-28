import "./Recommend.css";
import React, { useEffect, useState } from "react";
import { Grid, Box, CircularProgress, IconButton } from "@material-ui/core";
import { Scaffold, SearchBar } from "../utilities/core";
import PeopleCard from "./PeopleCard";
import { SearchIcon, XIcon } from "@primer/octicons-react";

function ReallosRecommended() {
  let [peopleList, setPeopleList] = useState(null);
  let [filteredList, setFilteredList] = useState(null);

  useEffect(async () => {
    // Dummy values
    const _peopleList = await _dummyApi();

    setPeopleList(_peopleList);
    setFilteredList(_peopleList);

    return () => {
      // Cleanup
    };
  }, []);

  const _dummyApi = (emptyResponse = false, timeout = 2000) => {
    return new Promise((resolve, _) => {
      const _peopleList = [
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
        resolve(emptyResponse ? [] : _peopleList);
      }, timeout);
    });
  };

  const PrimaryContent = () => {
    if (peopleList === null || filteredList === null) {
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
    } else if (peopleList.length === 0) {
      // If there is no peopleList
      return (
        <div className="documents-single-view-container">
          {/* <img src={NoDoc} alt="" /> */}

          <h2 className="documents-subheading">
            Find all your agents right here!
          </h2>

          <p className="documents-text">
            View all the agents available for you all in one place...
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
          {filteredList.map((peopleData) => (
            <PeopleCard key={peopleData.id} peopleData={peopleData} />
          ))}
        </Grid>
      );
    }
  };

  return (
    <Scaffold>
      <Grid container direction="column">
        <div style={{ display: "flex" }}>
          <IconButton className="recommend-close-btn">
            <XIcon size={60} />
          </IconButton>
          <h1 className="recommend-heading">Reallos Recommend</h1>
        </div>

        <div className="recommend-page-header">
          {
            <SearchBar
              filterByFields={["name", "creator"]}
              list={peopleList}
              onUpdate={(filtered) => {
                setFilteredList(filtered);
              }}
            />
          }
        </div>

        {PrimaryContent()}
      </Grid>
    </Scaffold>
  );
}
export default ReallosRecommended;
