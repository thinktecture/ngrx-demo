import { Routes } from '@angular/router';
import { NotificationDemoComponent } from './notification-demo/notification-demo.component';

const routes: Routes = [
  {
    path: 'notification',
    children: [{ path: '', component: NotificationDemoComponent }],
  },
];

export default routes;
