import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
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

  byId(id: string): Observable<Audio> {
    const foundAudio = AUDIO_MOCK.find(audio => audio.id === id);
    if (!foundAudio) {
      return throwError(`[AudioService] No audio for id ${id}`);
    }
    return of(foundAudio);
  }

  toggleFavorite(id: string): Observable<Audio> {
    const foundAudio = AUDIO_MOCK.find(audio => audio.id === id);
    if (!foundAudio) {
      return throwError(`[AudioService] Cannot toggle. No audio for id ${id}`);
    }
    return this.update({ ...foundAudio, isFavorite: !foundAudio.isFavorite });
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
