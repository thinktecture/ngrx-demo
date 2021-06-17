import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Audio } from './audio.model';

let AUDIO_MOCK: Audio[] = [
  { id: 'audio-1', title: 'The First Song', author: 'YB', isFavorite: true },
  { id: 'audio-2', title: 'Better Song', author: 'TT', isFavorite: false },
];

@Injectable({ providedIn: 'root' })
export class AudioService {
  load(): Observable<Audio[]> {
    return of(AUDIO_MOCK);
  }

  update(updated: Audio): Observable<Audio> {
    AUDIO_MOCK = AUDIO_MOCK.map(audio => {
      return audio.id === updated.id ? updated : audio;
    });
    return of(updated);
  }

  loadFavorites(): Observable<Audio[]> {
    return of(AUDIO_MOCK.filter(audio => audio.isFavorite));
  }
}
