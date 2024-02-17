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

const lists = { entity: type<TodoListName>(), collection: 'lists' } as const;
const items = { entity: type<TodoListItem & { listId: string }>(), collection: 'items' } as const;

export const TodoService = signalStore(
  { providedIn: 'root' },

  withState({}),

  withEntities(lists),
  withEntities(items),

  withMethods(store => ({
    getListNames(): Observable<TodoListName[]> {
      return of(store.listsEntities());
    },

    getList(id: string): Observable<TodoList> {
      const list = store.listsEntityMap()[id];

      if (list) {
        const items = store.itemsEntities().filter(item => item.listId === id);
        return of({ ...list, items });
      }

      return throwError(() => `Cannot find list with id ${id}`);
    },

    addList(title: string): Observable<TodoListName> {
      const list: TodoListName = { id: `tl-${Date.now()}`, title };
      patchState(store, addEntity(list, lists));
      return of(list);
    },

    addItem(listId: string, content: string): Observable<TodoListItem> {
      const item: TodoListItem = { id: `${listId}+${Date.now()}`, content, done: false };
      patchState(store, addEntity({ ...item, listId }, items));
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
      if (!store.listsEntityMap()[listId] || !store.itemsEntityMap()[id]) {
        return throwError(() => `Cannot locate Item`);
      }
      patchState(store, updateEntity({ id, changes }, items));
      return of(store.itemsEntityMap()[id]);
    },
  })),

  withHooks({
    onInit: store => {
      patchState(store, setAllEntities(LISTS, lists), setAllEntities(ITEMS, items));
    },
  }),
);
