import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { Audio } from '../audio.model';
import { AudioEditorStore } from './audio-editor.store';

@Component({
  templateUrl: './audio-editor.component.html',
  styleUrls: ['./audio-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [AudioEditorStore],
})
export class AudioEditorComponent implements OnInit {
  readonly audio$ = this.audioEditorStore.audio$;
  readonly loading$ = this.audioEditorStore.loading$;

  constructor(
    private activatedRoute: ActivatedRoute,
    private audioEditorStore: AudioEditorStore,
    private store: Store,
  ) {}

  ngOnInit(): void {
    const id$ = this.activatedRoute.params.pipe(map(params => `${params.id}`));
    this.audioEditorStore.load(id$);
  }

  save(audio: Audio): void {
    // this.store.dispatch(updateAudio({ audio, redirect: ['audio'] }));
  }
}
