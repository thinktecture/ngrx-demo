import { computed, inject } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { firstValueFrom, Observable, switchMap } from 'rxjs';
import { TodoList, TodoListItem } from '../todo.model';
import { TodoService } from '../todo.service';

interface TodoListState {
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
  loading: false,
  editing: undefined,
};

export const TodoListStore = signalStore(
  { protectedState: false },
  withState(initialState),

  withComputed(({ editing, loading, items }) => ({
    addDisabled: computed(() => loading() || editing() || items().at(-1)?.content === ''),
  })),

  withMethods((store, todoService = inject(TodoService)) => {
    const loading = (loading: boolean) => ({ loading });

    function loadingStart(): void {
      patchState(store, loading(true));
    }

    function loadingDone(): void {
      patchState(store, loading(false));
    }

    function setList({ items, ...list }: TodoList): void {
      patchState(store, { ...initialState, ...list, items });
    }

    return {
      editItem(id: string | undefined): void {
        patchState(store, { editing: id });
      },

      async addItem(): Promise<void> {
        loadingStart();
        const item = await firstValueFrom(todoService.addItem(store.id(), ''));
        patchState(store, { items: [...store.items(), item], editing: item.id }, loading(false));
      },

      async updateItem(id: string, update: Partial<TodoListItem>): Promise<void> {
        loadingStart();
        const updated = await firstValueFrom(todoService.updateItem(store.id(), id, update));
        const items = store.items().map(item => (item.id === id ? updated : item));
        patchState(store, { items, editing: undefined }, loading(false));
      },

      loadList: rxMethod((id$: Observable<string>) =>
        id$.pipe(
          switchMap(id => {
            loadingStart();
            return todoService.getList(id).pipe(tapResponse(setList, loadingDone));
          }),
        ),
      ),
    };
  }),
);
