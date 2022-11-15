// https://nodejs.org/api/path.html
// https://github.com/unjs/pathe
import type path from "node:path";

import * as _path from "pathe";
export * from "pathe";

const _pathModule = {
  ..._path,
  platform: "posix",
  posix: undefined as any,
  win32: undefined as any
};
_pathModule.posix = _pathModule;
_pathModule.win32 = _pathModule;

export const posix: typeof path.posix = _pathModule;
export const win32: typeof path.posix = _pathModule;
export const platform = "posix";

export default <typeof path> _pathModule;
