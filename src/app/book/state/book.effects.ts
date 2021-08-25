import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import { BookService } from '../book.service';
import {
  loadBookFavorites,
  loadBookFavoritesSuccess,
  toggleFavorite,
  updateBook,
  updateBookSuccess,
} from './book.actions';

@Injectable()
export class BookEffects implements OnInitEffects {
  readonly loadFavorites$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadBookFavorites),
      switchMap(() => this.bookService.loadFavorites()),
      map(favorites => loadBookFavoritesSuccess({ favorites })),
    ),
  );

  readonly updateBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateBook),
      switchMap(({ book, redirect }) => {
        return this.bookService.update(book).pipe(map(updated => ({ book: updated, redirect })));
      }),
      map(data => updateBookSuccess(data)),
    ),
  );

  readonly updateSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(updateBookSuccess),
        filter(({ redirect }) => !!redirect),
        tap(({ redirect }) => {
          this.router.navigate(redirect);
        }),
      ),
    { dispatch: false },
  );

  readonly toggleFavorite$ = createEffect(() =>
    this.actions$.pipe(
      ofType(toggleFavorite),
      switchMap(({ id }) => this.bookService.toggleFavorite(id)),
      map(book => updateBookSuccess({ book })),
    ),
  );

  constructor(
    private actions$: Actions,
    private bookService: BookService,
    private router: Router,
  ) {}

  ngrxOnInitEffects(): Action {
    return loadBookFavorites();
  }
}
