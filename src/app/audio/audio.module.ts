import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AudioEditFormComponent } from './audio-edit-form/audio-edit-form.component';
import { AudioEditorComponent } from './audio-editor/audio-editor.component';
import { AudioListComponent } from './audio-list/audio-list.component';
import { AudioRoutingModule } from './audio-routing.module';
import { AudioEffects } from './state/audio.effects';
import { audioReducer } from './state/audio.reducer';
import { AUDIO_STATE } from './state/audio.selectors';

@NgModule({
  declarations: [AudioListComponent, AudioEditorComponent, AudioEditFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatTableModule,
    MatButtonModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    AudioRoutingModule,
    StoreModule.forFeature(AUDIO_STATE, audioReducer),
    EffectsModule.forFeature([AudioEffects]),
  ],
})
export class AudioModule {}
