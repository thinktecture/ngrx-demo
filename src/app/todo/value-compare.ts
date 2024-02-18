export function valueCompare(value1: unknown, value2: unknown): number {
  if (typeof value1 === 'string' && typeof value2 === 'string') {
    return value1.localeCompare(value2);
  }

  if (typeof value1 === 'number' && typeof value2 === 'number') {
    return value1 - value2;
  }

  if (typeof value1 === 'boolean' && typeof value2 === 'boolean') {
    return +value1 - +value2;
  }

  return 0;
}
