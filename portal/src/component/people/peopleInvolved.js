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
import NavRail from "../navigation_rail/NavRail";
import {
  PackageIcon,
  SearchIcon,
  DeviceMobileIcon,
  MailIcon,
  DotFillIcon,
} from "@primer/octicons-react";

const useStyles = makeStyles((theme) => ({
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
      <NavRail />
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
    </Container>
  );
}

export default PeopleInvolved;
