import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { map, mapTo, switchMap } from 'rxjs/operators';
import { AudioService } from '../audio.service';
import {
  addAudioFavorite,
  addAudioFavoriteSuccess,
  loadAudioFavorites,
  loadAudioFavoritesSuccess,
  removeAudioFavorite,
  removeAudioFavoriteSuccess,
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

  readonly addFavorite$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addAudioFavorite),
      switchMap(({ audio }) => {
        return this.audioService.addFavorite(audio).pipe(mapTo(addAudioFavoriteSuccess({ audio })));
      }),
    ),
  );

  readonly removeFavorite$ = createEffect(() =>
    this.actions$.pipe(
      ofType(removeAudioFavorite),
      switchMap(({ audio }) => {
        return this.audioService
          .removeFavorite(audio)
          .pipe(mapTo(removeAudioFavoriteSuccess({ audio })));
      }),
    ),
  );

  constructor(private actions$: Actions, private audioService: AudioService) {}

  ngrxOnInitEffects(): Action {
    return loadAudioFavorites();
  }
}
