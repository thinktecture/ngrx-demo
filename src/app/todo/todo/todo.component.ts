import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { RouterLink } from '@angular/router';
import { TodoService } from '../todo.service';

@Component({
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
  standalone: true,
  imports: [MatCardModule, MatListModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoComponent {
  private todoService = inject(TodoService);

  // TODO loading + error state, reload
  todoLists = toSignal(this.todoService.getListNames(), { initialValue: [] });
}
