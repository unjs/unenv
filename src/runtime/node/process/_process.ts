// Source: https://github.com/defunctzombie/node-process/blob/77caa43cdaee4ea710aa14d11cea1705293c0ef3/browser.js

import mock from "../../mock/proxy";
import empty from "../../mock/empty";
import { notImplemented } from "../../_internal/utils";
import { env } from "./_env";
import { hrtime, nextTick } from "./_time";

type Process = NodeJS.Process;

const title: Process["title"] = "unenv";
const argv: Process["argv"] = [];
const version: Process["version"] = ""; // empty string to avoid regexp issues
const versions: Process["versions"] = {
  ares: "",
  http_parser: "",
  icu: "",
  modules: "",
  node: "",
  openssl: "",
  uv: "",
  v8: "",
  zlib: "",
};

function noop() {
  return process;
}
const on: Process["on"] = noop;
const addListener: Process["addListener"] = noop;
const once: Process["once"] = noop;
const off: Process["off"] = noop;
const removeListener: Process["removeListener"] = noop;
const removeAllListeners: Process["removeAllListeners"] = noop;
const emit: Process["emit"] = function emit(event) {
  if (event === "message" || event === "multipleResolves") {
    return process;
  }
  return false;
} as Process["emit"];
const prependListener: Process["prependListener"] = noop;
const prependOnceListener: Process["prependOnceListener"] = noop;

const listeners: Process["listeners"] = function (name) {
  return [];
};
const listenerCount: Process["listenerCount"] = () => 0;

// @ts-ignore
const binding: Process["binding"] = function (name) {
  throw new Error("[unenv] process.binding is not supported");
};

let _cwd = "/";
const cwd: Process["cwd"] = function cwd() {
  return _cwd;
};
const chdir: Process["chdir"] = function chdir(dir) {
  _cwd = dir;
};
const umask: Process["umask"] = function umask() {
  return 0;
};

const getegid: Process["getegid"] = function getegid() {
  return 1000;
};

const geteuid: Process["geteuid"] = function geteuid() {
  return 1000;
};

const getgid: Process["getgid"] = function getgid() {
  return 1000;
};

const getuid: Process["getuid"] = function getuid() {
  return 1000;
};

const getgroups: Process["getgroups"] = function getgroups() {
  return [];
};

// ---- Unimplemented utils ----

const abort: Process["abort"] = notImplemented<never>("process.abort");
const allowedNodeEnvironmentFlags: Process["allowedNodeEnvironmentFlags"] =
  new Set();
const arch: Process["arch"] = "" as any;
const argv0: Process["argv0"] = "";
const config: Process["config"] = empty;
const connected: Process["connected"] = false;
const constrainedMemory: Process["constrainedMemory"] = () => undefined;
const cpuUsage: Process["cpuUsage"] = notImplemented("process.cpuUsage");
const debugPort: Process["debugPort"] = 0;
const dlopen: Process["dlopen"] = notImplemented("process.dlopen");
const disconnect: Process["disconnect"] = noop;
const emitWarning: Process["emitWarning"] = noop;
const eventNames: Process["eventNames"] = notImplemented("process.eventNames");
const execArgv: Process["execArgv"] = [];
const execPath: Process["execPath"] = "";
const exit: Process["exit"] = notImplemented("process.exit");
const features: Process["features"] = Object.create({
  inspector: undefined,
  debug: undefined,
  uv: undefined,
  ipv6: undefined,
  tls_alpn: undefined,
  tls_sni: undefined,
  tls_ocsp: undefined,
  tls: undefined,
  cached_builtins: undefined,
});
const getActiveResourcesInfo: Process["getActiveResourcesInfo"] = () => [];
const getMaxListeners: Process["getMaxListeners"] = notImplemented(
  "process.getMaxListeners",
);
const kill: Process["kill"] = notImplemented("process.kill");

const memoryUsage: Process["memoryUsage"] = Object.assign(
  () => ({
    arrayBuffers: 0,
    rss: 0,
    external: 0,
    heapTotal: 0,
    heapUsed: 0,
  }),
  { rss: () => 0 },
);

