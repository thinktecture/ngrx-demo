import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FavoriteItem } from '../../favorites/favorite-list/favorite-item.model';
import { toggleFavorite } from './book.actions';
import { BookState } from './book.reducer';

export const BOOK_STATE = 'book';

export const selectBook = createFeatureSelector<BookState>(BOOK_STATE);

export const selectBooks = createSelector(selectBook, ({ books }) => books);

export const selectBookFavorites = createSelector(selectBooks, books =>
  books.filter(({ isFavorite }) => isFavorite),
);

export const selectBookFavoriteItems = createSelector(selectBookFavorites, favorites => {
  const items: FavoriteItem[] = favorites.map(favorite => ({
    id: favorite.id,
    caption: `${favorite.title}`,
    subCaption: `by ${favorite.author}`,
    toggleAction: toggleFavorite({ id: favorite.id }),
  }));
  return items;
});
