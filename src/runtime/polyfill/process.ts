import type nodeProcess from "node:process";
import unenvProcess from "../node/process.ts";

const originalProcess = globalThis.process;

globalThis.process = originalProcess
  ? new Proxy(originalProcess, {
      get(target, prop, receiver) {
        if (Reflect.has(target, prop)) {
          return Reflect.get(target, prop, receiver);
        }
        return Reflect.get(target, prop, receiver);
      },
    })
  : unenvProcess;

export default globalThis.process satisfies typeof nodeProcess;
