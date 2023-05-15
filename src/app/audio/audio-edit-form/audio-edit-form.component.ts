import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { ReactiveFormsModule, UntypedFormBuilder, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Audio } from '../audio.model';

@Component({
  selector: 'app-audio-edit-form',
  templateUrl: './audio-edit-form.component.html',
  styleUrls: ['./audio-edit-form.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AudioEditFormComponent implements OnChanges {
  private readonly formBuilder = inject(UntypedFormBuilder);

  @Input() data?: Audio | null;
  @Input() loading: boolean | null = false;

  @Output() dataSubmit = new EventEmitter<Audio>();

  readonly form = this.formBuilder.group({
    author: ['', Validators.required],
    title: ['', Validators.required],
    isFavorite: false,
  });

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
