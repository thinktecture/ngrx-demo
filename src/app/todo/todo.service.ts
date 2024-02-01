import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { TodoList, TodoListItem, TodoListName } from './todo.model';

export let LISTS: TodoListName[] = [
  { id: 'tl-1', title: 'First TODO List' },
  { id: 'tl-2', title: 'other List' },
];

type StoredListItem = TodoListItem & { listId: string };

export let ITEMS: StoredListItem[] = [
  { listId: 'tl-1', id: 'tl-1+1', content: 'Item 1 (L 1)', done: false },
  { listId: 'tl-1', id: 'tl-1+2', content: 'Item 2 (L 1)', done: true },
  { listId: 'tl-1', id: 'tl-1+3', content: 'Item 3 (L 1)', done: false },
  { listId: 'tl-2', id: 'tl-2+1', content: 'Item 1 (L 2)', done: true },
];

export function getItems(listId: string): TodoListItem[] {
  return ITEMS.filter(item => item.listId === listId).map(({ listId, ...item }) => item);
}

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  getListNames(): Observable<TodoListName[]> {
    return of(LISTS);
  }

  getList(id: string): Observable<TodoList> {
    const foundList = LISTS.find(list => list.id === id);
    if (foundList) {
      const items = getItems(id);
      return of({ ...foundList, items });
    }
    return throwError(() => `Cannot find list with id ${id}`);
  }

  addList(title: string): Observable<TodoListName> {
    const list: TodoListName = { id: `tl-${Date.now()}`, title };
    LISTS = [...LISTS, list];
    return of(list);
  }

  addItem(listId: string, content: string): Observable<TodoListItem> {
    const item: StoredListItem = { listId, id: `${listId}+${Date.now()}`, content, done: false };
    ITEMS = [...ITEMS, item];
    return of(item);
  }

  updateItem(listId: string, id: string, update: Partial<TodoListItem>): Observable<TodoListItem> {
    const foundItem = ITEMS.find(item => item.id === id);
    if (foundItem) {
      if (update.content === '') {
        return throwError(() => `Invalid content`);
      }
      const newItem = { ...foundItem, ...update, id };
      ITEMS = ITEMS.map(item => (item.id === id && item.listId === listId ? newItem : item));
      return of(newItem);
    }
    return throwError(() => `Cannot locate Item`);
  }
}
