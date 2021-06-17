import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { map, switchMap } from 'rxjs/operators';
import { AudioService } from '../audio.service';
import {
  loadAudioFavorites,
  loadAudioFavoritesSuccess,
  toggleFavorite,
  updateAudio,
  updateAudioSuccess,
} from './audio.actions';

@Injectable()
export class AudioEffects implements OnInitEffects {
  readonly loadFavorites$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadAudioFavorites),
      switchMap(() => this.audioService.loadFavorites()),
      map(favorites => loadAudioFavoritesSuccess({ favorites })),
    ),
  );

  readonly updateAudio$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateAudio),
      switchMap(({ audio }) => this.audioService.update(audio)),
      map(audio => updateAudioSuccess({ audio })),
    ),
  );

  readonly toggleFavorite$ = createEffect(() =>
    this.actions$.pipe(
      ofType(toggleFavorite),
      switchMap(({ id }) => this.audioService.toggleFavorite(id)),
      map(audio => updateAudioSuccess({ audio })),
    ),
  );

  constructor(private actions$: Actions, private audioService: AudioService) {}

  ngrxOnInitEffects(): Action {
    return loadAudioFavorites();
  }
}
