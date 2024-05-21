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

// https://developer.mozilla.org/en-US/docs/Web/API/queueMicrotask
// https://nodejs.org/api/process.html#when-to-use-queuemicrotask-vs-processnexttick
export const nextTick: NodeJS.Process["nextTick"] = globalThis.queueMicrotask
  ? (cb, ...args) => {
      globalThis.queueMicrotask(cb.bind(undefined, ...args));
    }
  : _createNextTickWithTimeout();

// Fallback for runtimes not implkementing queueMicrotask
function _createNextTickWithTimeout() {
  type Callback = () => any;
  let queue: Callback[] = [];
  let draining = false;
  let currentQueue: Callback[] | undefined;
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
    const timeout = setTimeout(cleanUpNextTick);
    draining = true;
    let len = queue.length;
    while (len) {
      currentQueue = queue;
      queue = [];
      while (++queueIndex < len) {
        if (currentQueue) {
          currentQueue[queueIndex]();
        }
      }
      queueIndex = -1;
      len = queue.length;
    }
    currentQueue = undefined;
    draining = false;
    clearTimeout(timeout);
  }

  const nextTick = (cb: Callback, ...args: any[]) => {
    queue.push(cb.bind(undefined, ...args));
    if (queue.length === 1 && !draining) {
      setTimeout(drainQueue);
    }
  };

  return nextTick;
}
