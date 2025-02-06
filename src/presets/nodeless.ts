import { NodeBuiltinModules, mapArrToVal } from "../utils.ts";
import type { Preset } from "../types.ts";
import { version } from "../../package.json";

const nodeless: Preset & { alias: Map<string, string> } = {
  meta: {
    name: "unenv:nodeless",
    version,
  },

  alias: {
    // Generic mock for built-ins
    ...mapArrToVal("unenv/runtime/mock/proxy-cjs", NodeBuiltinModules),

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
      ].map((m) => [m, `unenv/runtime/node/${m}`]),
    ),

    "path/posix": "unenv/runtime/node/path",
    "path/win32": "unenv/runtime/node/path",
    "inspector/promises": "unenv/runtime/node/inspector",

    // The sys module is deprecated and has been renamed util
    // https://github.com/nodejs/node/blob/main/lib/sys.js#L27
    sys: "unenv/runtime/node/util",

    // npm
    fsevents: "unenv/runtime/npm/fsevents",
    "node-fetch": "unenv/runtime/npm/node-fetch",
    "node-fetch-native": "unenv/runtime/npm/node-fetch",
    "node-fetch-native/polyfill": "unenv/runtime/mock/empty",
    "cross-fetch": "unenv/runtime/npm/cross-fetch",
    "cross-fetch/polyfill": "unenv/runtime/mock/empty",
    "isomorphic-fetch": "unenv/runtime/mock/empty",
    inherits: "unenv/runtime/npm/inherits",
  },

  inject: {
    global: "unenv/runtime/node/_global",
    process: "unenv/runtime/node/process",
    Buffer: ["unenv/runtime/node/buffer", "Buffer"],
    performance: "unenv/runtime/polyfill/performance",
  },

  polyfill: [
    "unenv/runtime/polyfill/node-global",
    "unenv/runtime/polyfill/process",
    "unenv/runtime/polyfill/performance",
  ],
};

// Add node: aliases
for (const m of NodeBuiltinModules) {
  nodeless.alias[`node:${m}`] = nodeless.alias[m];
}

export default nodeless;
