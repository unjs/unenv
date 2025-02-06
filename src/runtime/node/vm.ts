import type vm from "node:vm";
import { notImplemented } from "../_internal/utils.ts";
import { Script } from "./internal/vm/script.ts";
import * as constants from "./internal/vm/constants.ts";

export { Script } from "./internal/vm/script.ts";
export * as constants from "./internal/vm/constants.ts";

export const compileFunction: typeof vm.compileFunction =
  notImplemented("vm.compileFunction");

const _contextSymbol = Symbol("uenv.vm.context");

export const createContext: typeof vm.createContext = function createContext() {
  return Object.create(null, {
    [_contextSymbol]: {
      value: true,
    },
  });
};

export const createScript = function createScript() {
  return new Script();
};

export const isContext: typeof vm.isContext = (context) => {
  return context && context[_contextSymbol as any] === true;
};

export const measureMemory: typeof vm.measureMemory = () =>
  Promise.resolve({
    total: { jsMemoryEstimate: 0, jsMemoryRange: [1, 2] },
    WebAssembly: { code: 0, metadata: 0 },
  });

export const runInContext: typeof vm.runInContext =
  notImplemented("vm.runInContext");

export const runInNewContext: typeof vm.runInNewContext =
  notImplemented("vm.runInNewContext");

export const runInThisContext: typeof vm.runInThisContext = notImplemented(
  "vm.runInThisContext",
);

export default <
  Omit<typeof vm, "Module" | "SourceTextModule" | "SyntheticModule">
>{
  Script,
  compileFunction,
  constants,
  createContext,
  createScript,
  isContext,
  measureMemory,
  runInContext,
  runInNewContext,
  runInThisContext,
};
