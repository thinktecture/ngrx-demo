import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Observable } from 'rxjs';
import { concatMap, switchMap, withLatestFrom } from 'rxjs/operators';
import { TodoList, TodoListItem } from '../todo.model';
import { TodoService } from '../todo.service';

interface TodoListState {
  id: string;
  title: string;
  items: TodoListItem[];
  loading: boolean;

  editing?: string;
}

const initialState: TodoListState = { id: '', title: '', items: [], loading: true };

@Injectable()
export class TodoListStore extends ComponentStore<TodoListState> {
  // Default Selectors
  readonly id$ = this.select(({ id }) => id);
  readonly title$ = this.select(({ title }) => title);
  readonly items$ = this.select(({ items }) => items);
  readonly loading$ = this.select(({ loading }) => loading);
  readonly editing$ = this.select(({ editing }) => editing);

  // View Selectors
  readonly addDisabled$ = this.select(
    this.items$,
    this.loading$,
    this.editing$,
    (items, loading, editing) => {
      return loading || editing || (items.length > 0 && items[items.length - 1].content === '');
    },
  );

  // Updaters
  private readonly setList = this.updater((state, list: TodoList) => {
    return { ...state, ...list, loading: false, editing: undefined };
  });

  private readonly addOne = this.updater((state, item: TodoListItem) => {
    const items = state.items.concat(item);
    return { ...state, items, editing: item.id, loading: false };
  });

  private readonly replaceItem = this.updater((state, updated: TodoListItem) => {
    const items = state.items.map(item => (item.id === updated.id ? updated : item));
    return { ...state, items, loading: false };
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
      withLatestFrom(this.state$),
      concatMap(([_, state]) => {
        this.patchState({ loading: true });

        return this.todoService.addItem(state.id, '').pipe(
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
        withLatestFrom(this.state$),
        concatMap(([{ id, update }, state]) => {
          this.patchState({ editing: undefined, loading: true });

          return this.todoService.updateItem(state.id, id, update).pipe(
            tapResponse(
              updated => {
                this.replaceItem(updated);
              },
              () => this.patchState({ loading: false }),
            ),
          );
        }),
      ),
  );

  constructor(private todoService: TodoService) {
    super(initialState);
  }
}
