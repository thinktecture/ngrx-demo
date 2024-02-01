import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map } from 'rxjs';
import { TodoListItem } from '../todo.model';
import { TodoListStore } from './todo-list.store';

@Component({
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  providers: [TodoListStore],
  standalone: true,
  imports: [MatTableModule, MatIconModule, MatButtonModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoListComponent {
  private todoListStore = inject(TodoListStore);
  private route = inject(ActivatedRoute);

  readonly columns = ['done', 'content'];

  title = this.todoListStore.title;
  items = this.todoListStore.entities;
  editing = this.todoListStore.editing;
  addDisabled = this.todoListStore.addDisabled;

  ngOnInit(): void {
    const id$ = this.route.paramMap.pipe(map(params => params.get('id') ?? ''));
    this.todoListStore.loadList(id$);
  }

  addEmpty(): void {
    this.todoListStore.addItem();
  }

  setDone(item: TodoListItem, done: boolean): void {
    this.updateItem(item, { done });
  }

  setContent(item: TodoListItem, content: string): void {
    this.updateItem(item, { content });
  }

  private updateItem(item: TodoListItem, update: Partial<TodoListItem>): void {
    this.todoListStore.updateItem(item.id, update);
  }

  edit(id?: string): void {
    this.todoListStore.editItem(id);
  }

  cancelEdit(): void {
    this.todoListStore.editItem(undefined);
  }
}
