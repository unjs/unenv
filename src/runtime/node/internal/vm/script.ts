import type nodeVm from "node:vm";
import { createNotImplementedError } from "../../../_internal/utils.ts";

export class Script implements nodeVm.Script {
  runInContext(
    contextifiedObject: nodeVm.Context,
    options?: nodeVm.RunningScriptOptions | undefined,
  ) {
    throw createNotImplementedError("Script.runInContext");
  }
  runInNewContext(
    contextObject?: nodeVm.Context | undefined,
    options?: nodeVm.RunningScriptInNewContextOptions | undefined,
  ) {
    throw createNotImplementedError("Script.runInNewContext");
  }
  runInThisContext(options?: nodeVm.RunningScriptOptions | undefined) {
    throw createNotImplementedError("Script.runInThisContext");
  }
  createCachedData(): Buffer {
    throw createNotImplementedError("Script.createCachedData");
  }
}
