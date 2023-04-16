// @ts-nocheck
// Source: https://github.com/defunctzombie/node-process/blob/77caa43cdaee4ea710aa14d11cea1705293c0ef3/browser.js

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
      // eslint-disable-next-line no-useless-call
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
      // eslint-disable-next-line no-useless-call
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

process.nextTick = function (fun) {
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
};

// v8 likes predictible objects
function Item(fun, array) {
  this.fun = fun;
  this.array = array;
}
Item.prototype.run = function () {
  this.fun.apply(null, this.array);
};
process.title = "unenv";
const _getEnv = () =>
  globalThis.process?.env || globalThis.__env__ || globalThis;
process.env = new Proxy(
  {},
  {
    get: (_, prop) => {
      const env = _getEnv();
      return env[prop];
    },
    has(_, prop) {
      const env = _getEnv();
      return prop in env;
    },
    set: (_, prop, value) => {
      const env = _getEnv();
      if (env === globalThis) {
        return false;
      }
      env[prop] = value;
      return true;
    },
  }
);
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
