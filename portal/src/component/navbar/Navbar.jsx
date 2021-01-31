import { useState, useEffect } from "react";

import {
  AppBar,
  Toolbar,
  Grid,
  Tooltip,
  Typography,
  Zoom,
  IconButton,
  Avatar,
  Badge,
} from "@material-ui/core";

import { BellIcon, GraphIcon } from "@primer/octicons-react";
import UserProfilePopup from '../account_setup/UserProfilePopup';
import UserProfileEditDrawer from '../account_setup/UserProfileEditDrawer';
import NotificationPopup from './notifications/NotificationPopup';
import { getUnreadNotificationsCount } from './notifications/utils';
import "./Navbar.css";

function Navbar(props) {
  let [isUserProfileEditDrawerVisible, setUserProfileEditDrawerVisibility] = useState(false);
  let [userProfilePopupAnchorEl, setUserProfilePopupAnchorEl] = useState(null);
  let [notificationPopupAnchorEl, setNotificationPopupAnchorEl] = useState(null);
  let [notifications, setNotifications] = useState(null);

  /**
   * Shows the User Profile Popup
   *
   * @param {Event} event
   * on-click event of the user profile button
   */
  const showNotificationPopup = (event) => {
    setNotificationPopupAnchorEl(event.currentTarget);
  }

  /**
   * Hides the User Profile Popup
   */
  const hideNotificationPopup = () => {
    setNotificationPopupAnchorEl(null);
  }

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
   * Subscribes to notification changes
   */
  const notificationSubscriber = async () => {
    console.log('Subscribe to Notification API...');

    _dummyNotificationsApi(5)
      .then((notifications) => {
        setNotifications(notifications);
      });
  }

  /**
   * Removes subscription to notification changes
   */
  const removeNotificationSubscription = () => {
    console.log('Remove Notification Subscription...');
    // @TODO: Add logic
  }

  const _dummyNotificationsApi = async (duplicationFactor=0) => {
    return new Promise((resolve, _) => {
      /**
       * Dummy data
       * @TODO: Replace with Redux/AWS logic
       */
      let _notifications = [
        {
          id: 'qwerty',
          type: 'TASK_CREATE',
          isRead: false,
          timestamp: 1611503929112,
          tid: 'tq91ydfsd8',
          taskId: '22001873',
          taskName: 'Chandler Bing created a new task "Get some paperwork done"',
        },
        {
          id: 'asdfgh',
          type: 'TASK_CREATE',
          isRead: true,
          timestamp: 1610933529112,
          tid: 'sidhfwe9w8',
          taskId: '22001873',
          taskName: 'Ross Geller created a new task "Hello World"',
        },
        {
          id: 'qqxonepw',
          type: 'DOC_UPDATE',
          isRead: true,
          timestamp: 1610533529112,
          tid: 'kuAsdbh2198',
          name: 'Tax Returns',
          lastModifiedBy: 'Terry Jackson'
        },
        {
          id: 'iwjbfhdw',
          type: 'INVITATION_ACCEPTED',
          isRead: true,
          timestamp: 1610033529112,
          tid: 'kuAsdbh2198',
          name: 'Terry Jackson'
        },
        {
          id: 'hgsckqod',
          type: 'INVITATION_ACCEPTED',
          isRead: false,
          timestamp: 1610033529112,
          tid: 'kuAsdbh2198',
          name: 'Chandler Bing'
        },
        {
          id: 'jhgfsdkq',
          type: 'DOC_UPDATE',
          isRead: true,
          timestamp: 1609593529112,
          tid: 'kuAsdbh2198',
          name: 'Income & Employment',
          lastModifiedBy: 'Joeseph Tribbiani'
        },
      ]

      for (let i = 0; i < duplicationFactor; i++) {
        _notifications = _notifications.concat(_notifications);
      }

      setTimeout(() => {
        resolve(_notifications);
      }, 2000);
    });
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

    // Could include country code
    phone: '9999999999',

    // Could use mutiple resolution images as array
    profilePhoto: 'https://i.imgur.com/zOnwBpQ.png'
  };

  /**
   * Run on mount and cleanup during unmount lifecycle
   */
  useEffect(() => {
    // Subscribe on mount
    notificationSubscriber();

    // Cleanup on unmount
    return removeNotificationSubscription;
  }, []);

  return (
    <div className="navbar-main" style={{ marginTop: 20 }}>
      <Grid container direction="row" justify="center" alignitems="center">
        <AppBar className="navbar-root" position="static">
          <Toolbar>
            {/* INSIGHTS BUTTON */}
            <Typography className="navbar-logo" variant="h6">
              Reallos
            </Typography>
            <div className="navbar-btn-group">
              <Tooltip
                title={
                  <Typography style={{ fontSize: "15px" }}>
                    Insights
                  </Typography>
                }
                TransitionComponent={Zoom}
              >
                <IconButton>
                  <GraphIcon size={20} />
                </IconButton>
              </Tooltip>

              {/* NOTIFICATIONS BUTTON */}
              <Tooltip
                title={
                  <Typography style={{ fontSize: "15px" }}>
                    Notifications
                  </Typography>
                }
                TransitionComponent={Zoom}
              >
                <IconButton onClick={showNotificationPopup}>
                  <Badge
                    overlap="circle"
                    variant={
                      getUnreadNotificationsCount(notifications) > 0
                        ? 'dot'
                        : 'standard'
                    }
                    color="primary"
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right'
                    }}
                  >
                    <BellIcon size={20} />
                  </Badge>
                </IconButton>
              </Tooltip>

              {/* PROFILE BUTTON */}
              <Tooltip
                title={
                  <Typography style={{ fontSize: "15px" }}>
                    Profile
                  </Typography>
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

      <NotificationPopup
        dismissCallback={hideNotificationPopup}
        notifications={notifications}
        notificationAnchor={notificationPopupAnchorEl}
        maxNotificationsPerPage={15}
      />

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
