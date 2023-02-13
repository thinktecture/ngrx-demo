import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { Audio } from '../audio.model';

@Component({
  selector: 'app-audio-edit-form',
  templateUrl: './audio-edit-form.component.html',
  styleUrls: ['./audio-edit-form.component.scss'],
})
export class AudioEditFormComponent implements OnChanges {
  @Input() data?: Audio | null;
  @Input() loading: boolean | null = false;

  @Output() dataSubmit = new EventEmitter<Audio>();

  readonly form = this.formBuilder.group({
    author: ['', Validators.required],
    title: ['', Validators.required],
    isFavorite: false,
  });

  constructor(private readonly formBuilder: UntypedFormBuilder) {}

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

  private fillForm(value?: Audio): void {
    if (value) {
      this.form.patchValue(value);
    } else {
      this.form.reset();
    }
  }
}
