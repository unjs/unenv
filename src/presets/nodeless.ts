import { mapArrToVal } from "./utils.ts";
import { builtinModules } from "../runtime/node/module.ts";
import type { Preset } from "../../lib/index.d.mts";
import { version } from "../../package.json";

const nodeless: Preset & { alias: Map<string, string> } = {
  meta: {
    name: "unenv:nodeless",
    version,
  },

  alias: {
    // Generic mock for built-ins
    ...mapArrToVal("unenv/mock/proxy-cjs", builtinModules),

    // Built-ins implemented by unenv
    "buffer/index.js": "buffer",
    ...Object.fromEntries(
      [
        "assert",
        "assert/strict",
        "async_hooks",
        "buffer",
        "console",
        "child_process",
        "constants",
        "cluster",
        "crypto",
        "dgram",
        "diagnostics_channel",
        "dns",
        "dns/promises",
        "domain",
        "events",
        "fs",
        "fs/promises",
        "http",
        "https",
        "http2",
        "inspector",
        "module",
        "net",
        "os",
        "path",
        "punycode",
        "perf_hooks",
        "process",
        "querystring",
        "readline",
        "readline/promises",
        "stream",
        "stream/promises",
        "stream/consumers",
        "stream/web",
        "string_decoder",
        "trace_events",
        "timers",
        "timers/promises",
        "tls",
        "tty",
        "url",
        "util",
        "util/types",
        "v8",
        "vm",
        "wasi",
        "worker_threads",
        "zlib",
      ].map((m) => [m, `unenv/node/${m}`]),
    ),

    "path/posix": "unenv/node/path",
    "path/win32": "unenv/node/path",
    "inspector/promises": "unenv/node/inspector",

    // The sys module is deprecated and has been renamed util
    // https://github.com/nodejs/node/blob/main/lib/sys.js#L27
    sys: "unenv/node/util",

    // npm
    fsevents: "unenv/npm/fsevents",
    "node-fetch": "unenv/npm/node-fetch",
    "node-fetch-native": "unenv/npm/node-fetch",
    "node-fetch-native/polyfill": "unenv/mock/empty",
    "cross-fetch": "unenv/npm/cross-fetch",
    "cross-fetch/polyfill": "unenv/mock/empty",
    "isomorphic-fetch": "unenv/mock/empty",
    inherits: "unenv/npm/inherits",
  },

  inject: {
    global: "unenv/polyfill/global-this", // no side effects
    process: "unenv/node/process",
    Buffer: ["unenv/node/buffer", "Buffer"],
  },

  polyfill: [],
};

// Add node: aliases
for (const m of builtinModules) {
  nodeless.alias[`node:${m}`] = nodeless.alias[m];
}

export default nodeless;
