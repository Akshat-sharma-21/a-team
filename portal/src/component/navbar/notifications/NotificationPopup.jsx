import React from 'react';
import PropTypes from 'prop-types';
import NotificationListItem from "./NotificationListItem";
import './NotificationPopup.css';
import { BellIcon } from '@primer/octicons-react';

import {
  Menu,
  Grid,
  Box,
  List,
  CircularProgress,
  ButtonGroup,
  Button,
  Divider
} from '@material-ui/core';

/**
 * Component for showing notifications in a popup.
 * @augments {React.Component<Props>}
 */
class NotificationPopup extends React.Component {
  static propTypes = {
    /**
     * Anchor object used for placing the notification
     * popup on the viewport.
     *
     * Popup will be hidden if `null`
     */
    notificationAnchor: PropTypes.object,

    /**
     * Callback function to dismiss the notification
     * popup.
     */
    dismissCallback: PropTypes.func,

    /**
     * List of notification object.
     */
    notifications: PropTypes.arrayOf(
      PropTypes.object
    ),

    /**
     * Maximum number of notifications to be
     * displayed per page
     */
    maxNotificationsPerPage: PropTypes.number
  }

  constructor() {
    super();

    this.state = {
      notificationStartIndex: 0
    };
  }

  /**
   * Computes number of unread notifications using
   * `isRead` property of notification data.
   */
  get getUnreadNotificationsCount() {
    if (this.props.notifications != null)
      return this.props.notifications.filter((data) => !data.isRead).length;

    else
      return 0;
  }

  render() {
    const {
      notifications,
      notificationAnchor,
      dismissCallback,
      maxNotificationsPerPage=20
    } = this.props;

    return (
      <Menu
        className="navbar-notification-popup"
        anchorEl={notificationAnchor}
        keepMounted
        open={Boolean(notificationAnchor)}
        onClose={dismissCallback}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        PaperProps={{
          style: {
            borderRadius: 10,
          },
        }}
      >
        <Grid
          direction="column"
          alignContent="center"
          className="notification-menu"
        >
          <Grid
            item
            className="notification-popup-header"
            justify="center"
          >
            <Box component="p" style={{ justifyContent: "center" }}>
              You have
            </Box>

            <Box
              component="h3"
              mt={-1.5}
              style={{ justifyContent: "center", fontFamily: 'Gilroy' }}
            >
              {this.getUnreadNotificationsCount
                ? `${this.getUnreadNotificationsCount} Unread ${
                    this.getUnreadNotificationsCount > 1 ? 'Notifications' : 'Notification'
                  }`
                : "No Unread Notifications"
              }
            </Box>
          </Grid>

          {(notifications !== null)
            ? (notifications.length !== 0)
              ? (
                <List className="notification-list">
                  {notifications.slice(
                    this.state.notificationStartIndex,
                    this.state.notificationStartIndex + maxNotificationsPerPage
                  ).map((notification, index) => (
                    <NotificationListItem
                      key={`notification-${index}-${notification.id}`}
                      notificationData={notification}
                    />
                  ))}

                  <Divider variant="middle" />

                  <div className="notification-pagination-nav-root">
                    Showing {
                      this.state.notificationStartIndex + 1
                    }-{
                      Math.min(
                        this.state.notificationStartIndex + maxNotificationsPerPage,
                        notifications.length
                      )
                    } of {
                      notifications.length
                    }

                    <div className="notification-pagination-button-group">
                      <ButtonGroup>
                        <Button
                          disabled={this.state.notificationStartIndex <= 0}
                          onClick={() => this.setState((state) => ({
                            notificationStartIndex: state.notificationStartIndex - maxNotificationsPerPage
                          }))}
                        >
                          Prev
                        </Button>
                        <Button
                          disabled={this.state.notificationStartIndex + maxNotificationsPerPage >= notifications.length}
                          onClick={() => this.setState((state) => ({
                            notificationStartIndex: state.notificationStartIndex + maxNotificationsPerPage
                          }))}
                        >
                          Next
                        </Button>
                      </ButtonGroup>
                    </div>
                  </div>
                </List>
              )

              : (
                <div className="notifications-no-list-container">
                  <BellIcon size={80} className="bell-icon" />

                  <div style={{
                    fontFamily: 'Gilroy',
                    fontWeight: 'bold',
                    fontSize: 24,
                    marginTop: 40,
                    marginBottom: 15
                  }}>
                    All Caught Up!
                  </div>

                  <div style={{
                    fontSize: 18
                  }}>
                    Your notifications will appear here as soon as they arrive
                  </div>
                </div>
              )

            : (
              <div className="notifications-no-list-container">
                <CircularProgress />

                <div style={{
                  marginTop: 25,
                  fontFamily: 'Gilroy'
                }}>
                  Loading Notifications
                </div>
              </div>
            )
          }
        </Grid>
      </Menu>
    )
  }
}

export default NotificationPopup;
