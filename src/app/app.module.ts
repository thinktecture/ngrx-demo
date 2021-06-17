import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AudioModule } from './audio/audio.module';
import { AudioState } from './audio/state/audio.reducer';
import { AUDIO_STATE } from './audio/state/audio.selectors';

export interface AppState {
  [AUDIO_STATE]: AudioState;
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AudioModule,
    AppRoutingModule,
    StoreModule.forRoot({}),
    BrowserAnimationsModule,
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
