import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Book } from '../book.model';
import { BookService } from '../book.service';

export interface BookEditorState {
  book?: Book;
  loading: boolean;
}

@Injectable()
export class BookEditorStore extends ComponentStore<BookEditorState> {
  readonly load = this.effect((id$: Observable<string>) => {
    return id$.pipe(
      switchMap(id => {
        this.patchState({ loading: true });
        return this.bookService.byId(id);
      }),
      tapResponse(
        book => {
          this.patchState({ book, loading: false });
        },
        () => {
          this.patchState({ loading: false });
        },
      ),
    );
  });

  readonly book$ = this.select(({ book }) => book);
  readonly loading$ = this.select(({ loading }) => loading);

  constructor(private bookService: BookService) {
    super({ loading: false });
  }
}
