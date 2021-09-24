import { ChangeDetectionStrategy, Component } from '@angular/core';
import { createSelector, Store } from '@ngrx/store';
import { selectAudioFavoriteItems } from '../../audio/state/audio.selectors';
import { selectBookFavoriteItems } from '../../book/state/book.selectors';
import { FavoriteItem } from './favorite-item.model';

const selectFavorites = createSelector(
  selectAudioFavoriteItems,
  selectBookFavoriteItems,
  (audios, books) => {
    return [...audios, ...books].sort((a, b) => a.id.localeCompare(b.id));
  },
);

export const selectFavoriteCount = createSelector(selectFavorites, favorites => favorites.length);

@Component({
  selector: 'app-favorite-list',
  templateUrl: './favorite-list.component.html',
  styleUrls: ['./favorite-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavoriteListComponent {
  readonly favorites$ = this.store.select(selectFavorites);

  constructor(private store: Store) {}

  toggle(item: FavoriteItem): void {
    this.store.dispatch(item.toggleAction);
  }
}
