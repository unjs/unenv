import { Module } from 'module'

export const NodeBuiltinModules = ([] as string[]).concat([
  'assert/strict',
  'fs/promises',
  'path/posix',
  'path/win32',
  'stream/consumers',
  'stream/promises',
  'stream/web',
  'timers/promises',
  'util/types'
], Module.builtinModules)

export function mapArrToVal (val: any, arr: any[]) {
  return arr.reduce((p, c) => ({ ...p, [c]: val }), {})
}
