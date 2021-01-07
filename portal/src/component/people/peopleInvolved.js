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
  Card,
  Avatar,
  makeStyles,
  Button,
  GridListTile,
} from "@material-ui/core";
import Navbar from "../navbar/navbar";
import SliderNavbar from "../slider navbar/sliderNavbar";
import {
  PackageIcon,
  SearchIcon,
  DeviceMobileIcon,
  MailIcon,
} from "@primer/octicons-react";

const useStyles = makeStyles((theme) => ({
  large: {
    height: theme.spacing(9),
    width: theme.spacing(9),
  },
  gridList: {
    height: 350,
    width: 1250,
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

  function renderPeopleCard() {
    return (
      <div className={classes.root}>
        <GridList cellHeight={200} className={classes.gridList}>
          <GridListTile className="tile">
            <Grid
              container
              direction="row"
              spacing={7}
              style={{ paddingLeft: 20, paddingTop: 20 }}
            >
              <Grid item>
                <Avatar className={classes.large}>AS</Avatar>
              </Grid>
              <Grid item>
                <Grid container direction="column" alignItems="flex-start">
                  <Grid item>
                    <Typography className="people-card-name">
                      Akshat Sharma
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
                      <Grid item>
                        <Typography>+1 {"988-111-1234"}</Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Grid container direction="row" spacing={2}>
                      <Grid item>
                        <MailIcon />
                      </Grid>
                      <Grid item>
                        <Typography>{"akshat@reallos.com"}</Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Button className="people-card-button">Send Mail</Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </GridListTile>

          <GridListTile className="tile">
            <Grid
              container
              direction="row"
              spacing={7}
              style={{ paddingLeft: 20, paddingTop: 20 }}
            >
              <Grid item>
                <Avatar className={classes.large}>AS</Avatar>
              </Grid>
              <Grid item>
                <Grid container direction="column" alignItems="flex-start">
                  <Grid item>
                    <Typography className="people-card-name">
                      Akshat Sharma
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
                      <Grid item>
                        <Typography>+1 {"988-111-1234"}</Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Grid container direction="row" spacing={2}>
                      <Grid item>
                        <MailIcon />
                      </Grid>
                      <Grid item>
                        <Typography>{"akshat@reallos.com"}</Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Button className="people-card-button">Send Mail</Button>
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
    <Container>
      <SliderNavbar />
      <Navbar />
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

        <Grid container style={{ marginTop: 40 }}>
          <FormControl fullWidth variant="outlined">
            <OutlinedInput
              className="search-bar"
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
    </Container>
  );
}

export default PeopleInvolved;
