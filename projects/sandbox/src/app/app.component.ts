import { CommonModule } from '@angular/common';
import { Component, effect, EffectRef, inject, Injector, Signal, signal } from '@angular/core';
import { CounterComponent } from './counter/counter.component';

function restore(storageKey: string): number {
  const restored = parseInt(sessionStorage.getItem(storageKey) ?? '');
  return restored || 0;
}

function persist(storageKey: string, value: Signal<number>, injector: Injector): EffectRef {
  return effect(
    () => {
      console.log('persisting', storageKey);

      sessionStorage.setItem(storageKey, `${value()}`);
    },
    { injector },
  );
}

@Component({
  selector: 'app-root',
  imports: [CommonModule, CounterComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  readonly injector = inject(Injector);

  readonly counter1 = signal(restore('counter-1'));
  readonly counter2 = signal(restore('counter-2'));
  readonly counter3 = signal(restore('counter-3'));

  private persist1?: EffectRef;
  private persist2?: EffectRef;
  private persist3?: EffectRef;

  managePersist(shouldPersist: boolean): void {
    if (shouldPersist) {
      this.persist1 = persist('counter-1', this.counter1, this.injector);
      this.persist2 = persist('counter-2', this.counter2, this.injector);
      this.persist3 = persist('counter-3', this.counter3, this.injector);
    } else {
      this.persist1?.destroy();
      this.persist2?.destroy();
      this.persist3?.destroy();
    }
  }
}
