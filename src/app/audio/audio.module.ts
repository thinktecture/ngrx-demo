import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AudioListComponent } from './audio-list/audio-list.component';
import { AudioRoutingModule } from './audio-routing.module';
import { AudioEffects } from './state/audio.effects';
import { audioReducer } from './state/audio.reducer';
import { AUDIO_STATE } from './state/audio.selectors';

@NgModule({
  declarations: [AudioListComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    AudioRoutingModule,
    StoreModule.forFeature(AUDIO_STATE, audioReducer),
    EffectsModule.forFeature([AudioEffects]),
  ],
})
export class AudioModule {}
