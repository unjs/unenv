import type nodeTimers from "node:timers";
import { Timeout } from "./timeout.ts";

export function setTimeoutFallbackPromises<T = void>(
  delay?: number,
  value?: T,
  options?: nodeTimers.TimerOptions,
): Promise<T> {
  return new Promise((res) => {
    // NOTE: we are ignoring options?.signal? as promise is immediately resolved
    res(value as T | PromiseLike<T>);
  });
}

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
