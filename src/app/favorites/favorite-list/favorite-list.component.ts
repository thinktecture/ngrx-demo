import { Component } from '@angular/core';
import { createSelector, Store } from '@ngrx/store';
import { selectAudioFavoriteItems } from '../../audio/state/audio.selectors';
import { FavoriteItem } from './favorite-item.model';

const selectFavorites = createSelector(selectAudioFavoriteItems, items => {
  return items.sort((a, b) => a.id.localeCompare(b.id));
});

@Component({
  selector: 'app-favorite-list',
  templateUrl: './favorite-list.component.html',
  styleUrls: ['./favorite-list.component.scss'],
})
export class FavoriteListComponent {
  readonly favorites$ = this.store.select(selectFavorites);

  constructor(private store: Store) {}

  toggle(item: FavoriteItem): void {
    this.store.dispatch(item.toggleAction);
  }
}
