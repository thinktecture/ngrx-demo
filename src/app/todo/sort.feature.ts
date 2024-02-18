import { computed } from '@angular/core';
import {
  PartialStateUpdater,
  signalStoreFeature,
  type,
  withComputed,
  withState,
} from '@ngrx/signals';
import { EntityState } from '@ngrx/signals/entities';
import { valueCompare } from './value-compare';

interface SortState<T> {
  direction: 'ascending' | 'descending';
  sortBy: keyof T | undefined;
}

export function withSort<T>(sortBy?: keyof T) {
  return signalStoreFeature(
    { state: type<EntityState<T>>() },

    withState<SortState<T>>({ direction: 'ascending', sortBy }),

    withComputed(store => ({
      sorted: computed(() => {
        const entityMap = store.entityMap();
        const entities = store.ids().map(id => entityMap[id]);

        const property = store.sortBy();
        if (!property) {
          return entities;
        }

        entities.sort((a, b) => {
          const value1 = a[property];
          const value2 = b[property];
          return valueCompare(value1, value2);
        });

        if (store.direction() === 'descending') {
          return entities.reverse();
        }

        return entities;
      }),
    })),
  );
}

export function unsetSort<T>(): Omit<SortState<T>, 'direction'> {
  return { sortBy: undefined };
}

export function setSort<T>(property: keyof T): Omit<SortState<T>, 'direction'> {
  return { sortBy: property };
}

export function toggleSortDirection<T>(): PartialStateUpdater<SortState<T>> {
  return state => ({ direction: state.direction === 'ascending' ? 'descending' : 'ascending' });
}
