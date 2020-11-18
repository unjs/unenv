import { Module } from 'module'
import { resolve, join } from 'upath'

export const RUNTIME_DIR = resolve(__dirname, '../runtime')

export const NodeBuiltinModules = Module.builtinModules

export function mapArrToVal (val: any, arr: any[]) {
  return arr.reduce((p, c) => ({ ...p, [c]: val }), {})
}

export function r (id: string) {
  return require.resolve(join(RUNTIME_DIR, id))
}

export function mockAll (packages: string[]) {
  return mapArrToVal(r('mock/proxy'), packages)
}
