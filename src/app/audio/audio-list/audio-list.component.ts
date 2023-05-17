import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { Favoritable } from 'src/app/favorites/favoritable.model';
import { Audio } from '../audio.model';
import { addAudioFavorite, removeAudioFavorite } from '../state/audio.actions';
import { AudioListStore } from './audio-list.store';

@Component({
  templateUrl: './audio-list.component.html',
  styleUrls: ['./audio-list.component.scss'],
  providers: [AudioListStore],
  standalone: true,
  imports: [MatTableModule, MatButtonModule, MatIconModule, RouterModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AudioListComponent implements OnInit {
  private audioListStore = inject(AudioListStore);
  private store = inject(Store);

  readonly columns = ['favorite', 'title', 'author', 'actions'];

  readonly audioList = this.audioListStore.audioList;

  ngOnInit(): void {
    this.audioListStore.load();
  }

  toggleFavorite(favoritableAudio: Audio & Favoritable): void {
    const { isFavorite, ...audio } = favoritableAudio;

    const action = isFavorite ? removeAudioFavorite : addAudioFavorite;

    this.store.dispatch(action({ audio }));
  }
}
