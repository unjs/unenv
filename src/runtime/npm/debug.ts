// https://www.npmjs.com/package/debug

import type { Debug, Debugger, Formatters } from "debug";

const enabledPatterns: RegExp[] = [];
const skippedPatterns: RegExp[] = [];
// DEBUG is read for every log call, so only recompile when its value changes.
let cachedDebugEnv: string | undefined;

function compileNamespacePattern(pattern: string): RegExp {
  const source = pattern
    .split("*")
    .map((part) => part.replace(/[.*+?^${}()|[\]\\]/g, String.raw`\$&`))
    .join(".*");
  return new RegExp(`^${source}$`);
}

function isNamespaceEnabled(namespace: string): boolean {
  const env = globalThis.process?.env.DEBUG;

  if (env !== cachedDebugEnv) {
    cachedDebugEnv = env;
    enabledPatterns.length = 0;
    skippedPatterns.length = 0;

    for (const entry of env?.split(/[\s,]+/) ?? []) {
      if (!entry) continue;
      const isSkip = entry.startsWith("-");
      const pattern = isSkip ? entry.slice(1) : entry;
      if (!pattern) continue;
      (isSkip ? skippedPatterns : enabledPatterns).push(
        compileNamespacePattern(pattern),
      );
    }
  }

  if (!env) return false;
  return (
    !skippedPatterns.some((pattern) => pattern.test(namespace)) &&
    enabledPatterns.some((pattern) => pattern.test(namespace))
  );
}

function createDebug(namespace: string): Debugger {
  return Object.assign(
    (...args: any[]) => {
      if (!isNamespaceEnabled(namespace)) return;
      console.debug(...args);
    },
    {
      color: "#000000",
      diff: 0,
      enabled: true,
      log: console.debug.bind(console),
      namespace,
      destroy: () => false,
      extend: (ns: string, _del?: string) => createDebug(namespace + ns),
    },
  );
}

const debug: Debug = Object.assign(createDebug, {
  coerce: (val: any) => val,
  disable: () => "",
  enable: (_namespaces: string) => {},
  enabled: (_namespaces: string) => true,
  formatArgs(this: Debugger, args: any[]) {
    args[0] = `${this.namespace} ${args[0]}`;
  },
  log: console.debug.bind(console),
  selectColor: (_namespace: string) => 0,
  humanize: (num: any) => `${num}ms` as any,
  inspectOpts: {},
  names: [] as RegExp[],
  skips: [] as RegExp[],
  formatters: {} as Formatters,
});

export const coerce = debug.coerce;
export const disable = debug.disable;
export const enable = debug.enable;
export const enabled = debug.enabled;
export const formatArgs = debug.formatArgs;
export const log = debug.log;
export const selectColor = debug.selectColor;
export const humanize = debug.humanize as any;
export const names = debug.names;
export const skips = debug.skips;
export const formatters = debug.formatters;

export default debug;
