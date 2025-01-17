import type vm from "node:vm";
import { createNotImplementedError } from "../../../_internal/utils";

export class Script implements vm.Script {
  runInContext(
    contextifiedObject: vm.Context,
    options?: vm.RunningScriptOptions | undefined,
  ) {
    throw createNotImplementedError("Script.runInContext");
  }
  runInNewContext(
    contextObject?: vm.Context | undefined,
    options?: vm.RunningScriptInNewContextOptions | undefined,
  ) {
    throw createNotImplementedError("Script.runInNewContext");
  }
  runInThisContext(options?: vm.RunningScriptOptions | undefined) {
    throw createNotImplementedError("Script.runInThisContext");
  }
  createCachedData(): Buffer {
    throw createNotImplementedError("Script.createCachedData");
  }
}
