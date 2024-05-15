// @ts-nocheck
// Source: https://github.com/defunctzombie/node-process/blob/77caa43cdaee4ea710aa14d11cea1705293c0ef3/browser.js

import mock from "../../mock/proxy";
import empty from "../../mock/empty";
import { notImplemented } from "src/runtime/_internal/utils";

// Cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.
let cachedSetTimeout: typeof globalThis.setTimeout;
let cachedClearTimeout: typeof global.clearTimeout;

function defaultSetTimeout() {
  throw new Error("setTimeout has not been defined");
}

function defaultClearTimeout() {
  throw new Error("clearTimeout has not been defined");
}

(function () {
  try {
    cachedSetTimeout =
      typeof setTimeout === "function" ? setTimeout : defaultSetTimeout;
  } catch {
    cachedSetTimeout = defaultSetTimeout;
  }
  try {
    cachedClearTimeout =
      typeof clearTimeout === "function" ? clearTimeout : defaultClearTimeout;
  } catch {
    cachedClearTimeout = defaultClearTimeout;
  }
})();

function runTimeout(fun: () => void) {
  if (cachedSetTimeout === setTimeout) {
    // normal enviroments in sane situations
    return setTimeout(fun, 0);
  }
  // if setTimeout wasn't available but was latter defined
  if (
    (cachedSetTimeout === defaultSetTimeout || !cachedSetTimeout) &&
    setTimeout
  ) {
    cachedSetTimeout = setTimeout;
    return setTimeout(fun, 0);
  }
  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedSetTimeout(fun, 0);
  } catch {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally

      return cachedSetTimeout.call(null, fun, 0);
    } catch {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
      return cachedSetTimeout.call(this, fun, 0);
    }
  }
}

function runClearTimeout(marker) {
  if (cachedClearTimeout === clearTimeout) {
    // normal enviroments in sane situations
    return clearTimeout(marker);
  }
  // if clearTimeout wasn't available but was latter defined
  if (
    (cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) &&
    clearTimeout
  ) {
    cachedClearTimeout = clearTimeout;
    return clearTimeout(marker);
  }
  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedClearTimeout(marker);
  } catch {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally

      return cachedClearTimeout.call(null, marker);
    } catch {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
      // Some versions of I.E. have different rules for clearTimeout vs setTimeout
      return cachedClearTimeout.call(this, marker);
    }
  }
}

let queue = [];
let draining = false;
let currentQueue;
let queueIndex = -1;

function cleanUpNextTick() {
  if (!draining || !currentQueue) {
    return;
  }
  draining = false;
  if (currentQueue.length > 0) {
    queue = [...currentQueue, ...queue];
  } else {
    queueIndex = -1;
  }
  if (queue.length > 0) {
    drainQueue();
  }
}

function drainQueue() {
  if (draining) {
    return;
  }
  const timeout = runTimeout(cleanUpNextTick);
  draining = true;

  let len = queue.length;
  while (len) {
    currentQueue = queue;
    queue = [];
    while (++queueIndex < len) {
      if (currentQueue) {
        currentQueue[queueIndex].run();
      }
    }
    queueIndex = -1;
    len = queue.length;
  }
  currentQueue = null;
  draining = false;
  runClearTimeout(timeout);
}

// TODO: Drop legacy support in next major version
function _nextTickLegacy() {
  const args = Array.from({ length: arguments.length - 1 });
  if (arguments.length > 1) {
    for (let i = 1; i < arguments.length; i++) {
      args[i - 1] = arguments[i];
    }
  }
  queue.push(new Item(fun, args));
  if (queue.length === 1 && !draining) {
    runTimeout(drainQueue);
  }
}

function _nextTick() {
  // https://nodejs.org/api/process.html#when-to-use-queuemicrotask-vs-processnexttick
  globalThis.queueMicrotask(() => {
    cb(...args);
  });
}

const nextTick = globalThis.queueMicrotask ? _nextTick : _nextTickLegacy;

// v8 likes predictible objects
function Item(fun, array) {
  this.fun = fun;
  this.array = array;
}
Item.prototype.run = function () {
  this.fun.apply(null, this.array);
};
const title = "unenv";

const _envShim = Object.create(null);
const _processEnv = globalThis.process?.env;
const _getEnv = (useShim: boolean) =>
  _processEnv || globalThis.__env__ || (useShim ? _envShim : globalThis);

const env = new Proxy(_envShim, {
  get(_, prop) {
    const env = _getEnv();
    return env[prop] ?? _envShim[prop];
  },
  has(_, prop) {
    const env = _getEnv();
    return prop in env || prop in _envShim;
  },
  set(_, prop, value) {
    const env = _getEnv(true);
    env[prop] = value;
    return true;
  },
  deleteProperty(_, prop) {
    const env = _getEnv(true);
    delete env[prop];
  },
  ownKeys() {
    const env = _getEnv();
    return Object.keys(env);
  },
});

