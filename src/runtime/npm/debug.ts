// https://www.npmjs.com/package/debug

import type { Debug, Debugger, Formatters } from "debug";

// Cache the compiled patterns keyed on the DEBUG env value so we don't reparse
// per log line. The cache is a single slot — DEBUG flips rarely at runtime and
// strict equality on the env string is enough to invalidate when it does.
let cachedEnv: string | undefined;
let cachedPatterns: { names: RegExp[]; skips: RegExp[] } | undefined;

function compileDebugEnv(
  env: string | undefined,
): { names: RegExp[]; skips: RegExp[] } | undefined {
  if (env === cachedEnv) return cachedPatterns;
  cachedEnv = env;
  if (!env) {
    cachedPatterns = undefined;
    return undefined;
  }

  // The `debug` package splits DEBUG on `,` and whitespace, then treats a
  // leading `-` as a negation. Each token is glob-style — `*` matches anything.
  // Escape regex metacharacters first, then promote `*` to `.*` so wildcards
  // like `worker:*` work, and anchor with `^…$` so e.g. `worker:abc` doesn't
  // get matched by a pattern intended only for `worker`.
  const names: RegExp[] = [];
  const skips: RegExp[] = [];
  for (const raw of env.split(/[\s,]+/)) {
    if (!raw) continue;
    const negated = raw.startsWith("-");
    const pattern = negated ? raw.slice(1) : raw;
    if (!pattern) continue;
    const escaped = pattern
      .replace(/[\\^$.+?()|[\]{}]/g, String.raw`\$&`)
      .replace(/\*/g, ".*");
    const re = new RegExp(`^${escaped}$`);
    (negated ? skips : names).push(re);
  }
  cachedPatterns = { names, skips };
  return cachedPatterns;
}

function isNamespaceEnabled(
  namespace: string,
  env: string | undefined,
): boolean {
  const patterns = compileDebugEnv(env);
  if (!patterns) return false;
  for (const skip of patterns.skips) {
    if (skip.test(namespace)) return false;
  }
  for (const name of patterns.names) {
    if (name.test(namespace)) return true;
  }
  return false;
}

function createDebug(namespace: string): Debugger {
  return Object.assign(
    (...args: any[]) => {
      if (!isNamespaceEnabled(namespace, globalThis.process?.env.DEBUG)) {
        return;
      }
      console.debug(...args);
    },
    {
      color: "#000000",
      diff: 0,
      enabled: true,
      log: console.debug.bind(console),
      namespace,
      destroy: () => false,
      // The upstream `debug` package joins extended namespaces with a
      // delimiter (`:` by default), so `createDebug("app").extend("worker")`
      // yields `app:worker`, not `appworker`. Honour the caller-supplied
      // delimiter when provided.
      extend: (ns: string, delimiter: string = ":") =>
        createDebug(`${namespace}${delimiter}${ns}`),
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
