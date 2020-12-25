import "./navbar.css";
import {
  AppBar,
  Toolbar,
  Grid,
  Tooltip,
  Typography,
  Zoom,
  IconButton,
  Avatar,
} from "@material-ui/core";
import { BellIcon, GraphIcon } from "@primer/octicons-react";

function Navbar(props) {
  return (
    <div className="navbar-main" style={{ marginTop: 20 }}>
      <Grid container direction="row" justify="center" alignitems="center">
        <AppBar className="navbar-root" position="static">
          <Toolbar>
            <Typography className="navbar-logo" variant="h6">
              Reallos
            </Typography>
            <div className="navbar-btn-group">
              <Tooltip
                title={
                  <Typography style={{ fontSize: "15px" }}>Insights</Typography>
                }
                TransitionComponent={Zoom}
              >
                <IconButton>
                  <GraphIcon size={20} />
                </IconButton>
              </Tooltip>
              <Tooltip
                title={
                  <Typography style={{ fontSize: "15px" }}>
                    Notifications
                  </Typography>
                }
                TransitionComponent={Zoom}
              >
                <IconButton>
                  <BellIcon size={20} />
                </IconButton>
              </Tooltip>
              <Tooltip
                title={
                  <Typography style={{ fontSize: "15px" }}>Profile</Typography>
                }
                TransitionComponent={Zoom}
              >
                <IconButton>
                  <Avatar />
                </IconButton>
              </Tooltip>
            </div>
          </Toolbar>
        </AppBar>
      </Grid>
    </div>
  );
}

export default Navbar;
