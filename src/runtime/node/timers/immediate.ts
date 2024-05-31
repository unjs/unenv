export class Immediate<TArgs extends any[]> implements NodeJS.Immediate {
  _onImmediate: Function;

  constructor(callback: (...args: TArgs) => void, args: TArgs) {
    this._onImmediate = callback;
    callback(...args);
  }

  ref(): this {
    return this;
  }
  unref(): this {
    return this;
  }
  hasRef(): boolean {
    return false;
  }
  [Symbol.dispose]() {}
}
