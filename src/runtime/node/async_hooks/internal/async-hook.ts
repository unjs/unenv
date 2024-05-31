import type asyncHooks from "node:async_hooks";

// https://nodejs.org/api/async_hooks.html

class _AsyncHook implements asyncHooks.HookCallbacks {
  readonly __unenv__ = true;

  _enabled: boolean = false;
  _callbacks: asyncHooks.HookCallbacks = {};

  constructor(callbacks: asyncHooks.HookCallbacks = {}) {
    this._callbacks = callbacks;
  }

  enable() {
    this._enabled = true;
    return this;
  }

  disable() {
    this._enabled = false;
    return this;
  }

  init(asyncId: number, type: string, triggerAsyncId: number, resource: any) {
    if (this._enabled && this._callbacks.init) {
      this._callbacks.init(asyncId, type, triggerAsyncId, resource);
    }
  }

  before(asyncId: number) {
    if (this._enabled && this._callbacks.before) {
      this._callbacks.before(asyncId);
    }
  }

  after(asyncId: number) {
    if (this._enabled && this._callbacks.after) {
      this._callbacks.after(asyncId);
    }
  }

  destroy(asyncId: number) {
    if (this._enabled && this._callbacks.destroy) {
      this._callbacks.destroy(asyncId);
    }
  }

  promiseResolve(asyncId: number) {
    if (this._enabled && this._callbacks.promiseResolve) {
      this._callbacks.promiseResolve(asyncId);
    }
  }
}

export const AsyncHook: asyncHooks.AsyncHook =
  (globalThis as any).AsyncHook || _AsyncHook;

export const createHook: typeof asyncHooks.createHook = function createHook(
  callbacks,
) {
  const asyncHook = new _AsyncHook(callbacks);
  return asyncHook;
};

export const executionAsyncId: typeof asyncHooks.executionAsyncId =
  function executionAsyncId() {
    return 0;
  };

export const executionAsyncResource: typeof asyncHooks.executionAsyncResource =
  function () {
    return Object.create(null);
  };

export const triggerAsyncId: typeof asyncHooks.triggerAsyncId = function () {
  return 0;
};
