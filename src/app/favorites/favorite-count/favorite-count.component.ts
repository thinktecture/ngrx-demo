import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectFavoriteCount } from '../favorite-list/favorite-list.component';

@Component({
  selector: 'app-favorite-count',
  templateUrl: './favorite-count.component.html',
  styleUrls: ['./favorite-count.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavoriteCountComponent {
  readonly num$ = this.store.select(selectFavoriteCount);

  constructor(private store: Store) {}
}
