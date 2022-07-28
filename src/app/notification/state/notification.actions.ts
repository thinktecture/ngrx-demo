import { createAction, props } from '@ngrx/store';
import { NotificationOptions, NotificationReference } from './notification.model';

export const addNotification = createAction('[Notification] add', props<NotificationOptions>());

export const updateNotification = createAction(
  '[Notification] update',
  props<NotificationOptions & NotificationReference>(),
);

export const removeNotification = createAction(
  '[Notification] remove',
  props<NotificationReference | { id: string }>(),
);

export const markNotificationsAsSeen = createAction('[Notification] mark all as seen');
