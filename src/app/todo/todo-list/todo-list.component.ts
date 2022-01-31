import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { TodoListItem } from '../todo.model';
import { TodoListStore } from './todo-list.store';

@Component({
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [TodoListStore],
})
export class TodoListComponent {
  readonly columns = ['done', 'content'];

  readonly title$ = this.todoListStore.title$;
  readonly items$ = this.todoListStore.items$;
  readonly editing$ = this.todoListStore.editing$;

  readonly addDisabled$ = this.todoListStore.addDisabled$;

  constructor(private route: ActivatedRoute, private todoListStore: TodoListStore) {}

  ngOnInit(): void {
    const id$ = this.route.paramMap.pipe(map(params => params.get('id') ?? ''));

    this.todoListStore.loadList(id$);
  }

  addEmpty(): void {
    this.todoListStore.addItem();
  }

  setDone(item: TodoListItem, done: boolean): void {
    this.todoListStore.updateItem({ id: item.id, update: { done } });
  }

  setContent(item: TodoListItem, content: string): void {
    this.todoListStore.updateItem({ id: item.id, update: { content } });
  }

  edit(id?: string): void {
    this.todoListStore.editItem(id);
  }

  cancelEdit(): void {
    this.todoListStore.editItem(undefined);
  }
}
