import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
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
  standalone: true,
  imports: [MatListModule, MatButtonModule, MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavoriteListComponent {
  private store = inject(Store);

  readonly favorites = this.store.selectSignal(selectFavorites);

  toggle(item: FavoriteItem): void {
    this.store.dispatch(item.toggleAction);
  }
}
