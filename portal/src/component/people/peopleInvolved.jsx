import "./peopleInvolved.css";
import {
  Container,
  Grid,
  Box,
  FormControl,
  OutlinedInput,
  InputAdornment,
  Typography,
  GridList,
  Avatar,
  makeStyles,
  Button,
  GridListTile,
} from "@material-ui/core";
import Navbar from "../navbar/navbar";
import Modal from "../utilities/modal/modal";
import NavRail from "../navigation_rail/NavRail";
import ReallosButton from "../utilities/reallos_button/ReallosButton";
import {
  PackageIcon,
  SearchIcon,
  DeviceMobileIcon,
  MailIcon,
  DotFillIcon,
  PaperAirplaneIcon,
} from "@primer/octicons-react";
import { useState } from "react";
import Scaffold from "../utilities/scaffold/Scaffold";

const useStyles = makeStyles((theme) => ({
  small: {
    height: theme.spacing(4),
    width: theme.spacing(4),
  },
  large: {
    height: theme.spacing(9),
    width: theme.spacing(9),
  },
  gridList: {
    height: 350,
    width: 1300,
  },
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
  },
}));

function PeopleInvolved(props) {
  const classes = useStyles();
  const [modalVisible, toggleModal] = useState(false);

  function renderPeopleCard() {
    return (
      <div className={classes.root}>
        <GridList cellHeight={200} className={classes.gridList}>
          <GridListTile className="tile">
            <Grid
              container
              direction="row"
              spacing={6}
              style={{ paddingLeft: 30, paddingTop: 30 }}
            >
              <Grid item>
                <Avatar className={classes.large}>JD</Avatar>
              </Grid>
              <Grid item>
                <Grid container direction="column" alignItems="flex-start">
                  <Grid item>
                    <Typography className="people-card-name">
                      John Doe
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography className="people-card-title">Buyer</Typography>
                  </Grid>
                  <Grid item style={{ paddingTop: 18 }}>
                    <Grid container direction="row" spacing={2}>
                      <Grid item>
                        <DeviceMobileIcon />
                      </Grid>
                      <Grid item style={{ paddingBottom: 20 }}>
                        <Typography>+1 {"469-350-9711"}</Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Grid container direction="row" spacing={2}>
                      <Grid item>
                        <MailIcon />
                      </Grid>
                      <Grid item>
                        <Typography>{"john.doe@reallos.com"}</Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Button
                      className="people-card-button"
                      onClick={() => toggleModal(true)}
                    >
                      Send Mail
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </GridListTile>

          <GridListTile className="tile">
            <Grid
              container
              direction="row"
              spacing={6}
              style={{ paddingLeft: 30, paddingTop: 30 }}
            >
              <Grid item>
                <Avatar className={classes.large}>PY</Avatar>
              </Grid>
              <Grid item>
                <Grid container direction="column" alignItems="flex-start">
                  <Grid item>
                    <Typography className="people-card-name">
                      Paxton Yoshida
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography className="people-card-title">
                      Lender <DotFillIcon size={16} /> Bank of America
                    </Typography>
                  </Grid>
                  <Grid item style={{ paddingTop: 20 }}>
                    <Grid container direction="row" spacing={2}>
                      <Grid item>
                        <DeviceMobileIcon />
                      </Grid>
                      <Grid item style={{ paddingBottom: 20 }}>
                        <Typography>+1 {"598-574-4111"}</Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Grid container direction="row" spacing={2}>
                      <Grid item>
                        <MailIcon />
                      </Grid>
                      <Grid item>
                        <Typography>{"paxton.yoshida@reallos.com"}</Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Button
                      className="people-card-button"
                      onClick={() => toggleModal(true)}
                    >
                      Send Mail
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </GridListTile>
        </GridList>
      </div>
    );
  }

  return (
    <Scaffold navBar navRail>
      <Modal
        title="Send Mail"
        modalWidth={600}
        visible={modalVisible}
        dismissCallback={() => toggleModal(false)}
      >
        <Grid container direction="row" justify="center" alignItems="center">
          <Grid item xs={1}>
            <Avatar className={classes.small}>JD</Avatar>
          </Grid>
          <Grid item xs={11} style={{ textAlign: "left" }}>
            Sending to <b>Paxton Yoshida</b>
          </Grid>
          <Grid item xs={12} className="empty-div-space"></Grid>
          <Grid item xs={12} className="empty-div-space"></Grid>
          <Grid item xs={12}>
            <FormControl fullWidth variant="outlined">
              <OutlinedInput className="subject-bar" placeholder="Subject" />
            </FormControl>
          </Grid>
          <Grid item xs={12} className="empty-div-space"></Grid>
          <Grid item xs={12}>
            <FormControl fullWidth variant="outlined">
              <OutlinedInput className="subject-bar" multiline rows={10} />
            </FormControl>
          </Grid>
          <Grid item xs={12} className="empty-div-space"></Grid>
          <Grid item xs={12} style={{ textAlign: "right" }}>
            <ReallosButton primary>
              <PaperAirplaneIcon size={20} />
              &nbsp;&nbsp;Send Mail
            </ReallosButton>
          </Grid>
        </Grid>
      </Modal>

      <Box component="div" paddingTop={5} paddingBottom={1}>
        <Grid
          container
          direction="row"
          alignItems="center"
          spacing={2}
          justify="flex-start"
        >
          <Grid item>
            <PackageIcon size={35} />
          </Grid>
          <Grid item>
            <Typography className="transaction-heading">
              {
                "Transaction 1" //Name of the transaction
              }
            </Typography>
          </Grid>
        </Grid>

        <Grid container alignItems="flex-start" style={{ marginTop: 10 }}>
          <Typography className="people-heading">People Involved</Typography>
        </Grid>

        <Grid container style={{ marginTop: 40, marginBottom: 20 }}>
          <FormControl fullWidth variant="outlined">
            <OutlinedInput
              className="search-bar"
              placeholder="Search"
              startAdornment={
                <InputAdornment position="start">
                  <div
                    style={{
                      paddingRight: 10,
                      paddingLeft: 10,
                    }}
                  >
                    <SearchIcon className="search-icon" size={18} />
                  </div>
                </InputAdornment>
              }
            />
          </FormControl>
        </Grid>
        {renderPeopleCard()}
      </Box>
    </Scaffold>
  );
}

export default PeopleInvolved;
