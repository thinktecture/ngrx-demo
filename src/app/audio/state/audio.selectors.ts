import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AudioState } from './audio.reducer';

export const AUDIO_STATE = 'audio';

export const selectAudio = createFeatureSelector<AudioState>(AUDIO_STATE);

export const selectAudios = createSelector(selectAudio, ({ audios }) => audios);
export const selectAudioFavorites = createSelector(selectAudios, audios =>
  audios.filter(({ isFavorite }) => isFavorite),
);
