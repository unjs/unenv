import type timers from "node:timers/promises";
import { Immediate } from "./immediate";

export const setImmediateFallbackPromises: typeof timers.setImmediate =
  function setImmediate<T = void>(value?: T): Promise<T> {
    return new Promise((res) => {
      res(value as T | PromiseLike<T>);
    });
  };

export const setImmediateFallback = function setImmediate<TArgs extends any[]>(
  callback: (...args: TArgs) => void,
  ...args: TArgs
): NodeJS.Immediate {
  return new Immediate(callback, args);
};
setImmediateFallback.__promisify__ = setImmediateFallbackPromises;
