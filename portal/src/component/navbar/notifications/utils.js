/**
 * Computes number of unread notifications using
 * `isRead` property of notification data.
 * 
 * @param {object[]} notifications
 * List of Notification Data
 */
export function getUnreadNotificationsCount(notifications) {
  if (notifications != null)
    return notifications.filter((data) => !data.isRead).length;

  else
    return 0;
}
