import { createAction, props } from '@ngrx/store';
import { Book } from '../book.model';

export const loadBookFavorites = createAction('[Book/API] Load Favorites');
export const loadBookFavoritesSuccess = createAction(
  '[Book] Load Favorites Success',
  props<{ favorites: Book[] }>(),
);

export const updateBook = createAction(
  '[Book/API] Update',
  props<{ book: Book; redirect?: any }>(),
);
export const updateBookSuccess = createAction(
  '[Book] Update Success',
  props<{ book: Book; redirect?: any }>(),
);

export const toggleFavorite = createAction('[Book/API] Toggle Favorite', props<{ id: string }>());
