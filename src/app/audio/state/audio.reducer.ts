import { createReducer, on } from '@ngrx/store';
import { Audio } from '../audio.model';
import { addAudioFavorite, removeAudioFavorite } from './audio.actions';

export interface AudioState {
  favorites: Audio[];
}

export const initialAudioState: AudioState = {
  favorites: [],
};

export const audioReducer = createReducer(
  // Provide initial state of the store
  initialAudioState,

  // Add audio to favorite array
  on(addAudioFavorite, (state, { audio }) => {
    const favorites = state.favorites.filter(({ id }) => audio.id !== id).concat(audio);
    return { ...state, favorites };
  }),

  // Remove audio from favorite array
  on(removeAudioFavorite, (state, { audio }) => {
    const favorites = state.favorites.filter(({ id }) => audio.id !== id);
    return { ...state, favorites };
  }),
);
