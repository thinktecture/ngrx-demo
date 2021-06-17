import { createReducer, on } from '@ngrx/store';
import { Audio } from '../audio.model';
import {
  createAudio,
  deleteAudio,
  loadAudioFavoritesSuccess,
  updateAudioSuccess,
} from './audio.actions';

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
  on(createAudio, (state, { audio }) => {
    const audios = [...state.audios, audio];
    return { ...state, audios };
  }),
  on(updateAudioSuccess, (state, { audio }) => {
    const audios = state.audios.filter(favorite => favorite.id !== audio.id).concat(audio);
    return { ...state, audios };
  }),
  on(deleteAudio, (state, { id }) => {
    const audios = state.audios.filter(favorite => favorite.id !== id);
    return { ...state, audios };
  }),
);
