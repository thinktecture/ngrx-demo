import { CommonModule } from '@angular/common';
import { Component, effect, EffectRef, Signal, signal } from '@angular/core';
import { CounterComponent } from './counter/counter.component';

function restore(storageKey: string): number {
  const restored = parseInt(sessionStorage.getItem(storageKey) ?? '');
  return restored || 0;
}

function persist(storageKey: string, value: Signal<number>): EffectRef {
  return effect(() => {
    console.log('persisting', storageKey);

    sessionStorage.setItem(storageKey, `${value()}`);
  });
}

@Component({
  selector: 'app-root',
  imports: [CommonModule, CounterComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  readonly counter1 = signal(restore('counter-1'));
  readonly counter2 = signal(restore('counter-2'));
  readonly counter3 = signal(restore('counter-3'));

  readonly persist1 = persist('counter-1', this.counter1);
  readonly persist2 = persist('counter-2', this.counter2);
  readonly persist3 = persist('counter-3', this.counter3);
}
