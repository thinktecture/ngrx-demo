import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AudioRoutingModule {}
