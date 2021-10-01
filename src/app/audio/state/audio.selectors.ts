import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FavoriteItem } from '../../favorites/favorite-list/favorite-item.model';
import { removeAudioFavorite } from './audio.actions';
import { AudioState } from './audio.reducer';

export const AUDIO_STATE = 'audio';

export const selectAudio = createFeatureSelector<AudioState>(AUDIO_STATE);

export const selectAudioFavorites = createSelector(selectAudio, ({ favorites }) => favorites);
export const selectAudioFavoriteIds = createSelector(selectAudio, ({ favorites }) =>
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
