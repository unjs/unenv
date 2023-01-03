// https://www.npmjs.com/package/inherits
// Source: https://github.com/isaacs/inherits/blob/e6265134c91f9fb6a3d5e771f034ec94d20c6708/inherits_browser.js
export default function inherits(ctor: any, superCtor: any) {
  if (!superCtor) {
    return;
  }
  ctor.super_ = superCtor;
  ctor.prototype = Object.create(superCtor.prototype, {
    constructor: {
      value: ctor,
      enumerable: false,
      writable: true,
      configurable: true,
    },
  });
}
