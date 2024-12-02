import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { createSelector, Store } from '@ngrx/store';
import {
  addNotification,
  removeNotification,
  updateNotification,
} from '../state/notification.actions';
import { selectUpdatableNotification } from '../state/notification.selectors';

const selectAddedUpatable = (reference: string) =>
  createSelector(selectUpdatableNotification({ reference }), notification => !!notification);

let count = 0;

@Component({
  selector: 'app-notification-demo',
  templateUrl: './notification-demo.component.html',
  styleUrls: ['./notification-demo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule],
})
export class NotificationDemoComponent {
  private readonly key = 'my-key';
  private store = inject(Store);

  readonly addedUpdatable = this.store.selectSignal(selectAddedUpatable(this.key));

  addNotification(): void {
    const text = `This notification is not updatable [${count++}]`;
    this.store.dispatch(addNotification({ text }));
  }

  addUpdatableNotification(text: string): void {
    this.store.dispatch(addNotification({ text, reference: this.key }));
  }

  updateNotification(text: string): void {
    this.store.dispatch(updateNotification({ text, reference: this.key }));
  }

  delete(): void {
    this.store.dispatch(removeNotification({ reference: this.key }));
  }
}
