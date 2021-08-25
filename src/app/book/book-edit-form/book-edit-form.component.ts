import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Book } from '../book.model';

@Component({
  selector: 'app-book-edit-form',
  templateUrl: './book-edit-form.component.html',
  styleUrls: ['./book-edit-form.component.scss'],
})
export class BookEditFormComponent implements OnChanges {
  @Input() data?: Book | null;
  @Input() loading: boolean | null = false;

  @Output() dataSubmit = new EventEmitter<Book>();

  readonly form = this.formBuilder.group({
    author: ['', Validators.required],
    title: ['', Validators.required],
    isFavorite: false,
  });

  constructor(private readonly formBuilder: FormBuilder) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.data) {
      const { currentValue } = changes.data;
      this.fillForm(currentValue);
    }
  }

  submit(): void {
    if (this.form.valid && this.data) {
      this.dataSubmit.emit({ ...this.data, ...this.form.value });
    }
  }

  private fillForm(value?: Book): void {
    if (value) {
      this.form.patchValue(value);
    } else {
      this.form.reset();
    }
  }
}
