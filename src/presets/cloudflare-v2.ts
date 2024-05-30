import type { Preset } from "../types";

/**
 * This is an experimental v2 preset that provides hybrid polyfills (https://github.com/unjs/unenv/issues/181).
 *
 * This present depends requires several dependencies to function:
 * - workerd@^1.20240529.0
 * - unreleased wrangler@https://prerelease-registry.devprod.cloudflare.dev/workers-sdk/runs/9183658807/npm-package-wrangler-5878
 * - "nodejs_compat_v2" runtime flag in workerd
 * - "experimental" flag for miniflare/workerd
 */

// https://developers.cloudflare.com/workers/runtime-apis/nodejs/
// https://github.com/cloudflare/workerd/tree/main/src/node
// Last checked: 2024-05-30
const cloudflareNodeCompatModules = [
  "_stream_duplex",
  "_stream_passthrough",
  "_stream_readable",
  "_stream_transform",
  "_stream_writable",
  "assert",
  "async_hooks",
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

const hybridNodeCompatModules = ["buffer"];

const cloudflareV2Preset: Preset = {
  alias: {
    ...Object.fromEntries(cloudflareNodeCompatModules.map((p) => [p, p])),
    ...Object.fromEntries(
      cloudflareNodeCompatModules.map((p) => [`node:${p}`, `node:${p}`]),
    ),
    // The `node:assert` implementation of workerd uses strict semantics by default
    "assert/strict": "node:assert",
    "node:assert/strict": "node:assert",

    // define aliases for hybrid modules
    ...Object.fromEntries(
      hybridNodeCompatModules.map((m) => [
        m,
        `unenv/runtime/node/${m}/cloudflare`,
      ]),
    ),
    ...Object.fromEntries(
      hybridNodeCompatModules.map((m) => [
        `node:${m}`,
        `unenv/runtime/node/${m}/cloudflare`,
      ]),
    ),
  },
  inject: {
    //TODO: ensure that we don't inherit the implementation from nodeless
  },
  polyfill: [
    //TODO: ensure that we don't inherit the implementation from nodeless
  ],
  external: [
    ...cloudflareNodeCompatModules.map((p) => `${p}`),
    ...cloudflareNodeCompatModules.map((p) => `node:${p}`),
  ],
};

export default cloudflareV2Preset;
