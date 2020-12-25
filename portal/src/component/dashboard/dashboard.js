import { Box, Container, Grid } from "@material-ui/core";
import Navbar from "../navbar/navbar";
import "./dashboard.css";
import dashboardImg from "../../assets/dashboard-empty.png";

function Dashboard(props) {
  if (true) {
    // from the database
    return (
      <Container>
        <Navbar />
        <Grid container direction="column">
          <Grid item></Grid>
          <Grid item>
            <Grid container alignItems="flex-start">
              <Box
                className="dashboard-heading"
                paddingTop={10}
                paddingLeft={3}
              >
                {" "}
                My Transactions
              </Box>
            </Grid>
          </Grid>
          <Grid item>
            <Grid container alignItems="center" justify="center">
              <img src={dashboardImg} alt="" className="dashboard-img" />
            </Grid>
          </Grid>
          <Grid item>
            <Box className="dashboard-heading" paddingTop={4}>
              Feels Empty here...
            </Box>
          </Grid>
          <Grid item>
            <Box className="dashbaord-text" paddingTop={1.5}>
              Sit tight and get your Game Face Ready. <b>Reallos</b> will send
              Leads your way very soon!
            </Box>
          </Grid>
        </Grid>
      </Container>
    );
  } else {
  }
}

export default Dashboard;
