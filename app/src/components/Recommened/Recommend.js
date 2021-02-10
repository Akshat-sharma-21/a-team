import "./Recommend.css";
import React from "react";
import Photo1 from '../../assets/shawn.jpg';
import Photo2 from '../../assets/martin.jpg';
import Photo3 from '../../assets/weeknd.jpg';
import Photo4 from '../../assets/postmalone.jpg';
import { XIcon, FilterIcon, ArrowLeftIcon, MailIcon, DeviceMobileIcon } from '@primer/octicons-react';
import { Grid } from "@material-ui/core";
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import { Scaffold } from '../utilities/core';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

function ReallosRecommended() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div style={{ height: "100vh" }}
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >

      <div className="Recommend_top">
        <ArrowLeftIcon className="Recommend_back" size={30} />
        <img src={Photo2}></img>
      </div>

      <div className="Recommend_card_cont">
        <div class="Recommend_card_name">Martin Garrix</div>
        <p class="Recommend_card_about">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel fermentum risus,
        at lobortis mauris.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel fermentum risus, at
        lobortis mauris.</p>
        <div className="Recommend_e-mail">
          <Grid container direction="row" alignItems="center" justify="center">
            <Grid item xs={1} style={{ textAlign: "center" }}>
              <MailIcon size={24} />
            </Grid>
            <Grid item xs={1}></Grid>
            <Grid item xs={10} style={{ textAlign: "left" }}>
              <div className="Recommend_e-mailhead">Email</div>john.smith@gmail.com
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
          <button >
            Confirm
            </button>
        </div>
      </div>

    </div>
  );
  return (

    <Scaffold className="Recommend">
      <Grid container direction="row" alignItems="center" justify="center">

        <Grid item xs={1}>
        </Grid>
        <Grid item xs={1} style={{ textAlign: "left" }}>
          <XIcon size={40} className="Recommend_x" />
        </Grid>
        <Grid item xs={10} style={{ textAlign: "left" }}>
          <div className="Recommend_header">Reallos Recommended</div>
        </Grid>

        <Grid item xs={12} style={{ textAlign: "left" }}>
          <div className="Recommend_searchbar">
            <input type="text" class="Recommend_searchTerm" placeholder="Search by name">
            </input>
            <FilterIcon size={32} className="Recommend_filter" />
          </div>
        </Grid>

      </Grid>

      <div className="Recommend_Superbox">
        {['bottom'].map((anchor) => (
          <React.Fragment key={anchor}>

            <Grid className="Recommend_cards" container direction="row" alignItems="center" justify="center" spacing="2">

              <Grid classNames="Recommend_gird" item xs={6} style={{ textAlign: "right" }}>
                <Button onClick={toggleDrawer(anchor, true)}>
                  <div className="Recommend_card">
                    <div className="Recommend_card_image">
                      <img src={Photo1}></img>
                    </div>
                    <div className="Recommend_card_content">
                      <h2 className="Recommend_card_title">Shawn Mendes</h2>
                      <p className="Recommend_card_interest">Interest Rate - 10%</p>
                      <p className="Recommend_card_annual">Life Time Cost - $120000</p>
                      <p className="Recommend_from">Bank of Ontario</p>
                    </div>
                  </div>
                </Button>
              </Grid>
              <Grid classNames="Recommend_gird" item xs={6} style={{ textAlign: "left" }}>
                <Button onClick={toggleDrawer(anchor, true)}>
                  <div className="Recommend_card">
                    <div className="Recommend_card_image">
                      <img className="Recommend_img" src={Photo2}></img>
                    </div>
                    <div className="Recommend_card_content">
                      <h2 className="Recommend_card_title">Martin Garrix</h2>
                      <p className="Recommend_card_interest">Interest Rate - 15.8%</p>
                      <p className="Recommend_card_annual">Life Time Cost - $150000</p>
                      <p className="Recommend_from">Bank of Netherland</p>
                    </div>
                  </div>
                </Button>
              </Grid>
              <br></br>
              <br></br>
              <br></br>

              <Grid classNames="Recommend_gird" item xs={6} style={{ textAlign: "right" }}>
                <Button onClick={toggleDrawer(anchor, true)}>
                  <div className="Recommend_card">
                    <div className="Recommend_card_image">
                      <img className="Recommend_img" src={Photo3}></img>
                    </div>
                    <div className="Recommend_card_content">
                      <h2 className="Recommend_card_title">Weeknd</h2>
                      <p className="Recommend_card_interest">Interest Rate - 13.6%</p>
                      <p className="Recommend_card_annual">Life Time Cost - $135000</p>
                      <p className="Recommend_from">Bank of Toronto</p>
                    </div>
                  </div>
                </Button>
              </Grid>
              <Grid classNames="Recommend_gird" item xs={6} style={{ textAlign: "left" }}>
                <Button onClick={toggleDrawer(anchor, true)}>
                  <div className="Recommend_card">
                    <div className="Recommend_card_image">
                      <img className="Recommend_img" src={Photo4}></img>
                    </div>
                    <div className="Recommend_card_content">
                      <h2 className="Recommend_card_title">Post Malone</h2>
                      <p className="Recommend_card_interest">Interest Rate - 17%</p>
                      <p className="Recommend_card_annual">Life Time Cost - $200000</p>
                      <p className="Recommend_from">Bank of New York</p>
                    </div>
                  </div>
                </Button>
              </Grid>

            </Grid>

            <SwipeableDrawer
              anchor={anchor}
              open={state[anchor]}
              onClose={toggleDrawer(anchor, false)}
              onOpen={toggleDrawer(anchor, true)}
            >
              {list(anchor)}
            </SwipeableDrawer>
          </React.Fragment>
        ))}
      </div>
    </Scaffold>
  );
}
export default ReallosRecommended;