import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { Audio } from '../audio.model';
import { AudioService } from '../audio.service';
import { selectAudios } from '../state/audio.selectors';

export interface AudioListState {
  audios: Audio[];
}

@Injectable()
export class AudioListStore extends ComponentStore<AudioListState> {
  readonly load = this.effect((load$: Observable<void>) =>
    load$.pipe(
      switchMap(() => this.audioService.load()),
      tap(audios => {
        this.patchState({ audios });
      }),
    ),
  );

  readonly audios$ = this.select(this.state$, this.store.select(selectAudios), (state, audios) => {
    const audioMap = new Map<string, Audio>(audios.map(audio => [audio.id, audio]));
    return state.audios.map(audio => audioMap.get(audio.id) ?? audio);
  });

  constructor(private store: Store, private audioService: AudioService) {
    super({ audios: [] });
  }
}
