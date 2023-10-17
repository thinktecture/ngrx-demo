import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map } from 'rxjs';
import { TodoListItem } from '../todo.model';

@Component({
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  standalone: true,
  imports: [MatTableModule, MatIconModule, MatButtonModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoListComponent {
  private route = inject(ActivatedRoute);

  readonly columns = ['done', 'content'];

  title = 'Title';
  items: TodoListItem[] = [];
  editing?: string;
  addDisabled = true;

  ngOnInit(): void {
    const id$ = this.route.paramMap.pipe(map(params => params.get('id') ?? ''));

    // TODO implement me
  }

  addEmpty(): void {
    // TODO implement me
  }

  setDone(item: TodoListItem, done: boolean): void {
    this.updateItem(item, { done });
  }

  setContent(item: TodoListItem, content: string): void {
    this.updateItem(item, { content });
  }

  private updateItem(item: TodoListItem, update: Partial<TodoListItem>): void {
    // TODO implement me
  }

  edit(_id?: string): void {
    // TODO implement me
  }

  cancelEdit(): void {
    // TODO implement me
  }
}
