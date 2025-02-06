export function mapArrToVal(val: any, arr: readonly any[]) {
  return Object.fromEntries(arr.map((c) => [c, val]));
}
