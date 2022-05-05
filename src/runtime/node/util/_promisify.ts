import type util from 'node:util'

const customSymbol = Symbol('customPromisify')

function _promisify (fn: Function & { [customSymbol]?: Function}) {
  if (fn[customSymbol]) {
    return fn[customSymbol]
  }
  return function (...args: any[]) {
    return new Promise((resolve, reject) => {
      try {
        // @ts-ignore
        fn.call(this, ...args, (err, val) => {
          if (err) { return reject(err)}
          resolve(val)
        })
      } catch (err) {
        reject(err)
      }
    })
  }
}

_promisify.custom = customSymbol

// @ts-ignore
export const promisify : typeof util.promisify = _promisify
