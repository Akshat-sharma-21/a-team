import React from 'react';
import PropTypes from 'prop-types';
import { getRoleLabel } from '../../../utils';
import './UserProfilePopup.css';

import {
  Menu,
  Grid,
  Box,
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@material-ui/core';

import {
  PencilIcon,
  SignOutIcon,
  TagIcon
} from '@primer/octicons-react';

/**
 * Displays a User Profile Popup
 * @augments {React.Component<Prop>}
 */
class UserProfilePopup extends React.Component {
  static propTypes = {
    /**
     * Objct containing user details like
     * username and email
     */
    user: PropTypes.shape({
      id: PropTypes.string,
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      email: PropTypes.string,
      role: PropTypes.string,
      phone: PropTypes.string,
      profilePhoto: PropTypes.string,
    }),

    /**
     * User Profile Button Element. If set to `null`,
     * the popup is hidden.
     */
    anchorElement: PropTypes.element,

    /**
     * Callback function called when the popup
     * is requested to be closed
     */
    onClose: PropTypes.func,

    /**
     * Callback function called when the profile edit
     * drawer is requested to be shown
     */
    onShowProfileEditDrawer: PropTypes.func,

    /**
     * Callback function called when the user requests
     * to be signed out
     */
    onSignOut: PropTypes.func
  }
  
  render() {
    const {
      user,
      anchorElement,
      onClose,
      onShowProfileEditDrawer,
      onSignOut,
    } = this.props;

    const actionsList = [
      {
        label: 'Edit Profile',
        icon: <PencilIcon size={20} />,
        onClick: onShowProfileEditDrawer
      },
      {
        label: 'Sign Out',
        icon: <SignOutIcon size={20} />,
        onClick: onSignOut
      }
    ]

    return (
      <Menu
        className="user-profile-popup-menu-root"
        anchorEl={anchorElement}
        keepMounted
        open={Boolean(anchorElement)}
        onClose={onClose}
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
            border: '2px solid rgba(0, 0, 0, 0.25)'
          },
        }}
      >
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
          className="user-profile-popup-menu"
        >
          <Grid
            item
            style={{
              width: "100%",
              marginTop: 10,
            }}
          >
            <Grid
              container
              className="user-profile-popup-info"
              direction="column"
              alignItems="center"
              spacing={2}
            >
              <Grid item>
                <Box component="div">
                  <Avatar
                    src={user.profilePhoto}
                    className="user-profile-popup-avatar"
                  />
                </Box>
              </Grid>
              <Grid item justify="center">
                <Box component="h2" className="user-profile-popup-info-heading">
                  {`${user.firstName} ${user.lastName}`}
                </Box>
                <Box
                  component="p"
                  mt={-2.5}
                  className="user-profile-popup-info-subheading"
                >
                  {user.email}
                </Box>
                <Box
                  component="p"
                  className="user-profile-popup-role-tag"
                >
                  <span style={{ paddingRight: 10, marginTop: -1 }}>
                    <TagIcon size={17} />
                  </span>

                  <span>
                    {getRoleLabel(user.role)}
                  </span>
                </Box>
              </Grid>
            </Grid>
          </Grid>

          <Grid item>
            <Divider className="user-profile-popup-divider" />
          </Grid>

          <List className="user-profile-popup-action-list">
            {actionsList.map((item, index) => (
              <ListItem button key={index} onClick={item.onClick}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText>{item.label}</ListItemText>
              </ListItem>
            ))}
          </List>
        </Grid>
      </Menu>
    )
  }
}

export default UserProfilePopup;
