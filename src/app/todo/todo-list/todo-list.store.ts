import { inject, Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { Observable } from 'rxjs';
import { concatMap, switchMap } from 'rxjs/operators';
import { TodoList, TodoListItem } from '../todo.model';
import { TodoService } from '../todo.service';

interface TodoListState extends EntityState<TodoListItem> {
  id: string;
  title: string;
  loading: boolean;

  editing?: string;
}

const todolist = createEntityAdapter<TodoListItem>();
const initialState: TodoListState = todolist.getInitialState({ id: '', title: '', loading: true });
const { selectAll } = todolist.getSelectors();

@Injectable()
export class TodoListStore extends ComponentStore<TodoListState> {
  private readonly todoService = inject(TodoService);

  // Default Selectors
  readonly id = this.selectSignal(({ id }) => id);
  readonly title = this.selectSignal(({ title }) => title);
  readonly items = this.selectSignal(selectAll);
  readonly loading = this.selectSignal(({ loading }) => loading);
  readonly editing = this.selectSignal(({ editing }) => editing);

  // View Selectors
  readonly addDisabled$ = this.selectSignal(
    this.items,
    this.loading,
    this.editing,
    (items, loading, editing) => {
      return loading || editing || (items.length > 0 && items[items.length - 1].content === '');
    },
  );

  // Updaters
  private readonly setList = this.updater((state, { items, ...list }: TodoList) => {
    return todolist.setAll(items, { ...state, ...initialState, ...list, loading: false });
  });

  private readonly addOne = this.updater((state, item: TodoListItem) => {
    return todolist.addOne(item, { ...state, editing: item.id, loading: false });
  });

  private readonly replaceItem = this.updater((state, updated: TodoListItem) => {
    return todolist.setOne(updated, { ...state, loading: false });
  });

  readonly editItem = this.updater((state, id: string | undefined) => {
    return { ...state, editing: id };
  });

  // Effects
  readonly loadList = this.effect((id$: Observable<string>) =>
    id$.pipe(
      switchMap(id => {
        this.patchState({ loading: true });

        return this.todoService.getList(id).pipe(
          tapResponse(
            list => this.setList(list),
            () => this.patchState({ loading: false }),
          ),
        );
      }),
    ),
  );

  readonly addItem = this.effect(add$ =>
    add$.pipe(
      concatMap(() => {
        this.patchState({ loading: true });

        return this.todoService.addItem(this.id(), '').pipe(
          tapResponse(
            item => this.addOne(item),
            () => this.patchState({ loading: false }),
          ),
        );
      }),
    ),
  );

  readonly updateItem = this.effect(
    (item$: Observable<{ id: string; update: Partial<TodoListItem> }>) =>
      item$.pipe(
        concatMap(({ id, update }) => {
          this.patchState({ editing: undefined, loading: true });

          return this.todoService.updateItem(this.id(), id, update).pipe(
            tapResponse({
              next: updated => {
                this.replaceItem(updated);
              },
              error: () => this.patchState({ loading: false }),
            }),
          );
        }),
      ),
  );

  constructor() {
    super(initialState);
  }
}
