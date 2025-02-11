function createMock(name: string, overrides: any = {}): any {
  const proxyFn = function () {};
  proxyFn.prototype.name = name;
  const props: any = {};
  const proxy = new Proxy(proxyFn, {
    get(_target, prop) {
      if (prop === "caller") {
        return null;
      }
      if (prop === "__createMock__") {
        return createMock;
      }
      if (prop === "__unenv__") {
        return true;
      }
      if (prop in overrides) {
        return overrides[prop];
      }
      if (prop === "then") {
        return (fn: any) => Promise.resolve(fn());
      }
      if (prop === "catch") {
        return (fn: any) => Promise.resolve(fn());
      }
      if (prop === "finally") {
        return (fn: any) => Promise.resolve(fn());
      }
      // @ts-ignore
      return (props[prop] =
        props[prop] || createMock(`${name}.${prop.toString()}`));
    },
    apply(_target, _this, _args) {
      return createMock(`${name}()`);
    },
    construct(_target, _args, _newT) {
      return createMock(`[${name}]`) as object;
    },
    // @ts-ignore (ES6-only - removed in ES7)
    // https://github.com/tc39/ecma262/issues/161
    enumerate() {
      return [];
    },
  });
  return proxy;
}

export default createMock("mock");
