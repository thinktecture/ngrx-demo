import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Audio } from '../audio.model';
import { AudioService } from '../audio.service';

export interface AudioEditorState {
  audio?: Audio;
  loading: boolean;
}

@Injectable()
export class AudioEditorStore extends ComponentStore<AudioEditorState> {
  readonly load = this.effect((id$: Observable<string>) => {
    return id$.pipe(
      switchMap(id => {
        this.patchState({ loading: true });
        return this.audioService.byId(id);
      }),
      tapResponse(
        audio => {
          this.patchState({ audio, loading: false });
        },
        () => {
          this.patchState({ loading: false });
        },
      ),
    );
  });

  readonly audio$ = this.select(({ audio }) => audio);
  readonly loading$ = this.select(({ loading }) => loading);

  constructor(private audioService: AudioService) {
    super({ loading: false });
  }
}
