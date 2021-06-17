import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Audio } from './audio.model';

const AUDIO_MOCK: Audio[] = [
  { id: 'audio-1', title: 'The First Song', author: 'YB', isFavorite: true },
  { id: 'audio-2', title: 'Better Song', author: 'TT', isFavorite: false },
];

@Injectable({ providedIn: 'root' })
export class AudioService {
  load(): Observable<Audio[]> {
    return of(AUDIO_MOCK);
  }

  loadFavorites(): Observable<Audio[]> {
    return of(AUDIO_MOCK.filter(audio => audio.isFavorite));
  }
}
