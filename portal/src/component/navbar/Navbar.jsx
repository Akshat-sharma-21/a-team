import { useState } from "react";
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
import UserProfilePopup from '../account_setup/UserProfilePopup';
import UserProfileEditDrawer from '../account_setup/UserProfileEditDrawer';
import "./Navbar.css";

function Navbar(props) {
  let [isUserProfileEditDrawerVisible, setUserProfileEditDrawerVisibility] = useState(false);
  let [userProfilePopupAnchorEl, setUserProfilePopupAnchorEl] = useState(null);

  /**
   * Shows the User Profile Popup
   * 
   * @param {Event} event
   * on-click event of the user profile button
   */
  const showUserProfilePopup = (event) => {
    setUserProfilePopupAnchorEl(event.currentTarget);
  }

  /**
   * Hides the User Profile Popup
   */
  const hideUserProfilePopup = () => {
    setUserProfilePopupAnchorEl(null);
  }

  /**
   * Shows the User Profile Edit Side Drawer
   */
  const showUserProfileEditDrawer = () => {
    setUserProfileEditDrawerVisibility(true);
  }

  /**
   * Hides the User Profile Edit Side Drawer
   */
  const hideUserProfileEditDrawer = () => {
    setUserProfileEditDrawerVisibility(false);
  }

  /**
   * Dummy data
   * @TODO: Replace with Redux/AWS logic
   */
  const user = {
    id: 'qwerty',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@gmail.com',
    role: 'seller',
    phone: '9999999999',
    profilePhoto: 'https://i.imgur.com/zOnwBpQ.png'
  }

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
                <IconButton onClick={showUserProfilePopup}>
                  <Avatar src={user.profilePhoto} />
                </IconButton>
              </Tooltip>
            </div>
          </Toolbar>
        </AppBar>
      </Grid>

      <UserProfilePopup
        user={user}
        onSignOut={()=>{}}
        onClose={hideUserProfilePopup}
        onShowProfileEditDrawer={() => {
          hideUserProfilePopup();
          showUserProfileEditDrawer();
        }}
        anchorElement={userProfilePopupAnchorEl}
      />

      <UserProfileEditDrawer
        user={user}
        dismissCallback={hideUserProfileEditDrawer}
        visible={isUserProfileEditDrawerVisible}
      />
    </div>
  );
}

export default Navbar;
