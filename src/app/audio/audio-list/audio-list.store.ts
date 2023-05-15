import { inject, Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { Favoritable } from 'src/app/favorites/favoritable.model';
import { Audio } from '../audio.model';
import { AudioService } from '../audio.service';
import { selectAudioFavoriteIds } from '../state/audio.selectors';

export interface AudioListState {
  audios: Audio[];
}

@Injectable()
export class AudioListStore extends ComponentStore<AudioListState> {
  private store = inject(Store);
  private audioService = inject(AudioService);

  readonly audios = this.selectSignal(({ audios }) => audios);

  readonly setAudios = this.updater((state, audios: Audio[]) => ({ ...state, audios }));

  readonly load = this.effect((load$: Observable<void>) =>
    load$.pipe(
      switchMap(() => this.audioService.load()),
      tap(audios => this.setAudios(audios)),
    ),
  );

  // View Model Selector
  readonly audioList = this.selectSignal(
    this.audios,
    this.store.selectSignal(selectAudioFavoriteIds),
    (audios, favoriteIds) => {
      const favoritableAudios: (Audio & Favoritable)[] = audios.map(audio => ({
        ...audio,
        isFavorite: !!favoriteIds.includes(audio.id),
      }));
      return favoritableAudios;
    },
  );

  constructor() {
    super({ audios: [] });
  }
}
