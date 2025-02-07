import type nodeProcess from "node:process";
import unenvProcess from "../node/process.ts";

if (globalThis.process) {
  Object.assign(globalThis.process, {
    ...unenvProcess,
    ...globalThis.process,
  });
} else {
  globalThis.process = unenvProcess;
}

export default globalThis.process satisfies typeof nodeProcess;
