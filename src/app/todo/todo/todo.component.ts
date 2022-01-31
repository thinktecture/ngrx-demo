import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TodoService } from '../todo.service';

@Component({
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoComponent {
  // todo adding list feeding and scanning a subject?
  todoLists$ = this.todoService.getListNames();

  constructor(private todoService: TodoService) {}
}
