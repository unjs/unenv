export class Timeout<TArgs extends any[]> implements NodeJS.Timeout {
  constructor(callback: TimerHandler, args: TArgs) {
    if (typeof callback === "function") {
      callback(...args);
    }
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
