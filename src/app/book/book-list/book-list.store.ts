import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { Book } from '../book.model';
import { BookService } from '../book.service';
import { selectBooks } from '../state/book.selectors';

export interface BookListState {
  books: Book[];
}

@Injectable()
export class BookListStore extends ComponentStore<BookListState> {
  readonly load = this.effect((load$: Observable<void>) =>
    load$.pipe(
      switchMap(() => this.bookService.load()),
      tap(books => {
        this.patchState({ books });
      }),
    ),
  );

  readonly books$ = this.select(this.state$, this.store.select(selectBooks), (state, books) => {
    const bookMap = new Map<string, Book>(books.map(book => [book.id, book]));
    return state.books.map(book => bookMap.get(book.id) ?? book);
  });

  constructor(private store: Store, private bookService: BookService) {
    super({ books: [] });
  }
}
