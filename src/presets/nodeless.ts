import { NodeBuiltinModules, mapArrToVal } from "../utils";
import type { Preset } from "../types";

const nodeless: Preset & { alias: Map<string, string> } = {
  alias: {
    // Generic mock for built-ins
    ...mapArrToVal("unenv/runtime/mock/proxy-cjs", NodeBuiltinModules),

    // Built-ins implemented by unenv
    "buffer/index.js": "buffer",
    ...Object.fromEntries(
      [
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
        "net",
        "os",
        "path",
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
        "tls",
        "tty",
        "url",
        "util",
        "util/types",
        "v8",
        "wasi",
      ].map((m) => [m, `unenv/runtime/node/${m}/index`]),
    ),

    "path/posix": "unenv/runtime/node/path/index",
    "path/win32": "unenv/runtime/node/path/index",
    "inspector/promises": "unenv/runtime/node/inspector/index",

    // The sys module is deprecated and has been renamed util
    // https://github.com/nodejs/node/blob/main/lib/sys.js#L27
    sys: "unenv/runtime/node/inspector/util",

    // npm
    etag: "unenv/runtime/mock/noop",
    "mime-db": "unenv/runtime/npm/mime-db",
    mime: "unenv/runtime/npm/mime",
    "mime/lite": "unenv/runtime/npm/mime",
    _mime: "mime/lite.js",
    fsevents: "unenv/runtime/npm/fsevents",
    "consola/core": "consola/core",
    "node-fetch": "unenv/runtime/npm/node-fetch",
    "node-fetch-native": "unenv/runtime/npm/node-fetch",
    "node-fetch-native/polyfill": "unenv/runtime/mock/empty",
    "cross-fetch": "unenv/runtime/npm/cross-fetch",
    "cross-fetch/polyfill": "unenv/runtime/mock/empty",
    "isomorphic-fetch": "unenv/runtime/mock/empty",
    inherits: "unenv/runtime/npm/inherits",
  },

  inject: {
    global: "unenv/runtime/node/global",
    process: "unenv/runtime/polyfill/process",
    Buffer: ["buffer", "Buffer"],
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
