import type asyncHooks from "node:async_hooks";
import { executionAsyncId } from "./_async-hook";

// https://nodejs.org/api/async_context.html#class-asyncresource

let _asyncIdCounter = 100;

class _AsyncResource implements asyncHooks.AsyncResource {
  readonly __unenv__ = true;

  type: string;
  _asyncId: undefined | number;
  _triggerAsyncId: undefined | number | asyncHooks.AsyncResourceOptions;

  constructor(
    type: string,
    triggerAsyncId:
      | number
      | asyncHooks.AsyncResourceOptions = executionAsyncId(),
  ) {
    this.type = type;
    this._asyncId = -1 * _asyncIdCounter++;
    this._triggerAsyncId =
      typeof triggerAsyncId === "number"
        ? triggerAsyncId
        : triggerAsyncId?.triggerAsyncId;
  }

  static bind<Func extends (this: ThisArg, ...args: any[]) => any, ThisArg>(
    fn: Func,
    type?: string,
    thisArg?: ThisArg,
  ) {
    const resource = new AsyncResource(type ?? "anonymous");
    return resource.bind(fn, thisArg);
  }

  bind<Func extends (...args: any[]) => any>(fn: Func, thisArg?: any) {
    const binded = (...args: any[]) =>
      this.runInAsyncScope(fn, thisArg, ...args);
    binded.asyncResource = this;
    return binded as any;
  }

  runInAsyncScope<This, Result>(
    fn: (this: This, ...args: any[]) => Result,
    thisArg?: This,
    ...args: any[]
  ): Result {
    const result = fn.apply(thisArg as This, args);
    return result;
  }

  emitDestroy(): this {
    return this;
  }

  asyncId(): number {
    return this._asyncId as number;
  }

  triggerAsyncId(): number {
    return this._triggerAsyncId as number;
  }
}

export const AsyncResource: typeof asyncHooks.AsyncResource =
  (globalThis as any).AsyncResource || _AsyncResource;
