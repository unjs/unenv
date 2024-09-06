import type { Preset } from "../types";

// https://developers.cloudflare.com/workers/runtime-apis/nodejs/
// https://github.com/cloudflare/workerd/tree/main/src/node
// Last checked: 2024-05-11
const cloudflareNodeCompatModules = [
  "_stream_duplex",
  "_stream_passthrough",
  "_stream_readable",
  "_stream_transform",
  "_stream_writable",
  "assert",
  "diagnostics_channel",
  "events",
  "path",
  "process",
  "stream",
  "stream/consumers",
  "stream/promises",
  "stream/web",
  "string_decoder",
];

const hybridNodeCompatModules = [
  "async_hooks",
  "console",
  "buffer",
  "crypto",
  "module",
  "process",
  "timers",
  "util",
  "util/types",
];

const cloudflarePreset: Preset = {
  alias: {
    ...Object.fromEntries(cloudflareNodeCompatModules.map((p) => [p, p])),
    ...Object.fromEntries(
      cloudflareNodeCompatModules.map((p) => [`node:${p}`, `node:${p}`]),
    ),
    // The `node:assert` implementation of workerd uses strict semantics by default
    "assert/strict": "node:assert",
    "node:assert/strict": "node:assert",
    // The `node:sys` module is just a deprecated alias for `node:util` which we implemented using a hybrid polyfill
    sys: "unenv/runtime/node/util/$cloudflare",
    "node:sys": "unenv/runtime/node/util/$cloudflare",

    // define aliases for hybrid modules
    ...Object.fromEntries(
      hybridNodeCompatModules.map((m) => [
        m,
        `unenv/runtime/node/${m}/$cloudflare`,
      ]),
    ),
    ...Object.fromEntries(
      hybridNodeCompatModules.map((m) => [
        `node:${m}`,
        `unenv/runtime/node/${m}/$cloudflare`,
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
  },
  polyfill: [],
  external: [
    ...cloudflareNodeCompatModules.map((p) => `${p}`),
    ...cloudflareNodeCompatModules.map((p) => `node:${p}`),
  ],
};

export default cloudflarePreset;
