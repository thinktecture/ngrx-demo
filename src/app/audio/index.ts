import { ROUTES } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import routes from './routes';
import * as audioEffects from './state/audio.effects';
import { audioFeature } from './state/audio.reducer';

export const provideAudio = () => [
  provideState(audioFeature),
  provideEffects(audioEffects),
  { provide: ROUTES, useValue: routes, multi: true },
];
