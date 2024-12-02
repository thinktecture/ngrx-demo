import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { FavoriteListComponent } from './favorites/favorite-list/favorite-list.component';
import { NotificationsComponent } from './notification/notifications/notifications.component';
import { selectUnseenNotificationsCount } from './notification/state/notification.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    RouterLink,
    MatIconModule,
    MatSidenavModule,
    FavoriteListComponent,
    RouterOutlet,
    NotificationsComponent,
  ],
})
export class AppComponent {
  private unseenCount = inject(Store).selectSignal(selectUnseenNotificationsCount);

  readonly icon = computed(() => (this.unseenCount() > 0 ? 'mark_email_unread' : 'mail'));

  readonly notificationsOpen = signal(false);

  toggleDrawer(): void {
    this.notificationsOpen.update(isOpen => !isOpen);
  }
}
