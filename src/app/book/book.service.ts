import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { Book } from './book.model';

let BOOK_MOCK: Book[] = [
  { id: 'book-1', title: 'First Book', author: 'DNA', isFavorite: false },
  { id: 'book-2', title: 'Another Book', author: 'FN', isFavorite: true },
];

@Injectable({ providedIn: 'root' })
export class BookService {
  load(): Observable<Book[]> {
    return of(BOOK_MOCK);
  }

  byId(id: string): Observable<Book> {
    const foundBook = BOOK_MOCK.find(book => book.id === id);
    if (!foundBook) {
      return throwError(`[BookService] No book for id ${id}`);
    }
    return of(foundBook);
  }

  toggleFavorite(id: string): Observable<Book> {
    const foundBook = BOOK_MOCK.find(book => book.id === id);
    if (!foundBook) {
      return throwError(`[BookService] Cannot toggle. No book for id ${id}`);
    }
    return this.update({ ...foundBook, isFavorite: !foundBook.isFavorite });
  }

  update(updated: Book): Observable<Book> {
    BOOK_MOCK = BOOK_MOCK.map(book => {
      return book.id === updated.id ? updated : book;
    });
    return of(updated);
  }

  loadFavorites(): Observable<Book[]> {
    return of(BOOK_MOCK.filter(book => book.isFavorite));
  }
}
