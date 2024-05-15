// @ts-nocheck
// Source: https://github.com/defunctzombie/node-process/blob/77caa43cdaee4ea710aa14d11cea1705293c0ef3/browser.js

import mock from "../../mock/proxy";
import empty from "../../mock/empty";
import { notImplemented } from "src/runtime/_internal/utils";

export const process = {} as typeof globalThis.process;

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

process.nextTick = globalThis.queueMicrotask ? _nextTick : _nextTickLegacy;

// v8 likes predictible objects
function Item(fun, array) {
  this.fun = fun;
  this.array = array;
}
Item.prototype.run = function () {
  this.fun.apply(null, this.array);
};
process.title = "unenv";

const _envShim = Object.create(null);
const _processEnv = globalThis.process?.env;
const _getEnv = (useShim: boolean) =>
  _processEnv || globalThis.__env__ || (useShim ? _envShim : globalThis);

process.env = new Proxy(_envShim, {
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

process.argv = [];
// @ts-ignore
process.version = ""; // empty string to avoid regexp issues
// @ts-ignore
process.versions = {};

function noop() {
  return process;
}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
// @ts-ignore
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) {
  return [];
};
process.listenerCount = () => process.listeners().length;

// @ts-ignore
process.binding = function (name) {
  throw new Error("[unenv] process.binding is not supported");
};

let cwd = "/";
process.cwd = function () {
  return cwd;
};
process.chdir = function (dir) {
  cwd = dir;
};
process.umask = function () {
  return 0;
};

// https://nodejs.org/api/process.html#processhrtime
process.hrtime = function (startTime) {
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
process.hrtime.bigint = function () {
  // Convert milliseconds to nanoseconds
  return BigInt(Date.now() * 1_000_000);
};

process.getegid = function () {
  return 1000;
};

process.geteuid = function () {
  return 1000;
};

process.getgid = function () {
  return 1000;
};

process.getuid = function () {
  return 1000;
};

process.getgroups = function () {
  return [];
};

// ---- Unimplemented utils ----

process._debugEnd = notImplemented("process._debugEnd");
process._debugProcess = notImplemented("process._debugProcess");
process._eventsCount = 0;
process._fatalException = notImplemented("process._fatalException");
process._getActiveHandles = notImplemented("process._getActiveHandles");
process._getActiveRequests = notImplemented("process._getActiveRequests");
process._kill = notImplemented("process._kill");
process._preload_modules = [];
process._rawDebug = notImplemented("process._rawDebug");
process._startProfilerIdleNotifier = notImplemented(
  "process._startProfilerIdleNotifier",
);
process.__stopProfilerIdleNotifier = notImplemented(
  "process.__stopProfilerIdleNotifier",
);
process._tickCallback = notImplemented("process._tickCallback");

process.stdout = mock.__createMock__("process.stdout");
process.stderr = mock.__createMock__("process.stdout");
process.stdin = mock.__createMock__("process.stdout");

process.assert = notImplemented("process.assert");
process.abort = notImplemented("process.abort");
process.allowedNodeEnvironmentFlags = [];
process.arch = "";
process.argv0 = "";
process.config = empty;
process.connected = false;
process.constrainedMemory = 0;
process.cpuUsage = notImplemented("process.cpuUsage");
process.debugPort = 0;
process.dlopen = notImplemented("process.dlopen");
process.disconnect = noop;
process.emitWarning = noop;
process.eventNames = notImplemented("process.eventNames");
process.execArgv = [];
process.execPath = "";
process.exit = notImplemented("process.exit");
process.features = Object.create({
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
process.getActiveResourcesInfo = [];
process.getMaxListeners = notImplemented("process.getMaxListeners");
process.kill = notImplemented("");
process.memoryUsage = notImplemented("process.memoryUsage");
process.openStdin = notImplemented("process.openStdin");
process.pid = 1000;
process.platform = "";
process.ppid = 1000;
process.rawListeners = notImplemented("process.rawListeners");
process.release = empty;
process.report = Object.create({
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
process.resourceUsage = notImplemented("process.resourceUsage");
process.setegid = notImplemented("process.setegid");
process.seteuid = notImplemented("process.seteuid");
process.setgid = notImplemented("process.setgid");
process.setgroups = notImplemented("process.setgroups");
process.setuid = notImplemented("process.setuid");
process.setMaxListeners = notImplemented("process.setMaxListeners");
process.setSourceMapsEnabled = notImplemented("process.setSourceMapsEnabled");
process.traceDeprecation = false;
process.uptime = 0;
process.version = "";
process.versions = empty;
