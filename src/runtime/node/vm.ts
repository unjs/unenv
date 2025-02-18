import type nodeVm from "node:vm";
import { notImplemented } from "../_internal/utils.ts";
import { Script } from "./internal/vm/script.ts";
import * as constants from "./internal/vm/constants.ts";

export { Script } from "./internal/vm/script.ts";

export * as constants from "./internal/vm/constants.ts";

export const compileFunction: typeof nodeVm.compileFunction =
  /*@__PURE__*/ notImplemented("vm.compileFunction");

const _contextSymbol = /*@__PURE__*/ Symbol("uenv.vm.context");

export const createContext: typeof nodeVm.createContext =
  function createContext() {
    return Object.create(null, {
      [_contextSymbol]: {
        value: true,
      },
    });
  };

export const createScript = function createScript() {
  return new Script();
};

export const isContext: typeof nodeVm.isContext = (context) => {
  return context && context[_contextSymbol as any] === true;
};

export const measureMemory: typeof nodeVm.measureMemory = () =>
  Promise.resolve({
    total: { jsMemoryEstimate: 0, jsMemoryRange: [1, 2] },
    WebAssembly: { code: 0, metadata: 0 },
  });

export const runInContext: typeof nodeVm.runInContext =
  /*@__PURE__*/ notImplemented("vm.runInContext");

export const runInNewContext: typeof nodeVm.runInNewContext =
  /*@__PURE__*/ notImplemented("vm.runInNewContext");

export const runInThisContext: typeof nodeVm.runInThisContext =
  /*@__PURE__*/ notImplemented("vm.runInThisContext");

export default {
  Script,
  compileFunction,
  constants: constants as unknown as typeof nodeVm.constants,
  createContext,
  isContext,
  measureMemory,
  runInContext,
  runInNewContext,
  runInThisContext,
  // @ts-expect-error
  createScript,
} satisfies Omit<
  typeof nodeVm,
  "Module" | "SourceTextModule" | "SyntheticModule"
>;
