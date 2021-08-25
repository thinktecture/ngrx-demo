import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Book } from '../book.model';
import { toggleFavorite } from '../state/book.actions';
import { BookListStore } from './book-list.store';

@Component({
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [BookListStore],
})
export class BookListComponent implements OnInit {
  readonly columns = ['favorite', 'title', 'author', 'actions'];

  readonly books$ = this.bookListStore.books$;

  constructor(private bookListStore: BookListStore, private store: Store) {}

  ngOnInit(): void {
    this.bookListStore.load();
  }

  toggleFavorite(book: Book): void {
    this.store.dispatch(toggleFavorite({ id: book.id }));
  }
}
