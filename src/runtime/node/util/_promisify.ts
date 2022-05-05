import type util from 'node:util'

const customSymbol = Symbol('customPromisify')

function _promisify (fn: Function & { [customSymbol]?: Function}) {
  if (fn[customSymbol]) {
    return fn[customSymbol]
  }
  return function (...args: any[]) {
    return new Promise((resolve, reject) => {
      // @ts-ignore
      const value = fn.call(this, ...args, (err) => {
        if (err) { return reject(err)}
      })
      resolve(value)
    })
  }
}

_promisify.custom = customSymbol

// @ts-ignore
export const promisify : typeof util.promisify = _promisify
