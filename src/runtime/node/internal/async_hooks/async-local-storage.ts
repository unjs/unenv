import type nodeAsyncHooks from "node:async_hooks";

// https://nodejs.org/api/async_context.html#class-asynclocalstorage

class _AsyncLocalStorage<T> implements nodeAsyncHooks.AsyncLocalStorage<T> {
  readonly __unenv__ = true;

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
    const previousStore = this._currentStore;
    this._currentStore = store;
    try {
      const res = callback(...args);
      if (res != null && typeof (res as any).then === "function") {
        return Promise.resolve(res).finally(() => {
          this._currentStore = previousStore;
        }) as R;
      }
      this._currentStore = previousStore;
      return res;
    } catch (error_) {
      this._currentStore = previousStore;
      throw error_;
    }
  }

  exit<R, TArgs extends any[]>(
    callback: (...args: TArgs) => R,
    ...args: TArgs
  ): R {
    const previousStore = this._currentStore;
    this._currentStore = undefined;
    try {
      const res = callback(...args);
      if (res != null && typeof (res as any).then === "function") {
        return Promise.resolve(res).finally(() => {
          this._currentStore = previousStore;
        }) as R;
      }
      this._currentStore = previousStore;
      return res;
    } catch (error_) {
      this._currentStore = previousStore;
      throw error_;
    }
  }

  static snapshot(): any {
    throw new Error("[unenv] `AsyncLocalStorage.snapshot` is not implemented!");
  }
}

export const AsyncLocalStorage: typeof nodeAsyncHooks.AsyncLocalStorage =
  (globalThis as any).AsyncLocalStorage || _AsyncLocalStorage;
