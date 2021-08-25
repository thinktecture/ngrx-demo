import { createReducer, on } from '@ngrx/store';
import { Book } from '../book.model';
import { loadBookFavoritesSuccess, updateBookSuccess } from './book.actions';

export interface BookState {
  books: Book[];
}

export const initialBookState: BookState = {
  books: [],
};

export const bookReducer = createReducer(
  initialBookState,
  on(loadBookFavoritesSuccess, (state, { favorites }) => {
    return { ...state, books: favorites };
  }),
  on(updateBookSuccess, (state, { book }) => {
    const books = state.books.filter(favorite => favorite.id !== book.id).concat(book);
    return { ...state, books };
  }),
);
