import { Routes } from '@angular/router';
import { AudioEditorComponent } from './audio-editor/audio-editor.component';
import { AudioListComponent } from './audio-list/audio-list.component';

const routes: Routes = [
  {
    path: 'audio',
    children: [
      { path: '', component: AudioListComponent },
      { path: 'edit/:id', component: AudioEditorComponent },
    ],
  },
];

export default routes;
