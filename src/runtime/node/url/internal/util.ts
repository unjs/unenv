// Source: https://github.com/nodejs/node/blob/v22.7.0/lib/internal/util.js

// As of V8 6.6, depending on the size of the array, this is anywhere
// between 1.5-10x faster than the two-arg version of Array#splice()
export function spliceOne(list: unknown[], index: number) {
  for (; index + 1 < list.length; index++) list[index] = list[index + 1];
  list.pop();
}
