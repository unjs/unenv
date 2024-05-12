import type { Preset } from "../types";

// https://developers.cloudflare.com/workers/runtime-apis/nodejs/
// Last checked: 2023-12-14
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
  polyfill: [],
  external: cloudflareNodeCompatModules.map((p) => `node:${p}`),
};

export default cloudflarePreset;
