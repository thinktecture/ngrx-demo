import { createAction, props } from '@ngrx/store';
import { Audio } from '../audio.model';

export const loadAudioFavorites = createAction('[Audio/API] Load Favorites');
export const loadAudioFavoritesSuccess = createAction(
  '[Audio] Load Favorites Success',
  props<{ favorites: Audio[] }>(),
);

export const updateAudio = createAction(
  '[Audio/API] Update',
  props<{ audio: Audio; redirect?: any }>(),
);
export const updateAudioSuccess = createAction(
  '[Audio] Update Success',
  props<{ audio: Audio; redirect?: any }>(),
);

export const toggleFavorite = createAction('[Audio/API] Toggle Favorite', props<{ id: string }>());
