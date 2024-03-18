import { CommonModule } from '@angular/common';
import { Component, computed, model } from '@angular/core';

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
  readonly counter = model(0);

  color = computed(() => nthColor(this.counter()));

  increment(): void {
    this.counter.update(count => ++count);
  }

  reset(): void {
    this.counter.set(0);
  }
}
