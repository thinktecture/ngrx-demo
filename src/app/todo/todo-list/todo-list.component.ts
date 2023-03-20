import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EMPTY, Subject } from 'rxjs';
import { catchError, finalize, map, switchMap, takeUntil } from 'rxjs/operators';
import { TodoListItem } from '../todo.model';
import { TodoService } from '../todo.service';

@Component({
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoListComponent {
  readonly columns = ['done', 'content'];

  id = '';
  title = '';
  items: TodoListItem[] = [];

  loading = false;
  editing?: string;

  addDisabled = true;

  private destroy$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private todoService: TodoService,
    private changeDetectorRef: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        map(params => params.get('id') ?? ''),
        switchMap(id => {
          this.loading = true;
          this.changeDetectorRef.markForCheck();

          return this.todoService.getList(id);
        }),
        catchError(() => {
          this.loading = false;
          this.changeDetectorRef.markForCheck();

          return EMPTY;
        }),
        takeUntil(this.destroy$),
      )
      .subscribe(({ id, title, items }) => {
        this.id = id;
        this.title = title;
        this.items = items;
        this.editing = undefined;
        this.loading = false;

        this.changeDetectorRef.markForCheck();
      });
  }

  addEmpty(): void {
    if (this.loading) {
      return;
    }

    this.loading = true;

    this.todoService
      .addItem(this.id, '')
      .pipe(
        finalize(() => {
          this.loading = false;
          this.changeDetectorRef.markForCheck();
        }),
        takeUntil(this.destroy$),
      )
      .subscribe(item => {
        this.items = [...this.items, item];
      });
  }

  setDone(item: TodoListItem, done: boolean): void {
    this.updateItem(item, { done });
  }

  setContent(item: TodoListItem, content: string): void {
    this.updateItem(item, { content });
  }

  private updateItem(item: TodoListItem, update: Partial<TodoListItem>): void {
    if (this.loading) {
      return;
    }

    this.loading = true;

    this.todoService
      .updateItem(this.id, item.id, update)
      .pipe(
        finalize(() => {
          this.loading = false;
          this.editing = undefined;
          this.changeDetectorRef.markForCheck();
        }),
        takeUntil(this.destroy$),
      )
      .subscribe(updated => {
        this.items = this.items.map(item => (item.id === updated.id ? updated : item));
      });
  }

  edit(id?: string): void {
    this.editing = id;
  }

  cancelEdit(): void {
    this.editing = undefined;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }
}
