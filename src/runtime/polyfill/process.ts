import processModule from "node:process";

const originalProcess = globalThis.process;

globalThis.process = originalProcess
  ? new Proxy(originalProcess, {
      get(target, prop, receiver) {
        if (Reflect.has(target, prop)) {
          return Reflect.get(target, prop, receiver);
        }
        return Reflect.get(processModule, prop, receiver);
      },
    })
  : processModule;

export default globalThis.process satisfies typeof processModule;
