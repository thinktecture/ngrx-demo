import { createSelector } from '@ngrx/store';
import { FavoriteItem } from '../../favorites/favorite-list/favorite-item.model';
import { removeAudioFavorite } from './audio.actions';
import { audioFeature } from './audio.reducer';

export const selectAudio = audioFeature.selectAudioState;

export const selectAudioFavorites = audioFeature.selectFavorites;
export const selectAudioFavoriteIds = createSelector(selectAudioFavorites, favorites =>
  favorites.map(({ id }) => id),
);

export const selectAudioFavoriteItems = createSelector(selectAudioFavorites, favorites => {
  const items: FavoriteItem[] = favorites.map(audio => ({
    id: audio.id,
    caption: audio.title,
    subCaption: `by ${audio.author}`,
    toggleAction: removeAudioFavorite({ audio }),
  }));
  return items;
});
