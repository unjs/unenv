// Source: https://github.com/browserify/events/blob/48e3d18659caf72d94d319871106f089bb40002d/events.js
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

import type nodeEvents from "node:events";

interface Listener {
  (...args: any[]): void;
  listener?: (...args: any[]) => void;
}

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
let defaultMaxListeners = 10;

export class EventEmitter implements nodeEvents.EventEmitter {
  readonly __unenv__ = true;

  _events: Record<string, Listener[] & { warned?: boolean }> =
    Object.create(null);

  _maxListeners: undefined | number;

  static get defaultMaxListeners() {
    return defaultMaxListeners;
  }

  static set defaultMaxListeners(arg) {
    if (typeof arg !== "number" || arg < 0 || Number.isNaN(arg)) {
      throw new RangeError(
        'The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' +
          arg +
          ".",
      );
    }
    defaultMaxListeners = arg;
  }

  setMaxListeners(n: number) {
    if (typeof n !== "number" || n < 0 || Number.isNaN(n)) {
      throw new RangeError(
        'The value of "n" is out of range. It must be a non-negative number. Received ' +
          n +
          ".",
      );
    }
    this._maxListeners = n;
    return this;
  }

  getMaxListeners() {
    return _getMaxListeners(this);
  }

  emit(type: string, ...args: any[]) {
    if (!this._events[type] || this._events[type].length === 0) {
      return false;
    }

    // If there is no 'error' event listener then throw.
    if (type === "error") {
      let er;
      if (args.length > 0) {
        er = args[0];
      }
      if (er instanceof Error) {
        // Note: The comments on the `throw` lines are intentional, they show
        // up in Node's output if this results in an unhandled exception.
        throw er; // Unhandled 'error' event
      }
      // At least give some kind of context to the user
      const err = new Error(
        "Unhandled error." + (er ? " (" + er.message + ")" : ""),
      ) as Error & { context?: Error };
      err.context = er;
      throw err; // Unhandled 'error' event
    }

    for (const _listener of this._events[type]) {
      (_listener.listener || _listener).apply(this, args);
    }

    return true;
  }

  addListener(type: string, listener: Listener) {
    return _addListener(this, type, listener, false);
  }

  on(type: string, listener: Listener) {
    return _addListener(this, type, listener, false);
  }

  prependListener(type: string, listener: Listener) {
    return _addListener(this, type, listener, true);
  }

  once(type: string, listener: Listener) {
    return this.on(type, _wrapOnce(this, type, listener));
  }

  prependOnceListener(type: string, listener: Listener) {
    return this.prependListener(type, _wrapOnce(this, type, listener));
  }

  removeListener(type: string, listener: Listener) {
    return _removeListener(this, type, listener);
  }

  off(type: string, listener: Listener) {
    return this.removeListener(type, listener);
  }

  removeAllListeners(type: string) {
    return _removeAllListeners(this, type);
  }

  listeners(type: string) {
    return _listeners(this, type, true);
  }

  rawListeners(type: string) {
    return _listeners(this, type, false);
  }

  listenerCount(type: string) {
    return this.rawListeners(type).length;
  }

  eventNames() {
    return Object.keys(this._events);
  }
}

// --- Utils ---

export function once(emitter: EventEmitter, name: string) {
  return new Promise(function (resolve, reject) {
    function errorListener(err: Error) {
      emitter.removeListener(name, resolver);
      reject(err);
    }

    function resolver() {
      if (typeof emitter.removeListener === "function") {
        emitter.removeListener("error", errorListener);
      }
      resolve(Array.prototype.slice.call(arguments));
    }

    _eventTargetAgnosticAddListener(emitter, name, resolver, { once: true });
    if (name !== "error") {
      _addErrorHandlerIfEventEmitter(emitter, errorListener, { once: true });
    }
  });
}

// --- Internal ---

