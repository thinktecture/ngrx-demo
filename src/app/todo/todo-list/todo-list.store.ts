import { computed, inject } from '@angular/core';
import {
  PartialStateUpdater,
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { firstValueFrom } from 'rxjs';
import { TodoListItem } from '../todo.model';
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
  withState(initialState),
  withComputed(({ loading, editing }) => ({
    addDisabled: computed(() => loading() || !!editing()),
  })),
  withMethods((store, todoService = inject(TodoService)) => {
    function loadingStart(): void {
      patchState(store, { loading: true });
    }

    const loading = (loading: boolean) => ({ loading });

    function addItem(item: TodoListItem): PartialStateUpdater<TodoListState> {
      return state => {
        const items = [...state.items, item];
        return { items };
      };
    }

    return {
      editItem(id?: string): void {
        patchState(store, { editing: id });
      },

      async addItem(): Promise<void> {
        loadingStart();
        const item = await firstValueFrom(todoService.addItem(store.id(), ''));
        patchState(store, addItem(item), loading(false));
      },

      async updateItem(id: string, update: Partial<TodoListItem>): Promise<void> {
        loadingStart();
        const updated = await firstValueFrom(todoService.updateItem(store.id(), id, update));
        const items = store.items().map(item => (item.id === id ? updated : item));
        patchState(store, { items, loading: false });
      },
    };
  }),
);
