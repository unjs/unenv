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

  const requireFn = workerdModule.createRequire(file) as ReturnType<
    typeof unenvCreateRequire
  >;

  // Patch properties missing from `workerd`.
  if (!requireFn.resolve) {
    requireFn.resolve = requirePolyfill.resolve;
  }
  if (!requireFn.cache) {
    requireFn.cache = requirePolyfill.cache;
  }
  if (!requireFn.extensions) {
    requireFn.extensions = requirePolyfill.extensions;
  }
  if (!requireFn.main) {
    requireFn.main = requirePolyfill.main;
  }

  return requireFn;
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
