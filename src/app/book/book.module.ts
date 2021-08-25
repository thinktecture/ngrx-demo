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
import { BookEditFormComponent } from './book-edit-form/book-edit-form.component';
import { BookEditorComponent } from './book-editor/book-editor.component';
import { BookListComponent } from './book-list/book-list.component';
import { BookRoutingModule } from './book-routing.module';
import { BookEffects } from './state/book.effects';
import { bookReducer } from './state/book.reducer';
import { BOOK_STATE } from './state/book.selectors';

@NgModule({
  declarations: [BookListComponent, BookEditorComponent, BookEditFormComponent],
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
    BookRoutingModule,
    StoreModule.forFeature(BOOK_STATE, bookReducer),
    EffectsModule.forFeature([BookEffects]),
  ],
})
export class BookModule {}
