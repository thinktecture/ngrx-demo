import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Audio } from '../audio.model';
import { toggleFavorite } from '../state/audio.actions';
import { AudioListStore } from './audio-list.store';

@Component({
  templateUrl: './audio-list.component.html',
  styleUrls: ['./audio-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [AudioListStore],
})
export class AudioListComponent implements OnInit {
  readonly columns = ['favorite', 'title', 'writer', 'actions'];

  readonly audios$ = this.audioListStore.audios$;

  constructor(private audioListStore: AudioListStore, private store: Store) {}

  ngOnInit(): void {
    this.audioListStore.load();
  }

  toggleFavorite(audio: Audio): void {
    this.store.dispatch(toggleFavorite({ id: audio.id }));
  }
}
