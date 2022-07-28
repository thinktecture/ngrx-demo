import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotificationDemoComponent } from './notification-demo/notification-demo.component';

const routes: Routes = [
  {
    path: 'notification',
    children: [{ path: '', component: NotificationDemoComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotificationRoutingModule {}
