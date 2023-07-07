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

export function notImplemented(name: string) {
  return (): any => {
    throw new Error(`[unenv] ${name} is not implemented yet!`);
  };
}

export function notImplementedClass(name: string) {
  return class {
    constructor() {
      throw new Error(`[unenv] ${name} is not implemented yet!`);
    }
  }
}
