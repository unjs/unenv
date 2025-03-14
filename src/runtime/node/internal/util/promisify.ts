import type nodeUtil from "node:util";

const customSymbol = /*@__PURE__*/ Symbol("customPromisify");

type Fn = (...args: any[]) => any;

function _promisify(fn: Fn & { [customSymbol]?: Fn }) {
  if (fn[customSymbol]) {
    return fn[customSymbol];
  }
  return function (...args: any[]) {
    return new Promise((resolve, reject) => {
      try {
        // @ts-ignore
        fn.call(this, ...args, (err, val) => {
          if (err) {
            return reject(err);
          }
          resolve(val);
        });
      } catch (error) {
        reject(error);
      }
    });
  };
}

// @ts-ignore
export const promisify: typeof nodeUtil.promisify = /*@__PURE__*/ Object.assign(
  _promisify,
  {
    custom: customSymbol,
  },
);
