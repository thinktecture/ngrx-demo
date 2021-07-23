import { createReducer, on } from '@ngrx/store';
import { Audio } from '../audio.model';
import { loadAudioFavoritesSuccess, updateAudioSuccess } from './audio.actions';

export interface AudioState {
  audios: Audio[];
}

export const initialAudioState: AudioState = {
  audios: [],
};

export const audioReducer = createReducer(
  initialAudioState,
  on(loadAudioFavoritesSuccess, (state, { favorites }) => {
    return { ...state, audios: favorites };
  }),
  on(updateAudioSuccess, (state, { audio }) => {
    const audios = state.audios.filter(favorite => favorite.id !== audio.id).concat(audio);
    return { ...state, audios };
  }),
);
