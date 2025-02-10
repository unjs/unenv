export const nodeCompatAliases = {
  _http_agent: "unenv/mock/proxy-cjs",
  _http_client: "unenv/mock/proxy-cjs",
  _http_common: "unenv/mock/proxy-cjs",
  _http_incoming: "unenv/mock/proxy-cjs",
  _http_outgoing: "unenv/mock/proxy-cjs",
  _http_server: "unenv/mock/proxy-cjs",
  _stream_duplex: "unenv/mock/proxy-cjs",
  _stream_passthrough: "unenv/mock/proxy-cjs",
  _stream_readable: "unenv/mock/proxy-cjs",
  _stream_transform: "unenv/mock/proxy-cjs",
  _stream_wrap: "unenv/mock/proxy-cjs",
  _stream_writable: "unenv/mock/proxy-cjs",
  _tls_common: "unenv/mock/proxy-cjs",
  _tls_wrap: "unenv/mock/proxy-cjs",
  assert: "unenv/node/assert",
  "assert/strict": "unenv/node/assert/strict",
  async_hooks: "unenv/node/async_hooks",
  buffer: "unenv/node/buffer",
  child_process: "unenv/node/child_process",
  cluster: "unenv/node/cluster",
  console: "unenv/node/console",
  constants: "unenv/node/constants",
  crypto: "unenv/node/crypto",
  dgram: "unenv/node/dgram",
  diagnostics_channel: "unenv/node/diagnostics_channel",
  dns: "unenv/node/dns",
  "dns/promises": "unenv/node/dns/promises",
  domain: "unenv/node/domain",
  events: "unenv/node/events",
  fs: "unenv/node/fs",
  "fs/promises": "unenv/node/fs/promises",
  http: "unenv/node/http",
  http2: "unenv/node/http2",
  https: "unenv/node/https",
  inspector: "unenv/node/inspector",
  "inspector/promises": "unenv/node/inspector/promises",
  module: "unenv/node/module",
  net: "unenv/node/net",
  os: "unenv/node/os",
  path: "unenv/node/path",
  "path/posix": "unenv/node/path",
  "path/win32": "unenv/node/path",
  perf_hooks: "unenv/node/perf_hooks",
  process: "unenv/node/process",
  punycode: "unenv/node/punycode",
  querystring: "unenv/node/querystring",
  readline: "unenv/node/readline",
  "readline/promises": "unenv/node/readline/promises",
  repl: "unenv/node/repl",
  stream: "unenv/node/stream",
  "stream/consumers": "unenv/node/stream/consumers",
  "stream/promises": "unenv/node/stream/promises",
  "stream/web": "unenv/node/stream/web",
  string_decoder: "unenv/node/string_decoder",
  sys: "unenv/node/util",
  timers: "unenv/node/timers",
  "timers/promises": "unenv/node/timers/promises",
  tls: "unenv/node/tls",
  trace_events: "unenv/node/trace_events",
  tty: "unenv/node/tty",
  url: "unenv/node/url",
  util: "unenv/node/util",
  "util/types": "unenv/node/util/types",
  v8: "unenv/node/v8",
  vm: "unenv/node/vm",
  wasi: "unenv/node/wasi",
  worker_threads: "unenv/node/worker_threads",
  zlib: "unenv/node/zlib",
} as const;

export const npmCompatAliases = {
  fsevents: "unenv/npm/fsevents",
  "node-fetch": "unenv/npm/node-fetch",
  "node-fetch-native": "unenv/npm/node-fetch",
  "node-fetch-native/polyfill": "unenv/mock/empty",
  "cross-fetch": "unenv/npm/cross-fetch",
  "cross-fetch/polyfill": "unenv/mock/empty",
  "isomorphic-fetch": "unenv/mock/empty",
  inherits: "unenv/npm/inherits",
} as const;

export const nodeCompatInjects = {
  global: "unenv/polyfill/globalthis",
  process: "unenv/node/process",
  Buffer: ["unenv/node/buffer", "Buffer"],
} as const;
