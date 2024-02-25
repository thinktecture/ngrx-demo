import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { AudioEditFormComponent } from '../audio-edit-form/audio-edit-form.component';
import { Audio } from '../audio.model';
import { AudioEditorStore } from './audio-editor.store';

@Component({
  templateUrl: './audio-editor.component.html',
  styleUrls: ['./audio-editor.component.scss'],
  providers: [AudioEditorStore],
  standalone: true,
  imports: [MatCardModule, AudioEditFormComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AudioEditorComponent implements OnInit {
  private activatedRoute = inject(ActivatedRoute);
  private audioEditorStore = inject(AudioEditorStore);

  readonly audio = this.audioEditorStore.audio;
  readonly loading = this.audioEditorStore.loading;

  ngOnInit(): void {
    const id$ = this.activatedRoute.paramMap.pipe(map(params => params.get('id') ?? ''));

    this.audioEditorStore.load(id$);
  }

  save(_: Audio): void {
    // this.store.dispatch(updateAudio({ audio, redirect: ['audio'] }));
  }
}
