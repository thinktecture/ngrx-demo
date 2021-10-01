import { createReducer, on } from '@ngrx/store';
import { Audio } from '../audio.model';
import {
  addAudioFavoriteSuccess,
  loadAudioFavoritesSuccess,
  removeAudioFavoriteSuccess,
} from './audio.actions';

export interface AudioState {
  favorites: Audio[];
}

export const initialAudioState: AudioState = {
  favorites: [],
};

export const audioReducer = createReducer(
  // Provide initial state of the store
  initialAudioState,

  // Load a list of favorites
  on(loadAudioFavoritesSuccess, (state, { favorites }) => {
    return { ...state, favorites };
  }),

  // Add audio to favorite array
  on(addAudioFavoriteSuccess, (state, { audio }) => {
    const favorites = state.favorites.filter(({ id }) => audio.id !== id).concat(audio);
    return { ...state, favorites };
  }),

  // Remove audio from favorite array
  on(removeAudioFavoriteSuccess, (state, { audio }) => {
    const favorites = state.favorites.filter(({ id }) => audio.id !== id);
    return { ...state, favorites };
  }),
);
