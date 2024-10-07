export class Immediate<TArgs extends any[]> implements NodeJS.Immediate {
  _onImmediate: (...args: TArgs) => void;
  private _timeout?: NodeJS.Timeout;

  constructor(callback: (...args: TArgs) => void, args: TArgs) {
    this._onImmediate = callback;
    if ("setTimeout" in globalThis) {
      this._timeout = setTimeout(callback, 0, ...args);
    } else {
      callback(...args);
    }
  }

  ref(): this {
    this._timeout?.ref();
    return this;
  }
  unref(): this {
    this._timeout?.unref();
    return this;
  }

  hasRef(): boolean {
    return this._timeout?.hasRef() ?? false;
  }

  [Symbol.dispose]() {
    if ("clearTimeout" in globalThis) {
      clearTimeout(this._timeout);
    }
  }
}
