import type { ConsolaReporter } from "consola";
import { createConsola as _createConsola } from "consola/core";

const basicReporter: ConsolaReporter = {
  log(logObj) {
    (console[logObj.type as "log"] || console.log)(...logObj.args);
  },
};

export function createConsola(options: any = {}) {
  return _createConsola({
    reporters: [basicReporter],
    ...options,
  });
}

export const consola = createConsola();

(consola as any).consola = consola;

export default consola;
