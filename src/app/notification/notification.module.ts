import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { StoreModule } from '@ngrx/store';
import { NotificationDemoComponent } from './notification-demo/notification-demo.component';
import { NotificationRoutingModule } from './notification-routing.module';
import { NotificationsComponent } from './notifications/notifications.component';
import { notificationsReducer, NOTIFICATION_STATE } from './state/notification.reducer';

@NgModule({
  declarations: [NotificationsComponent, NotificationDemoComponent],
  imports: [
    CommonModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    StoreModule.forFeature(NOTIFICATION_STATE, notificationsReducer),
    NotificationRoutingModule,
  ],
  exports: [NotificationsComponent],
})
export class NotificationModule {}

export * from './notifications/notifications.component';
export * from './state/notification.actions';
export * from './state/notification.model';
export * from './state/notification.selectors';
