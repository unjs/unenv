import { Module } from 'module'

export const NodeBuiltinModules = Module.builtinModules

export function mapArrToVal (val: any, arr: any[]) {
  return arr.reduce((p, c) => ({ ...p, [c]: val }), {})
}
