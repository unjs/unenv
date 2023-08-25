import type { HeadersObject } from "./types";

export function rawHeaders(headers: HeadersObject) {
  const rawHeaders = [];
  for (const key in headers) {
    if (Array.isArray(headers[key])) {
      for (const h of headers[key] as any) {
        rawHeaders.push(key, h);
      }
    } else {
      rawHeaders.push(key, headers[key]);
    }
  }
  return rawHeaders;
}

type Fn = (...args: any[]) => any;
export function mergeFns(...functions: Fn[]) {
  return function (...args: any[]) {
    for (const fn of functions) {
      fn(...args);
    }
  };
}

export function createNotImplementedError(name: string) {
  throw new Error(`[unenv] ${name} is not implemented yet!`);
}

export function notImplemented(name: string) {
  const fn = (): any => {
    throw createNotImplementedError(name);
  };
  return Object.assign(fn, { __unenv__: true });
}

export function notImplementedClass<T = unknown>(name: string): T {
  return class {
    readonly __unenv__ = true;
    constructor() {
      throw new Error(`[unenv] ${name} is not implemented yet!`);
    }
  } as T;
}
