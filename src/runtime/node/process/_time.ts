// https://nodejs.org/api/process.html#processhrtime
export const hrtime: NodeJS.Process["hrtime"] = Object.assign(
  function hrtime(startTime?: [number, number] | undefined) {
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
      return [diffSeconds, diffNanos] as [number, number];
    }

    return [seconds, nanos] as [number, number];
  },
  {
    bigint: function bigint() {
      // Convert milliseconds to nanoseconds
      return BigInt(Date.now() * 1_000_000);
    },
  },
);

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
class Item {
  fun: () => any;
  array: any[];
  constructor(fun: () => any, array: any[]) {
    this.fun = fun;
    this.array = array;
  }
  run() {
    this.fun.apply(null, this.array);
  }
}

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

function _nextTick(...args: any[]) {
  // https://nodejs.org/api/process.html#when-to-use-queuemicrotask-vs-processnexttick
  globalThis.queueMicrotask(() => {
    cb(...args);
  });
}

export const nextTick = (globalThis as any).queueMicrotask
  ? _nextTick
  : _nextTickLegacy;
