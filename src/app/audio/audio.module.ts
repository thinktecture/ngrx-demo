import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AudioEffects } from './state/audio.effects';
import { audioReducer } from './state/audio.reducer';
import { AUDIO_STATE } from './state/audio.selectors';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(AUDIO_STATE, audioReducer),
    EffectsModule.forFeature([AudioEffects]),
  ],
})
export class AudioModule {}
