import type util from "node:util";

const customSymbol = Symbol("customPromisify");

type Fn = (...args: any[]) => any;

function _promisify (fn: Fn & { [customSymbol]?: Fn}) {
  if (fn[customSymbol]) {
    return fn[customSymbol];
  }
  return function (...args: any[]) {
    return new Promise((resolve, reject) => {
      try {
        // @ts-ignore
        fn.call(this, ...args, (err, val) => {
          if (err) { return reject(err); }
          resolve(val);
        });
      } catch (error) {
        reject(error);
      }
    });
  };
}

_promisify.custom = customSymbol;

// @ts-ignore
export const promisify : typeof util.promisify = _promisify;
