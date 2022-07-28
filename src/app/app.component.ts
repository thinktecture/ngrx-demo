import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectUnseenNotificationsCount } from './notification/notification.module';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  readonly unseenCount$ = this.store.select(selectUnseenNotificationsCount);

  notificationsOpen = false;

  constructor(private readonly store: Store) {}
}
