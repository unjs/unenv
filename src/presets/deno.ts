import type { Preset } from "../types";

// https://docs.deno.com/runtime/manual/node/compatibility
// https://docs.deno.com/deploy/api/runtime-node
// Last checked: 2023-12-13
const denoNodeCompatModules = [
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
    ...Object.fromEntries(denoNodeCompatModules.map((p) => [p, `node:${p}`])),
    ...Object.fromEntries(
      denoNodeCompatModules.map((p) => [`node:${p}`, `node:${p}`]),
    ),
  },
  // Deno's listed globals manually tested against deno@1.38.5
  // TODO: missing BroadcastChannel, PerformanceObserverEntryList, PerformanceResourceTiming
  // TODO: global and process
  inject: {
    setImmediate: "node:timers",
    clearImmediate: "node:timers",
    Buffer: "node:buffer",
    PerformanceObserver: "node:perf_hooks",
  },
  polyfill: ["unenv/runtime/polyfill/global"],
  external: denoNodeCompatModules.map((p) => `node:${p}`),
};

export default denoPreset;
