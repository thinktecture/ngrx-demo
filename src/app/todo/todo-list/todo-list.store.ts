import { computed, inject } from '@angular/core';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { firstValueFrom, switchMap } from 'rxjs';
import { TodoListItem } from '../todo.model';
import { TodoService } from '../todo.service';
import { tapResponse } from '@ngrx/operators';

export interface TodoListState {
  id: string;
  title: string;
  items: TodoListItem[];
  loading: boolean;
  editing: string | undefined;
}

const initialState: TodoListState = {
  id: '',
  title: '',
  items: [],
  loading: true,
  editing: undefined,
};

export const TodoListStore = signalStore(
  withState(initialState),
  withComputed(({ loading, editing }) => ({
    addDisabled: computed(() => loading() || editing() !== undefined),
  })),
  withMethods((store, todoService = inject(TodoService)) => ({
    editItem(id: string | undefined): void {
      patchState(store, { editing: id });
    },
    async addItem(): Promise<void> {
      patchState(store, { loading: true });
      const newItem = await firstValueFrom(todoService.addItem(store.id(), ''));
      const items = [...store.items(), newItem];
      patchState(store, { items, loading: false });
    },
    loadList: rxMethod<string>(id$ =>
      id$.pipe(
        switchMap(id => {
          patchState(store, { loading: true, editing: undefined });

          return todoService.getList(id).pipe(
            tapResponse({
              next: list => {
                patchState(store, { ...list });
              },
              error: () => {},
              finalize: () => patchState(store, { loading: false }),
            }),
          );
        }),
      ),
    ),
  })),
);
