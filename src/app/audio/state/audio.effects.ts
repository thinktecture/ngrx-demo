import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { AudioService } from '../audio.service';
import {
  addAudioFavorite,
  addAudioFavoriteSuccess,
  loadAudioFavorites,
  loadAudioFavoritesSuccess,
  removeAudioFavorite,
  removeAudioFavoriteSuccess,
} from './audio.actions';

export const loadFavorites$ = createEffect(
  (actions$ = inject(Actions), audioService = inject(AudioService)) =>
    actions$.pipe(
      ofType(loadAudioFavorites),
      switchMap(() => audioService.loadFavorites()),
      map(favorites => loadAudioFavoritesSuccess({ favorites })),
    ),
  { functional: true },
);

export const addFavorite$ = createEffect(
  (actions$ = inject(Actions), audioService = inject(AudioService)) =>
    actions$.pipe(
      ofType(addAudioFavorite),
      switchMap(({ audio }) => {
        return audioService.addFavorite(audio).pipe(
          map(() => addAudioFavoriteSuccess({ audio })),
          catchError(() => of(removeAudioFavorite({ audio }))),
        );
      }),
    ),
  { functional: true },
);

export const removeFavorite = createEffect(
  (actions$ = inject(Actions), audioService = inject(AudioService)) =>
    actions$.pipe(
      ofType(removeAudioFavorite),
      switchMap(({ audio }) => {
        return audioService.removeFavorite(audio).pipe(
          map(() => removeAudioFavoriteSuccess({ audio })),
          catchError(() => of(addAudioFavorite({ audio }))),
        );
      }),
    ),
  { functional: true },
);
