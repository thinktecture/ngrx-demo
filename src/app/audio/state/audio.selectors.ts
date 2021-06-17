import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AudioState } from './audio.reducer';

export const AUDIO_STATE = 'audio';

export const selectAudio = createFeatureSelector<AudioState>(AUDIO_STATE);

export const selectAudioFavorites = createSelector(selectAudio, state => state.favorites);
