import { CommonModule } from '@angular/common';
import { Component, computed, effect, input, signal, untracked } from '@angular/core';

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
  readonly storageKey = input.required<string>();

  readonly counter = signal(0);

  color = computed(() => nthColor(this.counter()));

  increment(): void {
    this.counter.update(count => ++count);
  }

  reset(): void {
    this.counter.set(0);
  }

  readonly restore = effect(
    () => {
      const restored = parseInt(sessionStorage.getItem(this.storageKey()) ?? '');
      this.counter.set(restored || 0);
    },
    { allowSignalWrites: true },
  );

  readonly persist = effect(() => {
    console.log('persisting', untracked(this.storageKey));

    sessionStorage.setItem(untracked(this.storageKey), `${this.counter()}`);
  });
}
