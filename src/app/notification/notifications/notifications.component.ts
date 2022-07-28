import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { markNotificationsAsSeen, removeNotification } from '../state/notification.actions';
import {
  selectNotifications,
  selectUnseenNotificationsCount,
} from '../state/notification.selectors';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationsComponent {
  readonly notifications$ = this.store.select(selectNotifications);
  readonly unseenCount$ = this.store.select(selectUnseenNotificationsCount);

  constructor(private store: Store) {}

  delete(id: string): void {
    this.store.dispatch(removeNotification({ id }));
  }

  seen(): void {
    this.store.dispatch(markNotificationsAsSeen());
  }
}
