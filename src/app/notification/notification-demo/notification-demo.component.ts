import { ChangeDetectionStrategy, Component } from '@angular/core';
import { createSelector, Store } from '@ngrx/store';
import {
  addNotification,
  removeNotification,
  updateNotification,
} from '../state/notification.actions';
import { selectUpdatableNotification } from '../state/notification.selectors';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const selectAddedUpatable = (reference: string) =>
  createSelector(selectUpdatableNotification({ reference }), notification => !!notification);

@Component({
  selector: 'app-notification-demo',
  templateUrl: './notification-demo.component.html',
  styleUrls: ['./notification-demo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationDemoComponent {
  private readonly key = 'my-key';

  private count = 0;

  readonly addedUpdatable$ = this.store.select(selectAddedUpatable(this.key));

  constructor(private store: Store) {}

  addNotification(): void {
    this.store.dispatch(
      addNotification({
        text: `This notification is not updatable [${this.count++}]`,
      }),
    );
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
