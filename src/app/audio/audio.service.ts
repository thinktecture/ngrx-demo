import { Injectable } from '@angular/core';
import { concat, EMPTY, Observable, of, throwError, timer } from 'rxjs';
import { switchMapTo } from 'rxjs/operators';
import { Audio } from './audio.model';

// Database Mock
let AUDIO_MOCK: Audio[] = [
  { id: 'audio-1', title: 'The First Song', author: 'TTYB' },
  { id: 'audio-2', title: 'Better Song', author: 'TT' },
  { id: 'audio-3', title: 'Great Song', author: 'The Songmakers' },
  { id: 'audio-4', title: 'Best Song', author: 'Jam' },
];

let AUDIO_FAVORITE_IDS: string[] = ['audio-3'];

// Online Simulation
const FAILURE_RATE = 0;
const DELAY = 0;

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

  addFavorite(audio: Audio): Observable<Audio> {
    AUDIO_FAVORITE_IDS = AUDIO_FAVORITE_IDS.filter(id => audio.id !== id).concat(audio.id);
    return this.fail(of({ ...audio }));
  }

  removeFavorite(audio: Audio): Observable<Audio> {
    AUDIO_FAVORITE_IDS = AUDIO_FAVORITE_IDS.filter(favId => favId !== audio.id);
    return this.fail(of({ ...audio }));
  }

  update(updated: Audio): Observable<Audio> {
    AUDIO_MOCK = AUDIO_MOCK.map(audio => {
      return audio.id === updated.id ? updated : audio;
    });
    return of(updated);
  }

  loadFavorites(): Observable<Audio[]> {
    const favorites = AUDIO_MOCK.filter(({ id }) => AUDIO_FAVORITE_IDS.includes(id));
    return of(favorites);
  }

  private fail<T>(source$: Observable<T>): Observable<T> {
    const delay$ = timer(DELAY).pipe(switchMapTo(EMPTY));
    const result$ =
      Math.random() < FAILURE_RATE ? throwError('Could not reach audio Service') : source$;
    return concat(delay$, result$);
  }
}
