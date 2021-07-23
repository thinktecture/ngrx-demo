import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { filter, map, switchMap, tap } from 'rxjs/operators';
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
      switchMap(({ audio, redirect }) => {
        return this.audioService.update(audio).pipe(map(updated => ({ audio: updated, redirect })));
      }),
      map(data => updateAudioSuccess(data)),
    ),
  );

  readonly updateSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(updateAudioSuccess),
        filter(({ redirect }) => !!redirect),
        tap(({ redirect }) => {
          this.router.navigate(redirect);
        }),
      ),
    { dispatch: false },
  );

  readonly toggleFavorite$ = createEffect(() =>
    this.actions$.pipe(
      ofType(toggleFavorite),
      switchMap(({ id }) => this.audioService.toggleFavorite(id)),
      map(audio => updateAudioSuccess({ audio })),
    ),
  );

  constructor(
    private actions$: Actions,
    private audioService: AudioService,
    private router: Router,
  ) {}

  ngrxOnInitEffects(): Action {
    return loadAudioFavorites();
  }
}
