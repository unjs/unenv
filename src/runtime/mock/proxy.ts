const fn = function () {};

function createMock(name: string, overrides: any = {}): any {
  fn.prototype.name = name;
  const props: any = {};
  return new Proxy(fn, {
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
}

export default createMock("mock");
