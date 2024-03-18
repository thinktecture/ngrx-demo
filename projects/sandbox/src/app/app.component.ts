import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { CounterComponent } from './counter/counter.component';

@Component({
  selector: 'app-root',
  imports: [CommonModule, CounterComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  readonly key = signal('counter-1');

  toggleKey(): void {
    this.key.update(key => (key === 'counter-1' ? 'counter-alt' : 'counter-1'));
  }
}
