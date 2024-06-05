import type nodeProcess from "node:process";
import unenvProcess from "../node/process/index";

// use Object.assign to preserve the identity of globalThis.process
Object.assign(globalThis.process, {
  ...unenvProcess,
  ...globalThis.process,
}) satisfies typeof nodeProcess;
