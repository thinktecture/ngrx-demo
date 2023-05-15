import { createFeature, createReducer, on } from '@ngrx/store';
import {
  addNotification,
  markNotificationsAsSeen,
  removeNotification,
  updateNotification,
} from './notification.actions';
import { Notification } from './notification.model';

export interface NotificationState {
  notifications: Notification[];
}

const initialState: NotificationState = {
  notifications: [],
};

let notificationId = 0;

const reducer = createReducer(
  initialState,
  on(addNotification, (state, options) => {
    const id = `${notificationId++}`;
    const notification: Notification = { id, ...options, seen: false };
    const notifications = state.notifications.filter(({ reference }) => {
      return !options.reference || reference !== options.reference;
    });
    return { ...state, notifications: [...notifications, notification] };
  }),
  on(updateNotification, (state, { reference, ...options }) => {
    const notifications = state.notifications.map(notification => {
      return reference === notification.reference
        ? { ...notification, ...options, seen: false }
        : notification;
    });
    return { ...state, notifications };
  }),
  on(removeNotification, (state, ref) => {
    const notifications = state.notifications.filter(({ id, reference }) => {
      return 'id' in ref ? id !== ref.id : reference !== ref.reference;
    });
    return { ...state, notifications };
  }),
  on(markNotificationsAsSeen, state => {
    const notifications = state.notifications.map(notification => ({
      ...notification,
      seen: true,
    }));
    return { ...state, notifications };
  }),
);

export const notificationFeature = createFeature({ name: 'notification', reducer });
