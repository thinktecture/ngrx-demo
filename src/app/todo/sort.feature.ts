interface SortState<T> {
  direction: 'ascending' | 'descending';
  sortBy: keyof T | undefined;
}
