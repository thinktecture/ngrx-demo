import { computed, inject } from '@angular/core';
import { tapResponse } from '@ngrx/component-store';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { addEntity, setAllEntities, setEntity, withEntities } from '@ngrx/signals/entities';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { firstValueFrom, Observable, switchMap } from 'rxjs';
import { TodoList, TodoListItem } from '../todo.model';
import { TodoService } from '../todo.service';

interface TodoListState {
  id: string;
  title: string;
  loading: boolean;
  editing: string | undefined;
}

const initialState: TodoListState = {
  id: '',
  title: '',
  loading: false,
  editing: undefined,
};

export const TodoListStore = signalStore(
  withState(initialState),
  withEntities<TodoListItem>(),

  withComputed(({ editing, loading, entities }) => ({
    addDisabled: computed(() => loading() || editing() || entities().at(-1)?.content === ''),
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
      patchState(store, { ...initialState, ...list }, setAllEntities(items));
    }

    return {
      editItem(id: string | undefined): void {
        patchState(store, { editing: id });
      },

      async addItem(): Promise<void> {
        loadingStart();
        const item = await firstValueFrom(todoService.addItem(store.id(), ''));
        patchState(store, addEntity(item), { editing: item.id }, loading(false));
      },

      async updateItem(id: string, update: Partial<TodoListItem>): Promise<void> {
        loadingStart();
        const updated = await firstValueFrom(todoService.updateItem(store.id(), id, update));
        patchState(store, setEntity(updated), { editing: undefined }, loading(false));
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
