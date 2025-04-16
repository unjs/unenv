import { createNotImplementedError } from "../../../_internal/utils.ts";

export class Timeout<TArgs extends any[]> implements NodeJS.Timeout {
  constructor(callback: TimerHandler, args: TArgs) {
    if (typeof callback === "function") {
      callback(...args);
    }
  }
  close(): this {
    throw createNotImplementedError("node.timers.timeout.close");
  }
  _onTimeout(...args: any[]): void {
    throw createNotImplementedError("node.timers.timeout._onTimeout");
  }
  ref() {
    return this;
  }
  unref() {
    return this;
  }
  hasRef() {
    return false;
  }
  refresh() {
    return this;
  }
  [Symbol.dispose]() {}
  [Symbol.toPrimitive]() {
    return 0;
  }
}
