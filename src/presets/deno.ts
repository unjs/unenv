import type { Preset } from "../types";
import nodeless from "./nodeless";

// https://docs.deno.com/runtime/manual/node/compatibility
// https://docs.deno.com/deploy/api/runtime-node
export const denoNodeCompatModules = [
  "assert",
  "assert/strict",
  "async_hooks",
  "buffer",
  "child_process",
  "cluster",
  "console",
  "constants",
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
  "http2",
  "https",
  "module",
  "net",
  "os",
  "path",
  "path/posix",
  "path/win32",
  "perf_hooks",
  "process",
  "punycode",
  "querystring",
  "readline",
  "stream",
  "stream/consumers",
  "stream/promises",
  "stream/web",
  "string_decoder",
  "sys",
  "timers",
  "timers/promises",
  "tls",
  "tty",
  "url",
  "util",
  "util/types",
  "v8",
  "vm",
  "worker_threads",
  "zlib",
];

const denoPreset: Preset = {
  alias: {
    ...nodeless.alias,
    ...Object.fromEntries(denoNodeCompatModules.map((p) => [p, `node:${p}`])),
    ...Object.fromEntries(
      denoNodeCompatModules.map((p) => [`node:${p}`, `node:${p}`]),
    ),
  },
  inject: {
    ...nodeless.inject,
  },
  polyfill: [...(nodeless.polyfill as string[])],
};

export default denoPreset;
