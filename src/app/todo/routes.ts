import { Routes } from '@angular/router';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoComponent } from './todo/todo.component';

const routes: Routes = [
  {
    path: 'todo',
    children: [
      { path: '', component: TodoComponent },
      { path: ':id', component: TodoListComponent },
    ],
  },
];

export default routes;
