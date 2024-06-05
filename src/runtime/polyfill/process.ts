import type nodeProcess from "node:process";
import unenvProcess from "../node/process/index";

// TODO: or should we Object.assign into globalThis.process to preserve the identity
// of the original globalThis.process?
globalThis.process = {
  ...unenvProcess,
  ...globalThis.process,
} satisfies typeof nodeProcess;
