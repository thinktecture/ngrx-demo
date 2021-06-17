import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { map, switchMap } from 'rxjs/operators';
import { AudioService } from '../audio.service';
import { loadAudioFavorites, loadAudioFavoritesSuccess } from './audio.actions';

@Injectable()
export class AudioEffects implements OnInitEffects {
  readonly loadFavorites$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadAudioFavorites),
      switchMap(() => this.audioService.loadFavorites()),
      map(favorites => loadAudioFavoritesSuccess({ favorites })),
    ),
  );

  constructor(private actions$: Actions, private audioService: AudioService) {}

  ngrxOnInitEffects(): Action {
    return loadAudioFavorites();
  }
}
