import "./Recommned.css";
import React from "react";
import Photo1 from '../../assets/shawn.jpg';
import Photo2 from '../../assets/martin.jpg';
import Photo3 from '../../assets/weeknd.jpg';
import Photo4 from '../../assets/postmalone.jpg';
import { XIcon, FilterIcon, ArrowLeftIcon, MailIcon, DeviceMobileIcon } from '@primer/octicons-react';
import {
  Grid
} from "@material-ui/core";
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
/*   <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>    */

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


      <div className="topo">
        <ArrowLeftIcon className="backo" size={30} />
        <img src={Photo2}></img>
      </div>

      <div className="card_conto">
        <h2 class="card_nameo">Martin Garrix</h2>
        <p class="card_abouto">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel fermentum risus, at lobortis mauris.
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel fermentum risus, at lobortis mauris.</p>
        <div className="e-mailo">
          <Grid container direction="row" alignItems="center" justify="center">
            <Grid item xs={1} style={{ textAlign: "center" }}>
              <MailIcon size={24} />
            </Grid>
            <Grid item xs={11} style={{ textAlign: "left" }}>
              Email<br></br>john.smith@gmail.com
            </Grid>
          </Grid>
        </div>
        <br></br>

        <div className="numbero">
          <Grid container direction="row" alignItems="center" justify="center">
            <Grid item xs={1} style={{ textAlign: "center" }}>
              <DeviceMobileIcon size={24} />
            </Grid>
            <Grid item xs={11} style={{ textAlign: "left" }}>
              Contact<br></br>+1 99999 99999
            </Grid>
          </Grid>
        </div>
        <div className="button_confirmo">
          <button >
            Confirm
            </button>
        </div>
      </div>


    </div>
  );
  return (

    <div className="Appo">
      <Grid container direction="row" alignItems="center" justify="center">
        <Grid item xs={1}>
        </Grid>
        <Grid item xs={1} style={{ textAlign: "left" }}>
          <XIcon size={40} className="xo" />
        </Grid>
        <Grid item xs={10} style={{ textAlign: "left" }}>
          <h1 className="headingo">Reallos Recommended</h1>
        </Grid>

        <Grid item xs={12} style={{ textAlign: "left" }}>
          <div className="searchbaro">
            <input type="text" class="searchTermo" placeholder="Search by name">

            </input>
            <FilterIcon size={32} className="filtero" />
          </div>
        </Grid>

      </Grid>



      <div className="Superboxo">
        {['bottom'].map((anchor) => (
          <React.Fragment key={anchor}>


            <Grid className="cardso" container direction="row" alignItems="center" justify="center" spacing="2">


              <Grid classNames="girdo" item xs={6} style={{ textAlign: "center" }}>
                <Button onClick={toggleDrawer(anchor, true)}>
                  <div className="cardo">
                    <div className="card_imageo">
                      <img src={Photo1}></img>
                    </div>
                    <div className="card_contento">
                      <h2 class="card_titleo">Shawn Mendes</h2>
                      <p class="card_interesto">Interest Rate - 10%</p>
                      <p class="card_annualo">Life Time Cost - $120000</p>
                      <p class="fromo">Bank of Ontario</p>
                    </div>
                  </div>
                </Button>
              </Grid>



              <Grid classNames="girdo" item xs={6} style={{ textAlign: "center" }}>
                <Button onClick={toggleDrawer(anchor, true)}>
                  <div className="cardo">
                    <div className="card_imageo">
                      <img src={Photo2}></img>
                    </div>
                    <div className="card_contento">
                      <h2 class="card_titleo">Martin Garrix</h2>
                      <p class="card_interesto">Interest Rate - 15.8%</p>
                      <p class="card_annualo">Life Time Cost - $150000</p>
                      <p class="fromo">Bank of Netherland</p>
                    </div>
                  </div>
                </Button>
              </Grid>
              <br></br>
              <br></br>
              <br></br>


              <Grid classNames="girdo" item xs={6} style={{ textAlign: "center" }}>
                <Button onClick={toggleDrawer(anchor, true)}>
                  <div className="cardo">
                    <div className="card_imageo">
                      <img src={Photo3}></img>
                    </div>
                    <div className="card_contento">
                      <h2 class="card_titleo">Weeknd</h2>
                      <p class="card_interesto">Interest Rate - 13.6%</p>
                      <p class="card_annualo">Life Time Cost - $135000</p>
                      <p class="fromo">Bank of Toronto</p>
                    </div>
                  </div>

                </Button>
              </Grid>




              <Grid classNames="girdo" item xs={6} style={{ textAlign: "center" }}>
                <Button onClick={toggleDrawer(anchor, true)}>
                  <div className="cardo">
                    <div className="card_imageo">
                      <img src={Photo4}></img>
                    </div>
                    <div className="card_contento">
                      <h2 class="card_titleo">Post Malone</h2>
                      <p class="card_interesto">Interest Rate - 17%</p>
                      <p class="card_annualo">Life Time Cost - $200000</p>
                      <p class="fromo">Bank of New York</p>
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

    </div>
  );
}
export default ReallosRecommended;
