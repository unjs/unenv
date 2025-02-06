// Source: https://github.com/defunctzombie/node-process/blob/77caa43cdaee4ea710aa14d11cea1705293c0ef3/browser.js
import type nodeProcess from "node:process";
import { ReadStream, WriteStream } from "node:tty";
import empty from "../../../mock/empty.ts";
import { notImplemented } from "../../../_internal/utils.ts";
import { env } from "./env.ts";
import { hrtime, nextTick } from "./time.ts";

export { hrtime, nextTick } from "./time.ts";

export { env } from "./env.ts";

type Process = NodeJS.Process;

export const title: Process["title"] = "unenv";
export const argv: Process["argv"] = [];
export const version: Process["version"] = ""; // empty string to avoid regexp issues
export const versions: Process["versions"] = {
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

function noop(): Process {
  return process as unknown as Process;
}

export const on: Process["on"] = noop;

export const addListener: Process["addListener"] = noop;

export const once: Process["once"] = noop;

export const off: Process["off"] = noop;

export const removeListener: Process["removeListener"] = noop;

export const removeAllListeners: Process["removeAllListeners"] = noop;

export const emit: Process["emit"] = function emit(event) {
  if (event === "message" || event === "multipleResolves") {
    return process;
  }
  return false;
} as Process["emit"];

export const prependListener: Process["prependListener"] = noop;

export const prependOnceListener: Process["prependOnceListener"] = noop;

export const listeners: Process["listeners"] = function (name) {
  return [];
};
export const listenerCount: Process["listenerCount"] = () => 0;

// @ts-ignore
export const binding: Process["binding"] = function (name) {
  throw new Error("[unenv] process.binding is not supported");
};

let _cwd = "/";
export const cwd: Process["cwd"] = function cwd() {
  return _cwd;
};
export const chdir: Process["chdir"] = function chdir(dir) {
  _cwd = dir;
};
export const umask: Process["umask"] = function umask() {
  return 0;
};

export const getegid: Process["getegid"] = function getegid() {
  return 1000;
};

export const geteuid: Process["geteuid"] = function geteuid() {
  return 1000;
};

export const getgid: Process["getgid"] = function getgid() {
  return 1000;
};

export const getuid: Process["getuid"] = function getuid() {
  return 1000;
};

export const getgroups: Process["getgroups"] = function getgroups() {
  return [];
};

export const getBuiltinModule = (_name: string) => undefined;

// ---- Unimplemented utils ----

export const abort = notImplemented<Process["abort"]>("process.abort");

export const allowedNodeEnvironmentFlags: Process["allowedNodeEnvironmentFlags"] =
  new Set();

export const arch: Process["arch"] = "" as any;
export const argv0: Process["argv0"] = "";
export const config: Process["config"] = empty;
const connected: Process["connected"] = false;
export const constrainedMemory: Process["constrainedMemory"] = () => 0;
export const availableMemory: Process["availableMemory"] = () => 0;
export const cpuUsage = notImplemented<Process["cpuUsage"]>("process.cpuUsage");
export const debugPort: Process["debugPort"] = 0;
export const dlopen = notImplemented<Process["dlopen"]>("process.dlopen");
const disconnect: Process["disconnect"] = noop;
export const emitWarning: Process["emitWarning"] = noop;
export const eventNames =
  notImplemented<Process["eventNames"]>("process.eventNames");
export const execArgv: Process["execArgv"] = [];
export const execPath: Process["execPath"] = "";
export const exit = notImplemented<Process["exit"]>("process.exit");
export const features: Process["features"] = Object.create({
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
export const getActiveResourcesInfo: Process["getActiveResourcesInfo"] =
  () => [];
export const getMaxListeners = notImplemented<Process["getMaxListeners"]>(
  "process.getMaxListeners",
);
export const kill = notImplemented<Process["kill"]>("process.kill");

export const memoryUsage: Process["memoryUsage"] = Object.assign(
  () => ({
    arrayBuffers: 0,
    rss: 0,
    external: 0,
    heapTotal: 0,
    heapUsed: 0,
  }),
  { rss: () => 0 },
);

export const pid: Process["pid"] = 1000;
export const platform: Process["platform"] = "" as any;
export const ppid: Process["ppid"] = 1000;
export const rawListeners = notImplemented<Process["rawListeners"]>(
  "process.rawListeners",
);
export const release: Process["release"] = Object.create({
  name: "",
  lts: "",
  sourceUrl: undefined,
  headersUrl: undefined,
});
export const report: Exclude<Process["report"], undefined> = Object.create({
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
export const resourceUsage = notImplemented<Process["resourceUsage"]>(
  "process.resourceUsage",
);
export const setegid =
  notImplemented<Exclude<Process["setegid"], undefined>>("process.setegid");
export const seteuid =
  notImplemented<Exclude<Process["seteuid"], undefined>>("process.seteuid");
export const setgid =
  notImplemented<Exclude<Process["setgid"], undefined>>("process.setgid");
export const setgroups =
  notImplemented<Exclude<Process["setgroups"], undefined>>("process.setgroups");
export const setuid =
  notImplemented<Exclude<Process["setuid"], undefined>>("process.setuid");
export const setMaxListeners = notImplemented<Process["setMaxListeners"]>(
  "process.setMaxListeners",
);
export const setSourceMapsEnabled = notImplemented<
  Process["setSourceMapsEnabled"]
>("process.setSourceMapsEnabled");
export const stdin = new ReadStream(0) as Process["stdin"];
export const stdout = new WriteStream(1) as Process["stdout"];
export const stderr = new WriteStream(2) as Process["stderr"];
const traceDeprecation: Process["traceDeprecation"] = false;
export const uptime: Process["uptime"] = () => 0;
export const exitCode: Process["exitCode"] = 0;
export const setUncaughtExceptionCaptureCallback = notImplemented<
  Process["setUncaughtExceptionCaptureCallback"]
>("process.setUncaughtExceptionCaptureCallback");
export const hasUncaughtExceptionCaptureCallback: Process["hasUncaughtExceptionCaptureCallback"] =
  () => false;
export const sourceMapsEnabled: Process["sourceMapsEnabled"] = false;
export const loadEnvFile = notImplemented<Process["loadEnvFile"]>(
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

export const finalization: Process["finalization"] = {
  register() {},
  unregister() {},
  registerBeforeExit() {},
};

// --- Undocumented internals ---

export const assert = notImplemented("process.assert");
export const openStdin = notImplemented("process.openStdin");
export const _debugEnd = notImplemented("process._debugEnd");
export const _debugProcess = notImplemented("process._debugProcess");
export const _fatalException = notImplemented("process._fatalException");
export const _getActiveHandles = notImplemented("process._getActiveHandles");
export const _getActiveRequests = notImplemented("process._getActiveRequests");
export const _kill = notImplemented("process._kill");
export const _preload_modules: string[] = [];
export const _rawDebug = notImplemented("process._rawDebug");
export const _startProfilerIdleNotifier = notImplemented(
  "process._startProfilerIdleNotifier",
);
export const _stopProfilerIdleNotifier = notImplemented(
  "process.__stopProfilerIdleNotifier",
);
export const _tickCallback = notImplemented("process._tickCallback");
export const _linkedBinding = notImplemented("process._linkedBinding");

// Mocking domain causes troubles, see unjs/unenv#367
export const domain = undefined;
export const initgroups = notImplemented("process.initgroups");
export const moduleLoadList = [] as string[];
export const reallyExit = noop;

export const _exiting = false;
export const _events = [];
export const _eventsCount = 0;
export const _maxListeners = 0;

export const process = {
  // @ts-expect-error
  _events,
  _eventsCount,
  _exiting,
  _maxListeners,
  _debugEnd,
  _debugProcess,
  _fatalException,
  _getActiveHandles,
  _getActiveRequests,
  _kill,
  _preload_modules,
  _rawDebug,
  _startProfilerIdleNotifier,
  _stopProfilerIdleNotifier,
  _tickCallback,
  domain,
  initgroups,
  moduleLoadList,
  reallyExit,
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
  availableMemory,
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
  finalization,
  features,
  getBuiltinModule,
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
} satisfies typeof nodeProcess;
