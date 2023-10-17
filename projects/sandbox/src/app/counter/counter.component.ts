import { CommonModule } from '@angular/common';
import {
  Component,
  computed,
  effect,
  EffectRef,
  inject,
  Injector,
  Input,
  signal,
  untracked,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { interval, take } from 'rxjs';

let id = 1;

function colorPicker(colors: string[]): (n: number) => string {
  const numColors = colors.length;
  return n => colors[n % numColors];
}

const nthColor = colorPicker(['#9cd08f', '#21295c', '#8b8bae', '#af125a', '#582b11']);

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss'],
})
export class CounterComponent {
  private readonly injector = inject(Injector);
  private effectRef?: EffectRef;

  @Input({ required: true }) storageKey = '';

  readonly save = toSignal(interval(1000));
  readonly counter = signal(0);

  ngOnInit(): void {
    const restored = parseInt(sessionStorage.getItem(this.storageKey) ?? '');

    this.counter.set(restored || 0);

    this.storeCounter();
  }

  color = computed(() => {
    return nthColor(this.counter());
  });

  increment(): void {
    this.counter.update(count => ++count);
  }

  reset(): void {
    this.counter.set(0);
  }

  start(): void {
    this.storeCounter();
  }

  stop(): void {
    this.effectRef?.destroy();
  }

  persist(): void {}

  private storeCounter(): void {
    this.effectRef?.destroy();
    this.effectRef = effect(
      () => {
        console.log('persisting', this.storageKey, this.save());

        untracked(() => {
          sessionStorage.setItem(this.storageKey, `${this.counter()}`);
        });
      },
      { injector: this.injector },
    );
  }
}
