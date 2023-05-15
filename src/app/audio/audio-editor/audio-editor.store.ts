import { inject, Injectable } from '@angular/core';
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
  private audioService = inject(AudioService);

  readonly load = this.effect((id$: Observable<string>) => {
    return id$.pipe(
      switchMap(id => {
        this.patchState({ loading: true });

        return this.audioService.byId(id);
      }),
      tapResponse({
        next: audio => {
          this.patchState({ audio, loading: false });
        },
        error: () => {
          this.patchState({ loading: false });
        },
      }),
    );
  });

  readonly audio = this.selectSignal(({ audio }) => audio);
  readonly loading = this.selectSignal(({ loading }) => loading);

  constructor() {
    super({ loading: false });
  }
}
