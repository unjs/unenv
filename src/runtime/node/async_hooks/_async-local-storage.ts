import type asyncHooks from "node:async_hooks";

// https://nodejs.org/api/async_context.html#class-asynclocalstorage

export class AsyncLocalStorage<T> implements asyncHooks.AsyncLocalStorage<T> {
  _currentStore: undefined | T;
  _enterStore: undefined | T;
  _enabled: boolean = true;

  getStore() {
    return this._currentStore ?? this._enterStore;
  }

  disable() {
    this._enabled = false;
  }

  enable() {
    this._enabled = true;
  }

  enterWith(store: any) {
    this._enterStore = store;
  }

  run<R, TArgs extends any[]>(
    store: any,
    callback: (...args: TArgs) => R,
    ...args: TArgs
  ): R {
    this._currentStore = store;
    const res = callback(...args); // eslint-disable-line n/no-callback-literal
    this._currentStore = undefined;
    return res;
  }

  exit<R, TArgs extends any[]>(
    callback: (...args: TArgs) => R,
    ...args: TArgs
  ): R {
    const _previousStore = this._currentStore;
    this._currentStore = undefined;
    const res = callback(...args); // eslint-disable-line n/no-callback-literal
    this._currentStore = _previousStore;
    return res;
  }

  static snapshot(): any {
    throw new Error("[unenv] `AsyncLocalStorage.snapshot` is not implemented!");
  }
}
