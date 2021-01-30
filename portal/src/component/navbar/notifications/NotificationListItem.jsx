import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import { Avatar, Fab } from "@material-ui/core";
import "./NotificationListItem.css";

import {
  XIcon,
  AlertIcon,
  BellIcon,
  CheckIcon,
  ClockIcon,
  UploadIcon,
  PlusIcon,
  PencilIcon,
  PaperAirplaneIcon,
  EyeClosedIcon,
  EyeIcon
} from "@primer/octicons-react";

class NotificationItem extends React.Component {
  /**
   * Returns Icon Component for a given notification data.
   *
   * @returns {React.Component}
   * Icon Component
   */
  getIcon() {
    switch (this.props.notificationData.type) {
      /* TASK NOTIFICATIONS */

      case "TASK_CREATE":
        return (
          <Avatar style={this.getNotificationColors()}>
            <PlusIcon />
          </Avatar>
        );

      case "TASK_UPDATE":
        return (
          <Avatar style={this.getNotificationColors()}>
            <PencilIcon />
          </Avatar>
        );

      case "TASK_DELETE":
        return (
          <Avatar style={this.getNotificationColors()}>
            <XIcon />
          </Avatar>
        );

      case "TASK_DUE_SOON":
        return (
          <Avatar style={this.getNotificationColors()}>
            <AlertIcon />
          </Avatar>
        );

      case "TASK_OVERDUE":
        return (
          <Avatar style={this.getNotificationColors()}>
            <ClockIcon />
          </Avatar>
        );

      case "TASK_COMPLETED":
        return (
          <Avatar style={this.getNotificationColors()}>
            <CheckIcon />
          </Avatar>
        );

      /* DOCUMENTS NOTIFICATIONS */

      case "DOC_UPLOADED":
        return (
          <Avatar style={this.getNotificationColors()}>
            <UploadIcon />
          </Avatar>
        );

      case "DOC_DELETED":
        return (
          <Avatar style={this.getNotificationColors()}>
            <XIcon />
          </Avatar>
        );

      case "DOC_UPDATE":
        return (
          <Avatar style={this.getNotificationColors()}>
            <PencilIcon />
          </Avatar>
        );

      /* INVITATION NOTIFICATIONS */

      case "INVITATION_SENT":
        return (
          <Avatar style={this.getNotificationColors()}>
            <PaperAirplaneIcon />
          </Avatar>
        );

      case "INVITATION_ACCEPTED":
        return (
          <Avatar style={this.getNotificationColors()}>
            <CheckIcon />
          </Avatar>
        );

      case "INVITATION_RETRACTED":
        return (
          <Avatar style={this.getNotificationColors()}>
            <XIcon />
          </Avatar>
        );

      default:
        return (
          <Avatar style={this.getNotificationColors()}>
            <BellIcon />
          </Avatar>
        );
    }
  }

  /**
   * Returns a map of `color` and `backgroundColor` to be applied
   * to the `ListItemAvatar`.
   *
   * @returns {{color: string, background: string}}
   * Map of `color` and `backgroundColor`
   */
  getNotificationColors() {
    switch (this.props.notificationData.type.split('_')[0]) {
      case "TASK":
        return { color: "#0366D6", background: "#0366D64C" };

      // case "TASK_DUE_SOON":
      //   return { color: "#F6AC00", background: "#F6AC004C" };

      // case "TASK_OVERDUE":
      //   return { color: "#EB0000", background: "#EB00004C" };

      // case "TASK_COMPLETED":
      //   return { color: "#01AE4B", background: "#01AE4B4C" };

      case "DOC":
        return { color: "#FDAC00", background: "#FDAC004C" };

      case "INVITATION":
        return { color: "#01AE4B", background: "#01AE4B4C" };

      default:
        return { color: "#0000005c" };
    }
  }

