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
  constants,
  enableCompileCache,
  findSourceMap,
  getCompileCacheDir,
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
  constants,
  enableCompileCache,
  findSourceMap,
  getCompileCacheDir,
  globalPaths,
  isBuiltin,
  register,
  runMain,
  syncBuiltinESMExports,
  wrap,
} from "./index";
import { notImplemented } from "../../_internal/utils";

const workerdModule = process.getBuiltinModule("node:module");

export const createRequire: typeof nodeModule.createRequire = (
  file: string,
) => {
  return Object.assign(workerdModule.createRequire(file), {
    resolve: Object.assign(notImplemented("module.require.resolve"), {
      paths: notImplemented("module.require.resolve.paths"),
    }),
    cache: Object.create(null),
    extensions: _extensions,
    main: undefined,
  });
};

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
  enableCompileCache,
  constants,
  createRequire,
  findSourceMap,
  getCompileCacheDir,
  globalPaths,
  isBuiltin,
  register,
  runMain,
  syncBuiltinESMExports,
  wrap,
};
