import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FavoriteItem } from '../../favorites/favorite-list/favorite-item.model';
import { toggleFavorite } from './audio.actions';
import { AudioState } from './audio.reducer';

export const AUDIO_STATE = 'audio';

export const selectAudio = createFeatureSelector<AudioState>(AUDIO_STATE);

export const selectAudios = createSelector(selectAudio, ({ audios }) => audios);

export const selectAudioFavorites = createSelector(selectAudios, audios =>
  audios.filter(({ isFavorite }) => isFavorite),
);

export const selectAudioFavoriteItems = createSelector(selectAudioFavorites, favorites => {
  const items: FavoriteItem[] = favorites.map(favorite => ({
    id: favorite.id,
    caption: `${favorite.title}`,
    subCaption: `by ${favorite.author}`,
    toggleAction: toggleFavorite({ id: favorite.id }),
  }));
  return items;
});