  /**
   * Primary text to be displayed in the list item.
   *
   * @returns {string}
   * Primary Text
   */
  getPrimaryText() {
    switch (this.props.notificationData.type) {
      case "TASK_CREATE":
        return `New task created`;

      case "TASK_UPDATE":
        return `Task updated`;

      case "TASK_DELETE":
        return `Task Deleted`;

      case "TASK_DUE_SOON":
        return `${this.props.notificationData.task} due soon`;

      case "TASK_OVERDUE":
        return `${this.props.notificationData.task} is overdue`;

      case "TASK_COMPLETED":
        return `Task completed`;

      case "DOC_UPLOADED":
        return `Document Uploaded`;

      case "DOC_DELETED":
        return `Document Deleted`;

      case "DOC_UPDATE":
        return `Document Edited`;

      case "INVITATION_SENT":
        return `Invitation Sent`;

      case "INVITATION_ACCEPTED":
        return `Invitation Accepted`;

      case "INVITATION_RETRACTED":
        return `Invitation Retracted`;

      default:
        return 'Notification';
    }
  }

  /**
   * Secondary text to be displayed in the list item.
   *
   * @returns {string}
   * Secondary Text
   */
  getSecondaryText() {
    switch (this.props.notificationData.type) {
      case "TASK_CREATE":
        return `${this.props.notificationData.taskName}`;

      case "TASK_UPDATE":
        return `${this.props.notificationData.taskName}`;

      case "TASK_DELETE":
        return `${this.props.notificationData.taskName}`;

      case "TASK_DUE_SOON":
        return `Due in ${this.props.notificationData.days_passed} days`;

      case "TASK_OVERDUE":
        let due_date = new Date(this.props.notificationData.due_date);
        let months = [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ];

        return `Was due on ${due_date.getDay()} ${
          months[due_date.getMonth()]
        } ${due_date.getFullYear()}`;

      case "TASK_COMPLETED":
        return `Completed by ${this.props.notificationData.assignedTo}`;

      case "DOC_UPLOADED":
        return `Uploaded "${this.props.notificationData.name}"`;

      case "DOC_DELETED":
        return `Deleted "${this.props.notificationData.name}"`;

      case "DOC_UPDATE":
        return `Updated "${this.props.notificationData.name}" by ${this.props.notificationData.lastModifiedBy}`;

      case "INVITATION_SENT":
        return `"${this.props.notificationData.name}" is invited to ${this.props.notificationData.tid}`;

      case "INVITATION_ACCEPTED":
        return `"${this.props.notificationData.name}" accepted invitation to ${this.props.notificationData.tid}`;

      case "INVITATION_RETRACTED":
        return `${this.props.notificationData.name}'s invitation to ${this.props.notificationData.tid} has been retracted`;

      default:
        return 'Unknown Notification';
    }
  }

  /**
   * Returns the relative time of the notification
   * based on the timestamp.
   */
  getRelativeTime() {
    return moment(
      this.props.notificationData.timestamp
        ? this.props.notificationData.timestamp
        : ''
    ).fromNow();
  }

  /**
   * Returns link for navigating to a particular route
   * when clicked.
   */
  getNavLink() {
    switch (this.props.notificationData.type) {
      case "TASK_CREATE":
        return `/transaction/${this.props.notificationData.tid}/todo#${this.props.notificationData.taskId}`;

      case "TASK_UPDATE":
        return `/transaction/${this.props.notificationData.tid}/todo#${this.props.notificationData.taskId}`;

      case "TASK_DELETE":
        return `/transaction/${this.props.notificationData.tid}/todo`;

      case "TASK_DUE_SOON":
        return `/transaction/${this.props.notificationData.tid}/todo#${this.props.notificationData.taskId}`;

      case "TASK_OVERDUE":
        return `/transaction/${this.props.notificationData.tid}/todo#${this.props.notificationData.taskId}`;

      case "TASK_COMPLETED":
        return `/transaction/${this.props.notificationData.tid}/todo#${this.props.notificationData.taskId}`;

      case "DOC_UPLOADED":
        return `/transaction/${this.props.notificationData.tid}/paperwork#${this.props.notificationData.name}`;

      case "DOC_DELETED":
        return `/transaction/${this.props.notificationData.tid}/paperwork`;

      case "DOC_UPDATE":
        return `/transaction/${this.props.notificationData.tid}/paperwork#${this.props.notificationData.name}`;

      case "INVITATION_SENT":
        return `/transaction/${this.props.notificationData.tid}/people/#${this.props.notificationData.email}`;

      case "INVITATION_ACCEPTED":
        return `/transaction/${this.props.notificationData.tid}/people/#${this.props.notificationData.email}`;

      case "INVITATION_RETRACTED":
        return `/transaction/${this.props.notificationData.tid}/people`;

      case "CHAT_MESSAGE":
        return `.`;

      default:
        return 'Unknown Notification';
    }
  }

