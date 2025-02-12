// https://nodejs.org/api/path.html
// https://github.com/unjs/pathe
import type nodePath from "node:path";

import { notImplemented } from "../_internal/utils.ts";

import {
  basename,
  dirname,
  extname,
  format,
  isAbsolute,
  join,
  normalize,
  parse,
  relative,
  resolve,
  toNamespacedPath,
} from "pathe";

export {
  basename,
  dirname,
  extname,
  format,
  isAbsolute,
  join,
  normalize,
  parse,
  relative,
  resolve,
  toNamespacedPath,
} from "pathe";

export const sep = "/" as const;
export const delimiter = ":" as const;

const _pathModule = {
  sep,
  delimiter,
  basename,
  dirname,
  extname,
  format,
  isAbsolute,
  join,
  normalize,
  parse,
  relative,
  resolve,
  toNamespacedPath,
  posix: undefined as any,
  win32: undefined as any,
  _makeLong: (path: string) => path,
  // https://github.com/unjs/pathe/issues/182
  matchesGlob: /*@__PURE__*/ notImplemented(`path.matchesGlob`),
};
_pathModule.posix = _pathModule;
_pathModule.win32 = _pathModule;

export const posix: typeof nodePath.posix = _pathModule;
export const win32: typeof nodePath.posix = _pathModule;

export const _makeLong = _pathModule._makeLong;

export const matchesGlob = _pathModule.matchesGlob;

export default _pathModule satisfies typeof nodePath;
