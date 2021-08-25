import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { Book } from '../book.model';
import { updateBook } from '../state/book.actions';
import { BookEditorStore } from './book-editor.store';

@Component({
  templateUrl: './book-editor.component.html',
  styleUrls: ['./book-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [BookEditorStore],
})
export class BookEditorComponent implements OnInit {
  readonly book$ = this.bookEditorStore.book$;
  readonly loading$ = this.bookEditorStore.loading$;

  constructor(
    private activatedRoute: ActivatedRoute,
    private bookEditorStore: BookEditorStore,
    private store: Store,
  ) {}

  ngOnInit(): void {
    const id$ = this.activatedRoute.params.pipe(map(params => `${params.id}`));
    this.bookEditorStore.load(id$);
  }

  save(book: Book): void {
    this.store.dispatch(updateBook({ book, redirect: ['book'] }));
  }
}