function _addListener<T extends EventEmitter>(
  target: T,
  type: string,
  listener: Listener,
  prepend: boolean,
): T {
  _checkListener(listener);

  // To avoid recursion in the case that type === "newListener"! Before
  // adding it to the listeners, first emit "newListener".
  if (target._events.newListener !== undefined) {
    target.emit("newListener", type, listener.listener || listener);
  }

  if (!target._events[type]) {
    target._events[type] = [];
  }

  if (prepend) {
    target._events[type].unshift(listener);
  } else {
    target._events[type].push(listener);
  }

  // Check for listener leak
  const maxListeners = _getMaxListeners(target);
  if (
    maxListeners > 0 &&
    target._events[type].length > maxListeners &&
    !target._events[type].warned
  ) {
    target._events[type].warned = true;
    // No error code for this since it is a Warning

    const warning = new Error(
      `[unenv] Possible EventEmitter memory leak detected. ${target._events[type].length} ${type} listeners added. Use emitter.setMaxListeners() to increase limit`,
    ) as Error & {
      name?: string;
      emitter?: EventEmitter;
      type?: string;
      count?: number;
    };
    warning.name = "MaxListenersExceededWarning";
    warning.emitter = target;
    warning.type = type;
    warning.count = target._events[type]?.length;
    console.warn(warning);
  }

  return target;
}

function _removeListener<T extends EventEmitter>(
  target: T,
  type: string,
  listener: Listener,
): T {
  _checkListener(listener);
  if (!target._events[type] || target._events[type].length === 0) {
    return target;
  }
  const lenBeforeFilter = target._events[type].length;
  target._events[type] = target._events[type].filter((fn) => fn !== listener);
  if (lenBeforeFilter === target._events[type].length) {
    return target;
  }
  if (target._events.removeListener) {
    target.emit("removeListener", type, listener.listener || listener);
  }
  if (target._events[type].length === 0) {
    delete target._events[type];
  }
  return target;
}

function _removeAllListeners<T extends EventEmitter>(
  target: T,
  type: string,
): T {
  if (!target._events[type] || target._events[type].length === 0) {
    return target;
  }
  if (target._events.removeListener) {
    for (const _listener of target._events[type]) {
      target.emit("removeListener", type, _listener.listener || _listener);
    }
  }
  delete target._events[type];
  return target;
}

function _wrapOnce(target: EventEmitter, type: string, listener: Listener) {
  let fired = false;
  const wrapper: Listener = (...args) => {
    if (fired) {
      return;
    }
    target.removeListener(type, wrapper);
    fired = true;
    return args.length === 0
      ? listener.call(target)
      : listener.apply(target, args);
  };
  wrapper.listener = listener;
  return wrapper;
}

function _getMaxListeners(target: EventEmitter) {
  return target._maxListeners ?? EventEmitter.defaultMaxListeners;
}

function _listeners(target: EventEmitter, type: string, unwrap: boolean) {
  let listeners = target._events[type];
  if (typeof listeners === "function") {
    listeners = [listeners];
  }
  return unwrap ? listeners.map((l) => l.listener || l) : listeners;
}

function _checkListener(listener: Listener) {
  if (typeof listener !== "function") {
    throw new TypeError(
      'The "listener" argument must be of type Function. Received type ' +
        typeof listener,
    );
  }
}

function _addErrorHandlerIfEventEmitter(
  emitter: EventEmitter,
  handler: Listener,
  flags: { once?: boolean },
) {
  if (typeof emitter.on === "function") {
    _eventTargetAgnosticAddListener(emitter, "error", handler, flags);
  }
}

function _eventTargetAgnosticAddListener(
  emitter: EventEmitter | EventTarget,
  name: string,
  listener: Listener,
  flags: { once?: boolean },
) {
  if (typeof (emitter as EventEmitter).on === "function") {
    if (flags.once) {
      (emitter as EventEmitter).once(name, listener);
    } else {
      (emitter as EventEmitter).on(name, listener);
    }
  } else if (typeof (emitter as EventTarget).addEventListener === "function") {
    (emitter as EventTarget).addEventListener(name, listener);
  } else {
    throw new TypeError(
      'The "emitter" argument must be of type EventEmitter. Received type ' +
        typeof emitter,
    );
  }
}
