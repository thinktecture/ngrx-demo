import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Audio } from '../audio.model';
import { updateAudio } from '../state/audio.actions';
import { AudioListStore } from './audio-list.store';

@Component({
  templateUrl: './audio-list.component.html',
  styleUrls: ['./audio-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [AudioListStore],
})
export class AudioListComponent implements OnInit {
  readonly audios$ = this.audioListStore.audios$;

  constructor(private audioListStore: AudioListStore, private store: Store) {}

  ngOnInit(): void {
    this.audioListStore.load();
  }

  updateAudio(audio: Audio): void {
    this.store.dispatch(updateAudio({ audio }));
  }

  updateAudioAuthor(audio: Audio, author: string): void {
    this.store.dispatch(updateAudio({ audio: { ...audio, author } }));
  }

  updateAudioTitle(audio: Audio, title: string): void {
    this.store.dispatch(updateAudio({ audio: { ...audio, title } }));
  }

  updateAudioFavorite(audio: Audio, isFavorite: boolean): void {
    this.store.dispatch(updateAudio({ audio: { ...audio, isFavorite } }));
  }

  toggleFavorite(audio: Audio): void {
    const updated = { ...audio, isFavorite: !audio.isFavorite };
    this.store.dispatch(updateAudio({ audio: updated }));
  }
}
