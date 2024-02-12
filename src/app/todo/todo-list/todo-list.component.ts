import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map } from 'rxjs';
import { TodoListItem } from '../todo.model';
import { TodoListStore } from './todo-list.store';

@Component({
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  imports: [MatButtonModule, MatButtonToggleModule, MatIconModule, MatTableModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoListComponent extends TodoListStore {
  private route = inject(ActivatedRoute);

  readonly columns = ['done', 'content'];

  ngOnInit(): void {
    const id$ = this.route.paramMap.pipe(map(params => params.get('id') ?? ''));
    this.loadList(id$);
  }

  addEmpty(): void {
    this.addItem();
  }

  setDone(item: TodoListItem, done: boolean): void {
    this.updateItem(item.id, { done });
  }

  setContent(item: TodoListItem, content: string): void {
    this.updateItem(item.id, { content });
  }

  edit(id?: string): void {
    this.editItem(id);
  }

  cancelEdit(): void {
    this.editItem(undefined);
  }
}
