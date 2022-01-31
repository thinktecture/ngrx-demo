import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { TodoList, TodoListItem, TodoListName } from './todo.model';

let LISTS: TodoListName[] = [
  { id: 'tl-1', title: 'First TODO List' },
  { id: 'tl-2', title: 'other List' },
];

const ITEMS: { [id: string]: TodoListItem[] } = {
  'tl-1': [
    { id: 'tl-1+1', content: 'Item 1 (L 1)', done: false },
    { id: 'tl-1+2', content: 'Item 2 (L 1)', done: true },
    { id: 'tl-1+3', content: 'Item 3 (L 1)', done: false },
  ],
  'tl-2': [{ id: 'tl-1+2', content: 'Item 1 (L 2)', done: true }],
};

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  getListNames(): Observable<TodoListName[]> {
    return of(LISTS);
  }

  getList(id: string): Observable<TodoList> {
    const items = ITEMS[id] ?? [];
    const foundList = LISTS.find(list => list.id === id);
    if (foundList) {
      return of({ ...foundList, items });
    }
    return throwError(`Cannot find list with id ${id}`);
  }

  addList(title: string): Observable<TodoListName> {
    const list: TodoListName = { id: `tl-${Date.now()}`, title };
    LISTS = LISTS.concat(list);
    return of(list);
  }

  addItem(listId: string, content: string): Observable<TodoListItem> {
    const item: TodoListItem = { id: `${listId}+${Date.now()}`, content, done: false };
    const items = (ITEMS[listId] ?? []).concat(item);
    ITEMS[listId] = items;
    return of(item);
  }

  updateItem(listId: string, id: string, update: Partial<TodoListItem>): Observable<TodoListItem> {
    const items = ITEMS[listId] ?? [];
    const foundItem = items.find(item => item.id === id);
    if (foundItem) {
      if (update.content === '') {
        return throwError(`Invalid content`);
      }
      const newItem = { ...foundItem, ...update, id };
      ITEMS[listId] = items.filter(item => item.id !== id).concat(newItem);
      return of(newItem);
    }
    return throwError(`Cannot locate Item`);
  }
}
