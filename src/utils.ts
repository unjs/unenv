import { Module } from 'module'
import { resolve } from 'upath'

export const RUNTIME_DIR = resolve(__dirname, '../runtime')

export const NodeBuiltinModules = Module.builtinModules

export function mapArrToVal (val: any, arr: any[]) {
  return arr.reduce((p, c) => ({ ...p, [c]: val }), {})
}

export function tryResolve (id: string) : string | undefined {
  try {
    return require.resolve(id)
  } catch (e) {
    //
  }
}

export function resolveRuntime (id: string) {
  if (id.startsWith('unenv/')) {
    id = RUNTIME_DIR + id.substr(2)
  }
  return tryResolve(id) || id
}

export function resolveAll (packages: string[], id: string) {
  return mapArrToVal(resolveRuntime(id), packages)
}
