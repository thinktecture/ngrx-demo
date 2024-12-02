import { CommonModule } from '@angular/common';
import { Component, computed, effect, signal } from '@angular/core';

let id = 1;

function colorPicker(colors: string[]): (n: number) => string {
  const numColors = colors.length;
  return n => colors[n % numColors];
}

const nthColor = colorPicker(['#9cd08f', '#21295c', '#8b8bae', '#af125a', '#582b11']);

@Component({
  selector: 'app-counter',
  imports: [CommonModule],
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss'],
})
export class CounterComponent {
  private readonly storageKey = `counter${id++}`;
  private readonly restored = parseInt(sessionStorage.getItem(this.storageKey) ?? '');

  readonly counter = signal(this.restored || 0);

  color = computed(() => {
    console.log(this.storageKey, 'running');

    return nthColor(this.counter());
  });

  increment(): void {
    this.counter.update(count => ++count);
  }

  reset(): void {
    this.counter.set(0);
  }

  readonly persist = effect(() => {
    console.log('persisting', this.storageKey);

    sessionStorage.setItem(this.storageKey, `${this.counter()}`);
  });
}
