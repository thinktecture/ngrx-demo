import { createAction, props } from '@ngrx/store';
import { Audio } from '../audio.model';

export const addAudioFavorite = createAction('[Audio] Add Favorite', props<{ audio: Audio }>());

export const removeAudioFavorite = createAction(
  '[Audio] Remove Favorite',
  props<{ audio: Audio }>(),
);
