import { createAction, props } from '@ngrx/store';
import { Audio } from '../audio.model';

export const createAudio = createAction('[Audio] Create', props<{ audio: Audio }>());

export const deleteAudio = createAction('[Audio] Delete', props<{ id: string }>());

export const updateAudio = createAction('[Audio/API] Update', props<{ audio: Audio }>());
export const updateAudioSuccess = createAction('[Audio] Update Success', props<{ audio: Audio }>());

export const loadAudioFavorites = createAction('[Audio/API] Load Favorites');
export const loadAudioFavoritesSuccess = createAction(
  '[Audio] Load Favorites Success',
  props<{ favorites: Audio[] }>(),
);