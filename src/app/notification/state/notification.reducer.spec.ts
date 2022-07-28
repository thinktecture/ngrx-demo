import { TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { firstValueFrom } from 'rxjs';
import {
  addNotification,
  markNotificationsAsSeen,
  NotificationModule,
  NotificationOptions,
  NotificationReference,
  removeNotification,
  selectNotifications,
  updateNotification,
} from '../notification.module';

describe('Notification Reducer', () => {
  let store: Store;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({}), NotificationModule],
    });

    store = TestBed.inject<Store>(Store);
  });

  describe('addNotification', () => {
    it('should add a notification with correct options', async () => {
      const initial = await firstValueFrom(store.select(selectNotifications));
      const expectedOptions: NotificationOptions = {
        text: 'xx-text',
        icon: 'xx-icon',
        reference: 'xx-ref',
      };

      store.dispatch(addNotification(expectedOptions));

      const actual = await firstValueFrom(store.select(selectNotifications));
      expect(actual.length).toBe(initial.length + 1);
      expect(actual.slice(-1).pop()).toEqual(jasmine.objectContaining(expectedOptions));
    });

    it('should initialize added notification as unseen', async () => {
      const reference = 'xx-ref';

      store.dispatch(addNotification({ text: 'xx-text', reference }));

      const actual = await firstValueFrom(store.select(selectNotifications));
      const foundNotification = actual.find(notification => notification.reference === reference);
      expect(foundNotification).toBeDefined();
      expect(foundNotification?.seen).toBeFalse();
    });

    it('should only add a referenced notification once', async () => {
      const initial = await firstValueFrom(store.select(selectNotifications));
      const expectedOptions: NotificationOptions = {
        text: 'xx-text',
        icon: 'xx-icon',
        reference: 'xx-ref',
      };

      store.dispatch(addNotification(expectedOptions));
      store.dispatch(addNotification(expectedOptions));

      const actual = await firstValueFrom(store.select(selectNotifications));
      expect(actual.length).toBe(initial.length + 1);
      expect(actual.slice(-1).pop()).toEqual(jasmine.objectContaining(expectedOptions));
    });

    it('should update and re-append a referenced notification', async () => {
      const initial = await firstValueFrom(store.select(selectNotifications));
      const reference = 'xx-ref';
      const expectedOptions: NotificationOptions = {
        text: 'xx-text',
        icon: 'xx-icon',
        reference,
      };
      store.dispatch(addNotification({ text: 'xx-initial', reference }));
      store.dispatch(addNotification({ text: 'xx-dummy' }));

      store.dispatch(addNotification(expectedOptions));

      const actual = await firstValueFrom(store.select(selectNotifications));
      expect(actual.length).toBe(initial.length + 2);
      expect(actual.slice(-1).pop()).toEqual(jasmine.objectContaining(expectedOptions));
    });
  });

  describe('updateNotification', () => {
    it('should update a notification with correct options', async () => {
      const reference = 'xx-ref';
      const expectedOptions: NotificationOptions & NotificationReference = {
        text: 'xx-updated-text',
        icon: 'xx-updated-icon',
        reference,
      };
      store.dispatch(addNotification({ text: 'xx-initial', reference }));
      const initial = await firstValueFrom(store.select(selectNotifications));

      store.dispatch(updateNotification(expectedOptions));

      const actual = await firstValueFrom(store.select(selectNotifications));
      const notification = actual.find(notification => notification.reference === reference);
      expect(initial.length).toBe(actual.length);
      expect(notification).toEqual(jasmine.objectContaining(expectedOptions));
    });

    it('should mark the updated notification as unseen', async () => {
      const reference = 'xx-ref';
      const options: NotificationOptions & NotificationReference = {
        text: 'xx-text',
        icon: 'xx-icon',
        reference,
      };
      store.dispatch(addNotification(options));
      store.dispatch(markNotificationsAsSeen());

      store.dispatch(updateNotification({ ...options, text: 'xx-updated-text' }));

      const actual = await firstValueFrom(store.select(selectNotifications));
      const notification = actual.find(notification => notification.reference === reference);
      expect(notification).toBeDefined();
      expect(notification?.seen).toBeFalse();
    });

    it('should not re-order notifications', async () => {
      const reference = 'xx-ref';
      store.dispatch(addNotification({ text: 'xx-dummy-1' }));
      store.dispatch(addNotification({ text: 'xx-initial', reference }));
      store.dispatch(addNotification({ text: 'xx-dummy-2' }));
      const initial = await firstValueFrom(store.select(selectNotifications));

      store.dispatch(updateNotification({ text: 'xx-updated-text', reference }));

      const actual = await firstValueFrom(store.select(selectNotifications));
      expect(actual.map(({ id }) => id)).toEqual(initial.map(({ id }) => id));
    });
  });

  describe('removeNotification', () => {
    it('should remove the correct notification by reference', async () => {
      const reference = 'xx-ref';
      store.dispatch(addNotification({ text: 'xx-dummy-1' }));
      store.dispatch(addNotification({ text: 'xx-text', reference }));
      store.dispatch(addNotification({ text: 'xx-dummy-2' }));
      const initial = await firstValueFrom(store.select(selectNotifications));

      store.dispatch(removeNotification({ reference }));

      const actual = await firstValueFrom(store.select(selectNotifications));
      expect(actual.length).toBe(initial.length - 1);
      expect(actual).not.toContain(jasmine.objectContaining({ reference }));
    });

    it('should remove the correct notification by id', async () => {
      const reference = 'xx-ref';
      store.dispatch(addNotification({ text: 'xx-dummy-1' }));
      store.dispatch(addNotification({ text: 'xx-dummy-2', reference }));
      store.dispatch(addNotification({ text: 'xx-dummy-3' }));
      const notifications = await firstValueFrom(store.select(selectNotifications));
      const targetId = notifications.find(notification => notification.reference === reference)?.id;
      const initial = await firstValueFrom(store.select(selectNotifications));

      store.dispatch(removeNotification({ id: targetId ?? '' }));

      const actual = await firstValueFrom(store.select(selectNotifications));
      expect(targetId).toBeDefined();
      expect(actual.length).toBe(initial.length - 1);
      expect(actual).not.toContain(jasmine.objectContaining({ id: targetId }));
    });

    it('should not re-order notifications', async () => {
      const reference = 'xx-ref';
      const reference2 = 'xx-ref-2';
      store.dispatch(addNotification({ text: 'xx-dummy-1' }));
      store.dispatch(addNotification({ text: 'xx-dummy-2', reference }));
      store.dispatch(addNotification({ text: 'xx-dummy-3' }));
      store.dispatch(addNotification({ text: 'xx-dummy-4', reference: reference2 }));
      store.dispatch(addNotification({ text: 'xx-dummy-5' }));
      const initial = await firstValueFrom(store.select(selectNotifications));
      const targetId = initial.find(notification => notification.reference === reference2)?.id;

      store.dispatch(removeNotification({ reference }));
      store.dispatch(removeNotification({ id: targetId ?? '' }));

      const actual = await firstValueFrom(store.select(selectNotifications));
      expect(targetId).toBeDefined();
      expect(actual.length).toBe(initial.length - 2);
      expect(actual).not.toContain(jasmine.objectContaining({ id: targetId }));
      expect(actual).not.toContain(jasmine.objectContaining({ reference }));
    });
  });

  describe('markNotificationsAsSeen', () => {
    it('should mark all notifications as seen', async () => {
      store.dispatch(addNotification({ text: 'xx-text-1' }));
      store.dispatch(addNotification({ text: 'xx-text-2', reference: 'xx-ref' }));
      store.dispatch(addNotification({ text: 'xx-text-3' }));

      store.dispatch(markNotificationsAsSeen());

      const notifications = await firstValueFrom(store.select(selectNotifications));
      expect(notifications.every(({ seen }) => seen)).toBeTrue();
    });
  });
});
