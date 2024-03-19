import { TodoListItem } from '../todo.model';

interface TodoListState {
  id: string;
  title: string;
  items: TodoListItem[];
  loading: boolean;
  editing: string | undefined;
}

export const TodoListStore = {} as any;
