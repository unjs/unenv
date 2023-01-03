import _global from "./global-this";

try {
  const _defineOpts: PropertyDescriptor = { enumerable: false, value: _global };
  Object.defineProperties(_global, {
    self: _defineOpts,
    window: _defineOpts,
    global: _defineOpts,
  });
} catch {}

export default _global as typeof globalThis;
