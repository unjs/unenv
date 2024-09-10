import { Immediate } from "./immediate";

export function setImmediateFallbackPromises<T = void>(value?: T): Promise<T> {
  return new Promise((res) => {
    res(value as T | PromiseLike<T>);
  });
}

export function setImmediateFallback<TArgs extends any[]>(
  callback: (...args: TArgs) => void,
  ...args: TArgs
): NodeJS.Immediate {
  return new Immediate(callback, args);
}
setImmediateFallback.__promisify__ = setImmediateFallbackPromises;

export function clearImmediateFallback(
  immediate: NodeJS.Immediate | undefined,
) {
  immediate?.[Symbol.dispose]();
}
