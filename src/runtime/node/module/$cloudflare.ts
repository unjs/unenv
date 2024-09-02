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
  builtinModules as unenvBuiltinModules,
  createRequire as unenvCreateRequire,
  findSourceMap as unenvFindSourceMap,
  globalPaths as unenvGlobalPaths,
  isBuiltin as unenvIsBuiltin,
  register as unenvRegister,
  runMain as unenvRunMain,
  syncBuiltinESMExports as unenvSyncBuiltinESMExports,
  wrap as unenvWrap,
} from "./index";

const workerdModule = process.getBuiltinModule("node:module");

const resolvedExports = {
  builtinModules: workerdModule?.builtinModules ?? unenvBuiltinModules,
  createRequire: { ...unenvCreateRequire, ...workerdModule?.createRequire },
  findSourceMap: unenvFindSourceMap,
  globalPaths: unenvGlobalPaths,
  isBuiltin: workerdModule?.isBuiltin ?? unenvIsBuiltin,
  register: unenvRegister,
  runMain: unenvRunMain,
  syncBuiltinESMExports: unenvSyncBuiltinESMExports,
  wrap: unenvWrap,
} satisfies nodeModule;

export const {
  builtinModules,
  createRequire,
  findSourceMap,
  globalPaths,
  isBuiltin,
  register,
  runMain,
  syncBuiltinESMExports,
  wrap,
} = resolvedExports;

// polyfill missing module API in workerd, while preserving its identity
Object.assign(resolvedExports, {
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
});

export default resolvedExports;
