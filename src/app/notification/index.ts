import { ROUTES } from '@angular/router';
import { provideState } from '@ngrx/store';
import routes from './routes';
import { notificationFeature } from './state/notification.reducer';

export const provideNotification = () => [
  provideState(notificationFeature),
  { provide: ROUTES, useValue: routes, multi: true },
];
