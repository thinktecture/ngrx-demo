import { TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { firstValueFrom } from 'rxjs';
import {
  addNotification,
  markNotificationsAsSeen,
  Notification,
  NotificationModule,
  selectNotifications,
  selectNotificationState,
  selectUnseenNotifications,
  selectUnseenNotificationsCount,
  selectUpdatableNotification,
} from '../notification.module';

describe('Notification Selectors', () => {
  const reference = 'xx-ref';
  let store: Store;
  let initialNotifications: Notification[];

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({}), NotificationModule],
    });

    store = TestBed.inject<Store>(Store);

    // Add some notifications
    const initialOptions = [
      { text: 'xx-text-1' },
      { text: 'xx-text-2', reference },
      { text: 'xx-text-3' },
    ];
    initialOptions.forEach(options => store.dispatch(addNotification(options)));

    // Read initial state of the reducer
    initialNotifications = await firstValueFrom(store.select(selectNotifications));
  });

  describe('selectNotificationState', () => {
    it('should select the feature state', async () => {
      const state = await firstValueFrom(store.select(selectNotificationState));

      expect(state).toBeDefined();
    });
  });

  describe('selectUpdatableNotification', () => {
    it('should select the correct notification', async () => {
      const [expectedNotification] = initialNotifications.filter(
        notification => notification.reference === reference,
      );

      const notification = await firstValueFrom(
        store.select(selectUpdatableNotification({ reference })),
      );

      expect(notification).toEqual(expectedNotification);
    });
  });

  describe('selectUnseenNotifications', () => {
    it('should select all unseen notifications', async () => {
      store.dispatch(markNotificationsAsSeen());
      store.dispatch(addNotification({ text: 'xx-text' }));
      const actualNotifications = await firstValueFrom(store.select(selectNotifications));
      const expected = actualNotifications.filter(({ seen }) => !seen);

      const notifications = await firstValueFrom(store.select(selectUnseenNotifications));

      expect(notifications).toEqual(expected);
    });
  });

  describe('selectUnseenNotificationsCount', () => {
    it('should select the current unseen notifications count', async () => {
      store.dispatch(markNotificationsAsSeen());
      store.dispatch(addNotification({ text: 'xx-text' }));
      const expected = (await firstValueFrom(store.select(selectUnseenNotifications))).length;

      const actual = await firstValueFrom(store.select(selectUnseenNotificationsCount));

      expect(actual).toBe(expected);
    });
  });
});
