import type timers from "node:timers/promises";
import { Timeout } from "./timeout";

export const setIntervalFallbackPromises: typeof timers.setInterval =
  async function* setInterval<T = void>(
    delay?: number,
    value?: T,
  ): AsyncIterable<T> {
    yield value as T;
  };

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
