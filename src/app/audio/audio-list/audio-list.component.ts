import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Favoritable } from 'src/app/favorites/favoritable.model';
import { Audio } from '../audio.model';
import { addAudioFavorite, removeAudioFavorite } from '../state/audio.actions';
import { AudioListStore } from './audio-list.store';

@Component({
  templateUrl: './audio-list.component.html',
  styleUrls: ['./audio-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [AudioListStore],
})
export class AudioListComponent implements OnInit {
  readonly columns = ['favorite', 'title', 'author'];

  readonly audioList$ = this.audioListStore.audioList$;

  constructor(private audioListStore: AudioListStore, private store: Store) {}

  ngOnInit(): void {
    this.audioListStore.load();
  }

  toggleFavorite(favoritableAudio: Audio & Favoritable): void {
    const { isFavorite, ...audio } = favoritableAudio;

    const action = isFavorite ? removeAudioFavorite : addAudioFavorite;

    this.store.dispatch(action({ audio }));
  }
}