const argv = [];
// @ts-ignore
const version = ""; // empty string to avoid regexp issues
// @ts-ignore
const versions = {};

function noop() {
  return process;
}

const on = noop;
const addListener = noop;
const once = noop;
const off = noop;
const removeListener = noop;
const removeAllListeners = noop;
// @ts-ignore
const emit = noop;
const prependListener = noop;
const prependOnceListener = noop;

const listeners = function (name) {
  return [];
};
const listenerCount = () => process.listeners().length;

// @ts-ignore
const binding = function (name) {
  throw new Error("[unenv] process.binding is not supported");
};

let _cwd = "/";
const cwd = function () {
  return _cwd;
};
const chdir = function (dir) {
  _cwd = dir;
};
const umask = function () {
  return 0;
};

// https://nodejs.org/api/process.html#processhrtime
const hrtime = function (startTime) {
  const now = Date.now();
  // millis to seconds
  const seconds = Math.trunc(now / 1000);
  // convert millis to nanos
  const nanos = (now % 1000) * 1_000_000;

  if (startTime) {
    let diffSeconds = seconds - startTime[0];
    let diffNanos = nanos - startTime[0];

    if (diffNanos < 0) {
      diffSeconds = diffSeconds - 1;
      diffNanos = 1_000_000_000 + diffNanos;
    }
    return [diffSeconds, diffNanos];
  }

  return [seconds, nanos];
};
hrtime.bigint = function () {
  // Convert milliseconds to nanoseconds
  return BigInt(Date.now() * 1_000_000);
};

const getegid = function () {
  return 1000;
};

const geteuid = function () {
  return 1000;
};

const getgid = function () {
  return 1000;
};

const getuid = function () {
  return 1000;
};

const getgroups = function () {
  return [];
};

// ---- Unimplemented utils ----

const _debugEnd = notImplemented("process._debugEnd");
const _debugProcess = notImplemented("process._debugProcess");
const _eventsCount = 0;
const _fatalException = notImplemented("process._fatalException");
const _getActiveHandles = notImplemented("process._getActiveHandles");
const _getActiveRequests = notImplemented("process._getActiveRequests");
const _kill = notImplemented("process._kill");
const _preload_modules = [];
const _rawDebug = notImplemented("process._rawDebug");
const _startProfilerIdleNotifier = notImplemented(
  "process._startProfilerIdleNotifier",
);
const _stopProfilerIdleNotifier = notImplemented(
  "process.__stopProfilerIdleNotifier",
);
const _tickCallback = notImplemented("process._tickCallback");
const assert = notImplemented("process.assert");
const abort = notImplemented("process.abort");
const allowedNodeEnvironmentFlags = [];
const arch = "";
const argv0 = "";
const config = empty;
const connected = false;
const constrainedMemory = 0;
const cpuUsage = notImplemented("process.cpuUsage");
const debugPort = 0;
const dlopen = notImplemented("process.dlopen");
const disconnect = noop;
const emitWarning = noop;
const eventNames = notImplemented("process.eventNames");
const execArgv = [];
const execPath = "";
const exit = notImplemented("process.exit");
const features = Object.create({
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
const getActiveResourcesInfo = [];
const getMaxListeners = notImplemented("process.getMaxListeners");
const kill = notImplemented("");
const memoryUsage = notImplemented("process.memoryUsage");
const openStdin = notImplemented("process.openStdin");
const pid = 1000;
const platform = "unenv";
const ppid = 1000;
const rawListeners = notImplemented("process.rawListeners");
const release = Object.create({
  name: "",
  lts: "",
  sourceUrl: undefined,
  headersUrl: undefined,
});
const report = Object.create({
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
const resourceUsage = notImplemented("process.resourceUsage");
const setegid = notImplemented("process.setegid");
const seteuid = notImplemented("process.seteuid");
const setgid = notImplemented("process.setgid");
const setgroups = notImplemented("process.setgroups");
const setuid = notImplemented("process.setuid");
const setMaxListeners = notImplemented("process.setMaxListeners");
const setSourceMapsEnabled = notImplemented("process.setSourceMapsEnabled");
const stdout = mock.__createMock__("process.stdout");
const stderr = mock.__createMock__("process.stdout");
const stdin = mock.__createMock__("process.stdout");
const traceDeprecation = false;
const uptime = 1000;

export const process = {
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
  abort,
  addListener,
  allowedNodeEnvironmentFlags,
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
} as typeof globalThis.process;
