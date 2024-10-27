import type { Preset } from "../types";

// Built-in APIs provided by workerd.
// https://developers.cloudflare.com/workers/runtime-apis/nodejs/
// https://github.com/cloudflare/workerd/tree/main/src/node
// Last checked: 2024-10-22
const cloudflareNodeCompatModules = [
  "_stream_duplex",
  "_stream_passthrough",
  "_stream_readable",
  "_stream_transform",
  "_stream_writable",
  "assert",
  "assert/strict",
  "buffer",
  "diagnostics_channel",
  "events",
  "path",
  "path/posix",
  "path/win32",
  "querystring",
  "stream",
  "stream/consumers",
  "stream/promises",
  "stream/web",
  "string_decoder",
  "url",
  "util/types",
  "zlib",
];

// Modules implemented via a mix of workerd APIs and polyfills.
// See `src/runtime/node/<module name>/$cloudflare.ts`.
const hybridNodeCompatModules = [
  "async_hooks",
  "console",
  "crypto",
  "module",
  "process",
  "timers",
  "util",
];

const cloudflarePreset: Preset = {
  alias: {
    ...Object.fromEntries(
      cloudflareNodeCompatModules.flatMap((p) => [
        [p, p],
        [`node:${p}`, `node:${p}`],
      ]),
    ),

    // The `node:sys` module is just a deprecated alias for `node:util`
    // Keep this until util is a full compat module.
    sys: "unenv/runtime/node/util/$cloudflare",
    "node:sys": "unenv/runtime/node/util/$cloudflare",

    // define aliases for hybrid modules
    ...Object.fromEntries(
      hybridNodeCompatModules.flatMap((m) => [
        [m, `unenv/runtime/node/${m}/$cloudflare`],
        [`node:${m}`, `unenv/runtime/node/${m}/$cloudflare`],
      ]),
    ),
  },
  inject: {
    // workerd already defines `global` and `Buffer`
    // override the previous presets so that we use the native implementation
    Buffer: false,
    global: false,
    console: "unenv/runtime/node/console/$cloudflare",
    process: "unenv/runtime/node/process/$cloudflare",
    setImmediate: ["unenv/runtime/node/timers/$cloudflare", "setImmediate"],
    clearImmediate: ["unenv/runtime/node/timers/$cloudflare", "clearImmediate"],
  },
  polyfill: [],
  external: cloudflareNodeCompatModules.flatMap((p) => [p, `node:${p}`]),
};

export default cloudflarePreset;
