import { Module } from "node:module";

// eslint-disable-next-line unicorn/prefer-spread
export const NodeBuiltinModules = ([] as string[]).concat(
  Module.builtinModules,
  [
    "assert/strict",
    "fs/promises",
    "path/posix",
    "path/win32",
    "stream/consumers",
    "stream/promises",
    "stream/web",
    "timers/promises",
    "util/types",
  ],
);

export function mapArrToVal(val: any, arr: any[]) {
  return Object.fromEntries(arr.map((c) => [c, val]));
}
