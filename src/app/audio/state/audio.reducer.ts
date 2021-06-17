import { createReducer, on } from '@ngrx/store';
import { Audio } from '../audio.model';
import { createAudio, deleteAudio, loadAudioFavoritesSuccess, updateAudio } from './audio.actions';

export interface AudioState {
  favorites: Audio[];
}

export const initialAudioState: AudioState = {
  favorites: [],
};

export const audioReducer = createReducer(
  initialAudioState,
  on(loadAudioFavoritesSuccess, (state, { favorites }) => {
    return { ...state, favorites };
  }),
  on(createAudio, (state, { audio }) => {
    if (audio.isFavorite) {
      const favorites = [...state.favorites, audio];
      return { ...state, favorites };
    }
    return state;
  }),
  on(updateAudio, (state, { audio }) => {
    const favorites = state.favorites.filter(favorite => favorite.id !== audio.id);
    if (audio.isFavorite) {
      return { ...state, favorites: [...favorites, audio] };
    }
    return { ...state, favorites };
  }),
  on(deleteAudio, (state, { id }) => {
    const favorites = state.favorites.filter(favorite => favorite.id !== id);
    return { ...state, favorites };
  }),
);
