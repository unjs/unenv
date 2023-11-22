// https://nodejs.org/api/module.html
import type nodeModule from "node:module";
import { notImplemented, notImplementedClass } from "../../_internal/utils";

export const builtinModules: typeof nodeModule.builtinModules = [];

export const createRequire = notImplemented(
  "module.createRequire",
) as typeof nodeModule.createRequire;

export const runMain = notImplemented(
  "module.runMain",
) as typeof nodeModule.runMain;

export const isBuiltin = notImplemented(
  "module.isBuiltin",
) as typeof nodeModule.isBuiltin;

export const register = notImplemented(
  "module.register",
) as typeof nodeModule.register;

export const syncBuiltinESMExports = notImplemented(
  "module.syncBuiltinESMExports",
) as typeof nodeModule.syncBuiltinESMExports;

export const findSourceMap = notImplemented(
  "module.syncBuiltinESMExports",
) as typeof nodeModule.findSourceMap;

export const wrap = notImplemented("module.wrap") as typeof nodeModule.wrap;

export const Module = notImplementedClass(
  "module.Module",
) as typeof nodeModule.Module;

export const SourceMap = notImplementedClass(
  "module.SourceMap",
) as typeof nodeModule.SourceMap;

export default <typeof nodeModule>{
  Module,
  SourceMap,
  builtinModules,
  createRequire,
  runMain,
  wrap,
  isBuiltin,
  register,
  syncBuiltinESMExports,
  findSourceMap,
};
