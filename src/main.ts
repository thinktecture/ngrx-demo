import { enableProdMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { AppComponent } from './app/app.component';
import { provideAudio } from './app/audio';
import { provideNotification } from './app/notification';
import appRoutes from './app/routes';
import { provideTodo } from './app/todo';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    provideAnimations(),
    // STORE
    provideStore(),
    provideStoreDevtools({ maxAge: 25, logOnly: environment.production, connectInZone: true }),
    // APP ROUTES
    provideRouter(appRoutes),
    // MODULES
    provideAudio(),
    provideTodo(),
    provideNotification(),
  ],
}).catch(err => console.error(err));
