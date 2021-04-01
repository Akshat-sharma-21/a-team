import "./Recommend.css";
import React, { useEffect, useState } from "react";
import Photo1 from "../../assets/shawn.jpg";
import Photo2 from "../../assets/martin.jpg";
import Photo3 from "../../assets/weeknd.jpg";
import Photo4 from "../../assets/postmalone.jpg";
import {
  XIcon,
  SearchIcon,
  ArrowLeftIcon,
  MailIcon,
  DeviceMobileIcon,
} from "@primer/octicons-react";
import { Grid, Box, CircularProgress, IconButton } from "@material-ui/core";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import Button from "@material-ui/core/Button";
import { Scaffold, SearchBar } from "../utilities/core";
import PeopleCard from "./PeopleCard";

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
});

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

  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      style={{ height: "100vh" }}
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "bottom",
      })}
      role="presentation"
    >
      <div className="Recommend_top" onClick={toggleDrawer(anchor, false)}>
        <ArrowLeftIcon className="Recommend_back" size={30} />
        <img src={Photo2}></img>
      </div>

      <div className="Recommend_card_cont">
        <div class="Recommend_card_name">Martin Garrix</div>
        <p class="Recommend_card_about">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel
          fermentum risus, at lobortis mauris.Lorem ipsum dolor sit amet,
          consectetur adipiscing elit. Nullam vel fermentum risus, at lobortis
          mauris.
        </p>
        <div className="Recommend_e-mail">
          <Grid container direction="row" alignItems="center" justify="center">
            <Grid item xs={1} style={{ textAlign: "center" }}>
              <MailIcon size={24} />
            </Grid>
            <Grid item xs={1}></Grid>
            <Grid item xs={10} style={{ textAlign: "left" }}>
              <div className="Recommend_e-mailhead">Email</div>
              john.smith@gmail.com
            </Grid>
          </Grid>
        </div>
        <br></br>

        <div className="Recommend_number">
          <Grid container direction="row" alignItems="center" justify="center">
            <Grid item xs={1} style={{ textAlign: "center" }}>
              <DeviceMobileIcon size={24} />
            </Grid>
            <Grid item xs={1}></Grid>
            <Grid item xs={10} style={{ textAlign: "left" }}>
              <div className="Recommend_contacthead">Contact</div>+1 99999 99999
            </Grid>
          </Grid>
        </div>
        <div className="Recommend_button_confirm">
          <button>Confirm</button>
        </div>
      </div>
    </div>
  );
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