const pid: Process["pid"] = 1000;
const platform: Process["platform"] = "" as any;
const ppid: Process["ppid"] = 1000;
const rawListeners: Process["rawListeners"] = notImplemented(
  "process.rawListeners",
);
const release: Process["release"] = Object.create({
  name: "",
  lts: "",
  sourceUrl: undefined,
  headersUrl: undefined,
});
const report: Exclude<Process["report"], undefined> = Object.create({
  compact: undefined,
  directory: undefined,
  filename: undefined,
  getReport: notImplemented("process.report.getReport"),
  reportOnFatalError: undefined,
  reportOnSignal: undefined,
  reportOnUncaughtException: undefined,
  signal: undefined,
  writeReport: notImplemented("process.report.writeReport"),
});
const resourceUsage: Process["resourceUsage"] = notImplemented(
  "process.resourceUsage",
);
const setegid: Process["setegid"] = notImplemented("process.setegid");
const seteuid: Process["seteuid"] = notImplemented("process.seteuid");
const setgid: Process["setgid"] = notImplemented("process.setgid");
const setgroups: Process["setgroups"] = notImplemented("process.setgroups");
const setuid: Process["setuid"] = notImplemented("process.setuid");
const setMaxListeners: Process["setMaxListeners"] = notImplemented(
  "process.setMaxListeners",
);
const setSourceMapsEnabled: Process["setSourceMapsEnabled"] = notImplemented(
  "process.setSourceMapsEnabled",
);
const stdout: Process["stdout"] = mock.__createMock__("process.stdout");
const stderr: Process["stderr"] = mock.__createMock__("process.stderr");
const stdin: Process["stdin"] = mock.__createMock__("process.stdin");
const traceDeprecation: Process["traceDeprecation"] = false;
const uptime: Process["uptime"] = () => 0;
const exitCode: Process["exitCode"] = 0;
const setUncaughtExceptionCaptureCallback: Process["setUncaughtExceptionCaptureCallback"] =
  notImplemented("process.setUncaughtExceptionCaptureCallback");
const hasUncaughtExceptionCaptureCallback: Process["hasUncaughtExceptionCaptureCallback"] =
  () => false;
const sourceMapsEnabled: Process["sourceMapsEnabled"] = false;
const loadEnvFile: Process["loadEnvFile"] = notImplemented(
  "process.loadEnvFile",
);
const mainModule: Process["mainModule"] = undefined;
const permission: Process["permission"] = {
  has: () => false,
};
const channel: Process["channel"] = {
  ref() {},
  unref() {},
};
const throwDeprecation: Process["throwDeprecation"] = false;

// --- Undocumented internals ---

const assert = notImplemented("process.assert");
const openStdin = notImplemented("process.openStdin");

const _debugEnd = notImplemented("process._debugEnd");
const _debugProcess = notImplemented("process._debugProcess");
const _eventsCount = 0;
const _fatalException = notImplemented("process._fatalException");
const _getActiveHandles = notImplemented("process._getActiveHandles");
const _getActiveRequests = notImplemented("process._getActiveRequests");
const _kill = notImplemented("process._kill");
const _preload_modules: string[] = [];
const _rawDebug = notImplemented("process._rawDebug");
const _startProfilerIdleNotifier = notImplemented(
  "process._startProfilerIdleNotifier",
);
const _stopProfilerIdleNotifier = notImplemented(
  "process.__stopProfilerIdleNotifier",
);
const _tickCallback = notImplemented("process._tickCallback");

export const process: Process & Record<string, any> = {
  _debugEnd,
  _debugProcess,
  _eventsCount,
  _fatalException,
  _getActiveHandles,
  _getActiveRequests,
  _kill,
  _preload_modules,
  _rawDebug,
  _startProfilerIdleNotifier,
  _stopProfilerIdleNotifier,
  _tickCallback,
  exitCode,
  abort,
  addListener,
  allowedNodeEnvironmentFlags,
  hasUncaughtExceptionCaptureCallback,
  setUncaughtExceptionCaptureCallback,
  loadEnvFile,
  sourceMapsEnabled,
  throwDeprecation,
  mainModule,
  permission,
  channel,
  arch,
  argv,
  argv0,
  assert,
  binding,
  chdir,
  config,
  connected,
  constrainedMemory,
  cpuUsage,
  cwd,
  debugPort,
  dlopen,
  disconnect,
  emit,
  emitWarning,
  env,
  eventNames,
  execArgv,
  execPath,
  exit,
  features,
  getegid,
  geteuid,
  getgid,
  getgroups,
  getuid,
  getActiveResourcesInfo,
  getMaxListeners,
  hrtime,
  kill,
  listeners,
  listenerCount,
  memoryUsage,
  nextTick,
  on,
  off,
  once,
  openStdin,
  pid,
  platform,
  ppid,
  prependListener,
  prependOnceListener,
  rawListeners,
  release,
  removeAllListeners,
  removeListener,
  report,
  resourceUsage,
  setegid,
  seteuid,
  setgid,
  setgroups,
  setuid,
  setMaxListeners,
  setSourceMapsEnabled,
  stderr,
  stdin,
  stdout,
  title,
  traceDeprecation,
  umask,
  uptime,
  version,
  versions,
};
