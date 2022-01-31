export interface TodoList {
  id: string;
  title: string;
  items: TodoListItem[];
}

export interface TodoListItem {
  id: string;
  content: string;
  done: boolean;
}

export type TodoListName = Omit<TodoList, 'items'>;
