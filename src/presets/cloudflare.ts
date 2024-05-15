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
  "async_hooks",
  "buffer",
  "crypto",
  "diagnostics_channel",
  "events",
  "path",
  "process",
  "stream",
  "stream/consumers",
  "stream/promises",
  "stream/web",
  "string_decoder",
  "util",
];

const cloudflarePreset: Preset = {
  alias: {
    ...Object.fromEntries(
      cloudflareNodeCompatModules.map((p) => [p, `node:${p}`]),
    ),
    ...Object.fromEntries(
      cloudflareNodeCompatModules.map((p) => [`node:${p}`, `node:${p}`]),
    ),
  },
  inject: {},
  polyfill: ["unenv/runtime/polyfill/cloudflare"],
  external: cloudflareNodeCompatModules.map((p) => `node:${p}`),
};

export default cloudflarePreset;