  /**
   * Marks a notification as read by setting
   * `isRead` field to `false`.
   */
  markNotificationAsUnread() {
    let notificationId = this.props.notificationData.id;
    console.log(`Mark notification ("${notificationId}") as unread...`);

    // @TODO: Add logic
  }

  /**
   * Marks a notification as read by setting
   * `isRead` field to `true`.
   */
  markNotificationAsRead() {
    let notificationId = this.props.notificationData.id;
    console.log(`Mark notification ("${notificationId}") as read...`);

    /*
      Uses Firebase
      @TODO: Logic to be replaced
    */

    // if (!this.props.notificationData.isRead)
    //   myFirestore
    //     .collection('users')
    //     .doc(localStorage.getItem("userID"))
    //     .collection('notifications')
    //     .doc(notificationId)
    //     .update({
    //       isRead: true
    //     });
  }

  /**
   * Toggles the status of a notification based
   * on `isRead` property.
   */
  toggleNotificationStatus() {
    if (this.props.notificationData.isRead) {
      this.markNotificationAsUnread();
    }
    else {
      this.markNotificationAsRead();
    }
  }

  /**
   * Deletes a notification from notification list.
   */
  removeNotification() {
    let notificationId = this.props.notificationData.id;
    console.log(`Dismiss notification ("${notificationId}")...`);

    /*
      Uses Firebase
      @TODO: Logic to be replaced
    */

    // myFirestore
    //   .collection('users')
    //   .doc(localStorage.getItem("userID"))
    //   .collection('notifications')
    //   .doc(notificationId)
    //   .delete();
  }

  render() {
    let { notificationData } = this.props;

    return (
      <div
        className={[
          'notification-list-item-root',
          !notificationData.isRead ? 'notification-unread' : ''
        ].join(' ')}
      >
        <Link
          className="notification-list-item"
          to={this.getNavLink()}
          onClick={() => this.markNotificationAsRead()}
        >
          <div className="notification-list-item-icon">
            {this.getIcon()}
          </div>

          <div className="notification-list-item-content">
            <div className="notification-list-item-primary-text">
              {this.getPrimaryText()}
            </div>
            <div className="notification-list-item-secondary-text">
              {this.getSecondaryText()}
            </div>
            <div className="notification-list-item-misc-group">
              <div className="notification-list-item-relative-time">
                {this.getRelativeTime()}
              </div>
              <div className="notification-item-action-group">
                <Fab
                  size="small"
                  variant="extended"
                  className="notification-item-action"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();

                    this.toggleNotificationStatus();
                  }}
                >
                  <div style={{ marginLeft: 5 }}>
                    {notificationData.isRead ? <EyeClosedIcon /> : <EyeIcon />}
                  </div>

                  <div className="notification-item-action-text">
                    {notificationData.isRead ? 'Mark as unread' : 'Mark as read'}
                  </div>
                </Fab>

                <Fab
                  size="small"
                  variant="extended"
                  className="notification-item-action"
                  aria-label="Dismiss"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();

                    this.removeNotification();
                  }}
                >
                  <CheckIcon />

                  {/* <div className="notification-item-action-text">
                    Dismiss
                  </div> */}
                </Fab>
              </div>
            </div>
          </div>
        </Link>
      </div>
    );
  }
}

export default NotificationItem;
