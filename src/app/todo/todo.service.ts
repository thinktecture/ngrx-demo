import { patchState, signalStore, type, withHooks, withMethods, withState } from '@ngrx/signals';
import { addEntity, setAllEntities, updateEntity, withEntities } from '@ngrx/signals/entities';
import { Observable, of, throwError } from 'rxjs';
import { TodoList, TodoListItem, TodoListName } from './todo.model';

export const LISTS: TodoListName[] = [
  { id: 'tl-1', title: 'First TODO List' },
  { id: 'tl-2', title: 'other List' },
];

type StoredListItem = TodoListItem & { listId: string };

export const ITEMS: StoredListItem[] = [
  { listId: 'tl-1', id: 'tl-1+1', content: 'Item 1 (L 1)', done: false },
  { listId: 'tl-1', id: 'tl-1+2', content: 'Item 2 (L 1)', done: true },
  { listId: 'tl-1', id: 'tl-1+3', content: 'Item 3 (L 1)', done: false },
  { listId: 'tl-2', id: 'tl-2+1', content: 'Item 1 (L 2)', done: true },
];

export function getItems(listId: string): TodoListItem[] {
  return ITEMS.filter(item => item.listId === listId).map(({ listId, ...item }) => item);
}

export const TodoService = signalStore(
  { providedIn: 'root' },

  withState({
    lists: LISTS,
    items: ITEMS,
  }),

  withMethods(store => ({
    getListNames(): Observable<TodoListName[]> {
      return of(store.lists());
    },

    getList(id: string): Observable<TodoList> {
      const list = store.lists().find(list => list.id === id);

      if (list) {
        const items = store.items().filter(({ listId }) => listId === id);
        return of({ ...list, items });
      }

      return throwError(() => `Cannot find list with id ${id}`);
    },

    addList(title: string): Observable<TodoListName> {
      const list: TodoListName = { id: `tl-${Date.now()}`, title };
      patchState(store, { lists: [...store.lists(), list] });
      return of(list);
    },

    addItem(listId: string, content: string): Observable<TodoListItem> {
      const item: TodoListItem = { id: `${listId}+${Date.now()}`, content, done: false };
      patchState(store, { items: [...store.items(), { ...item, listId }] });
      return of(item);
    },

    updateItem(
      listId: string,
      id: string,
      changes: Partial<TodoListItem>,
    ): Observable<TodoListItem> {
      if (changes.content === '') {
        return throwError(() => `Invalid content`);
      }

      const list = store.lists().find(list => list.id === listId);
      const item = store.items().find(item => item.id === id && item.listId === listId);
      if (!list || !item) {
        return throwError(() => `Cannot locate Item`);
      }

      const updatedItem = { ...item, ...changes };
      const items = store.items().map(item => (item.id === id ? updatedItem : item));
      patchState(store, { items });
      return of(updatedItem);
    },
  })),
);
