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

const createRequire: any = workerdModule?.createRequire ?? unenvCreateRequire;

if (workerdModule?.createRequire === undefined) {
  for (const [key, value] of Object.entries(unenvCreateRequire)) {
    createRequire[key] = value;
  }
}

export { createRequire };

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
