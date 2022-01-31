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
    (items, editing, loading) => {
      return loading || editing || (items.length > 0 && items[items.length - 1].content === '');
    },
  );

  // Updaters
  private readonly setList = this.updater((state, list: TodoList) => {
    return { ...state, ...list, loading: false, editing: undefined };
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
            item => {
              const items = state.items.concat(item);
              this.patchState({ items, editing: item.id, loading: false });
            },
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
                const items = state.items.map(item => (item.id === id ? updated : item));
                this.patchState({ items, loading: false });
              },
              () => this.patchState({ loading: false }),
            ),
          );
        }),
      ),
  );

  constructor(private todoService: TodoService) {
    super({ id: '', title: '', items: [], loading: true });
  }
}
