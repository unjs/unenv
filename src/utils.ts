import { Module } from 'module'

export const NodeBuiltinModules = ([] as string[]).concat(Module.builtinModules, [
  'fs/promises'
])

export function mapArrToVal (val: any, arr: any[]) {
  return arr.reduce((p, c) => ({ ...p, [c]: val }), {})
}
