import "./peopleInvolved.css";
import {
  Container,
  Grid,
  Box,
  FormControl,
  OutlinedInput,
  InputAdornment,
  Typography,
} from "@material-ui/core";
import Navbar from "../navbar/navbar";
import SliderNavbar from "../slider navbar/sliderNavbar";
import { PackageIcon, SearchIcon } from "@primer/octicons-react";

function PeopleInvolved(props) {
  return (
    <Container>
      <SliderNavbar />
      <Navbar />
      <Box component="div" paddingTop={5} paddingBottom={1}>
        <Grid container direction="column" spacing={1}>
          <Grid item>
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
                <h2 className="transaction-heading">
                  {
                    "Transaction 1" //Name of the transaction
                  }
                </h2>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Typography>People Involved</Typography>
          </Grid>
          <Grid item>
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
        </Grid>
      </Box>
    </Container>
  );
}

export default PeopleInvolved;
