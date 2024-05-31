import type timers from "node:timers/promises";
import { Timeout } from "./timeout";

export const setTimeoutFallbackPromises: typeof timers.setTimeout =
  function setTimeout<T = void>(delay?: number, value?: T): Promise<T> {
    return new Promise((res) => {
      res(value as T | PromiseLike<T>);
    });
  };

export function setTimeoutFallback(
  callback: TimerHandler,
  ms?: number,
): NodeJS.Timeout;
export function setTimeoutFallback<TArgs extends any[]>(
  callback: TimerHandler,
  ms?: number,
  ...args: TArgs
) {
  return new Timeout(callback, args);
}

setTimeoutFallback.__promisify__ = setTimeoutFallbackPromises;
