import noop from "../../mock/noop";
import type vm from "node:vm";
import { Script } from "./script";
import * as constants from "./constants";

export { Script } from "./script";
export * as constants from "./constants";

export const compileFunction: typeof vm.compileFunction =
  function compileFunction() {
    return noop;
  };
export const createContext: typeof vm.createContext = function createContext() {
  return {};
};
export const createScript = function createScript() {
  return new Script();
};
export const isContext: typeof vm.isContext = () => false;
export const measureMemory: typeof vm.measureMemory = () =>
  Promise.resolve({
    total: { jsMemoryEstimate: 0, jsMemoryRange: [1, 2] },
    WebAssembly: { code: 0, metadata: 0 },
  });
export const runInContext: typeof vm.runInContext = noop;
export const runInNewContext: typeof vm.runInNewContext = noop;
export const runInThisContext: typeof vm.runInThisContext = noop;

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
