import { createFeatureSelector, createSelector } from '@ngrx/store';
import { NotificationReference } from './notification.model';
import { NOTIFICATION_STATE, NotificationState } from './notification.reducer';

export const selectNotificationState = createFeatureSelector<NotificationState>(NOTIFICATION_STATE);

export const selectNotifications = createSelector(
  selectNotificationState,
  ({ notifications }) => notifications,
);

export const selectUpdatableNotification = ({ reference }: NotificationReference) =>
  createSelector(selectNotifications, notifications => {
    return notifications.find(notification => notification.reference === reference);
  });

export const selectUnseenNotifications = createSelector(selectNotifications, notifications => {
  return notifications.filter(notification => !notification.seen);
});

export const selectUnseenNotificationsCount = createSelector(
  selectUnseenNotifications,
  notifications => notifications.length,
);
