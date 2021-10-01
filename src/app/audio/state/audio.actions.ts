import { createAction, props } from '@ngrx/store';
import { Audio } from '../audio.model';

export const loadAudioFavorites = createAction('[Audio/API] Load Favorites');
export const loadAudioFavoritesSuccess = createAction(
  '[Audio] Load Favorites Success',
  props<{ favorites: Audio[] }>(),
);

export const addAudioFavorite = createAction('[Audio/API] Add Favorite', props<{ audio: Audio }>());
export const addAudioFavoriteSuccess = createAction(
  '[Audio] Add Favorite Success',
  props<{ audio: Audio }>(),
);

export const removeAudioFavorite = createAction(
  '[Audio/API] Remove Favorite',
  props<{ audio: Audio }>(),
);
export const removeAudioFavoriteSuccess = createAction(
  '[Audio] Remove Favorite Success',
  props<{ audio: Audio }>(),
);
