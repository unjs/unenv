// https://nodejs.org/api/module.html
import type nodeModule from "node:module";

export {
  Module,
  SourceMap,
  _cache,
  _extensions,
  _debug,
  _pathCache,
  _findPath,
  _initPaths,
  _load,
  _nodeModulePaths,
  _preloadModules,
  _resolveFilename,
  _resolveLookupPaths,
  builtinModules,
  findSourceMap,
  globalPaths,
  isBuiltin,
  register,
  runMain,
  syncBuiltinESMExports,
  wrap,
} from "./index";

import {
  Module,
  SourceMap,
  _cache,
  _extensions,
  _debug,
  _pathCache,
  _findPath,
  _initPaths,
  _load,
  _nodeModulePaths,
  _preloadModules,
  _resolveFilename,
  _resolveLookupPaths,
  builtinModules,
  createRequire as unenvCreateRequire,
  findSourceMap,
  globalPaths,
  isBuiltin,
  register,
  runMain,
  syncBuiltinESMExports,
  wrap,
} from "./index";

const workerdModule = process.getBuiltinModule("node:module");

export function createRequire(
  file: string,
): ReturnType<typeof unenvCreateRequire> {
  const requirePolyfill = unenvCreateRequire(file);
  if (!workerdModule?.createRequire) {
    // Use the unenv version of `createRequire` when not supported by `workerd`.
    return requirePolyfill;
  }

  const requireFn = workerdModule.createRequire(file) as any;

  // Patch properties missing from `workerd`.
  for (const key of ["resolve", "cache", "extensions", "main"] as const) {
    if (!(key in requireFn)) {
      requireFn[key] = requirePolyfill[key];
    }
  }

  return requireFn as ReturnType<typeof unenvCreateRequire>;
}

export default {
  Module,
  SourceMap,
  _cache,
  _extensions,
  _debug,
  _pathCache,
  _findPath,
  _initPaths,
  _load,
  _nodeModulePaths,
  _preloadModules,
  _resolveFilename,
  _resolveLookupPaths,
  builtinModules,
  createRequire,
  findSourceMap,
  globalPaths,
  isBuiltin,
  register,
  runMain,
  syncBuiltinESMExports,
  wrap,
};
