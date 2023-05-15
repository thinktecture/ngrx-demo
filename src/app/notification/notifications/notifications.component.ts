import { NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
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
  standalone: true,
  imports: [NgIf, MatListModule, MatButtonModule, NgFor],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationsComponent {
  private store = inject(Store);

  readonly notifications = this.store.selectSignal(selectNotifications);
  readonly unseenCount = this.store.selectSignal(selectUnseenNotificationsCount);

  delete(id: string): void {
    this.store.dispatch(removeNotification({ id }));
  }

  seen(): void {
    this.store.dispatch(markNotificationsAsSeen());
  }
}
