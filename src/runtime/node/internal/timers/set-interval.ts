import { Timeout } from "./timeout.ts";

export async function* setIntervalFallbackPromises<T = void>(
  delay?: number,
  value?: T,
): NodeJS.AsyncIterator<T> {
  yield value as T;
}

export function setIntervalFallback(
  callback: (args: void) => void,
  ms?: number,
): NodeJS.Timeout;
export function setIntervalFallback<TArgs extends any[]>(
  callback: (...args: TArgs) => void,
  ms?: number,
  ...args: TArgs
): NodeJS.Timeout {
  return new Timeout(callback, args);
}
setIntervalFallback.__promisify__ = setIntervalFallbackPromises;
