import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookEditorComponent } from './book-editor/book-editor.component';
import { BookListComponent } from './book-list/book-list.component';

const routes: Routes = [
  {
    path: 'book',
    children: [
      { path: '', component: BookListComponent },
      { path: 'edit/:id', component: BookEditorComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookRoutingModule {}
