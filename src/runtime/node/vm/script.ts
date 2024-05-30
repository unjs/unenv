import type vm from "node:vm";

export class Script implements vm.Script {
  runInContext(
    contextifiedObject: vm.Context,
    options?: vm.RunningScriptOptions | undefined,
  ) {}
  runInNewContext(
    contextObject?: vm.Context | undefined,
    options?: vm.RunningScriptInNewContextOptions | undefined,
  ) {}
  runInThisContext(options?: vm.RunningScriptOptions | undefined) {}
  createCachedData(): Buffer {
    return Buffer.from("");
  }
}
