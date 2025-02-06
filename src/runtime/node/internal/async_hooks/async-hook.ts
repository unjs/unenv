import type asyncHooks from "node:async_hooks";

// https://nodejs.org/api/async_hooks.html

class _AsyncHook implements asyncHooks.HookCallbacks {
  readonly __unenv__ = true;

  _enabled: boolean = false;
  _callbacks: asyncHooks.HookCallbacks = {};

  constructor(callbacks: asyncHooks.HookCallbacks = {}) {
    this._callbacks = callbacks;
  }

  enable() {
    this._enabled = true;
    return this;
  }

  disable() {
    this._enabled = false;
    return this;
  }

  init(asyncId: number, type: string, triggerAsyncId: number, resource: any) {
    if (this._enabled && this._callbacks.init) {
      this._callbacks.init(asyncId, type, triggerAsyncId, resource);
    }
  }

  before(asyncId: number) {
    if (this._enabled && this._callbacks.before) {
      this._callbacks.before(asyncId);
    }
  }

  after(asyncId: number) {
    if (this._enabled && this._callbacks.after) {
      this._callbacks.after(asyncId);
    }
  }

  destroy(asyncId: number) {
    if (this._enabled && this._callbacks.destroy) {
      this._callbacks.destroy(asyncId);
    }
  }

  promiseResolve(asyncId: number) {
    if (this._enabled && this._callbacks.promiseResolve) {
      this._callbacks.promiseResolve(asyncId);
    }
  }
}

export const AsyncHook: asyncHooks.AsyncHook =
  (globalThis as any).AsyncHook || _AsyncHook;

export const createHook: typeof asyncHooks.createHook = function createHook(
  callbacks,
) {
  const asyncHook = new _AsyncHook(callbacks);
  return asyncHook;
};

export const executionAsyncId: typeof asyncHooks.executionAsyncId =
  function executionAsyncId() {
    return 0;
  };

export const executionAsyncResource: typeof asyncHooks.executionAsyncResource =
  function () {
    return Object.create(null);
  };

export const triggerAsyncId: typeof asyncHooks.triggerAsyncId = function () {
  return 0;
};

// @ts-expect-error @types/node is missing this one - this is a bug in typings
export const asyncWrapProviders: typeof asyncHooks.asyncWrapProviders =
  Object.assign(Object.create(null), {
    NONE: 0,
    DIRHANDLE: 1,
    DNSCHANNEL: 2,
    ELDHISTOGRAM: 3,
    FILEHANDLE: 4,
    FILEHANDLECLOSEREQ: 5,
    BLOBREADER: 6,
    FSEVENTWRAP: 7,
    FSREQCALLBACK: 8,
    FSREQPROMISE: 9,
    GETADDRINFOREQWRAP: 10,
    GETNAMEINFOREQWRAP: 11,
    HEAPSNAPSHOT: 12,
    HTTP2SESSION: 13,
    HTTP2STREAM: 14,
    HTTP2PING: 15,
    HTTP2SETTINGS: 16,
    HTTPINCOMINGMESSAGE: 17,
    HTTPCLIENTREQUEST: 18,
    JSSTREAM: 19,
    JSUDPWRAP: 20,
    MESSAGEPORT: 21,
    PIPECONNECTWRAP: 22,
    PIPESERVERWRAP: 23,
    PIPEWRAP: 24,
    PROCESSWRAP: 25,
    PROMISE: 26,
    QUERYWRAP: 27,
    QUIC_ENDPOINT: 28,
    QUIC_LOGSTREAM: 29,
    QUIC_PACKET: 30,
    QUIC_SESSION: 31,
    QUIC_STREAM: 32,
    QUIC_UDP: 33,
    SHUTDOWNWRAP: 34,
    SIGNALWRAP: 35,
    STATWATCHER: 36,
    STREAMPIPE: 37,
    TCPCONNECTWRAP: 38,
    TCPSERVERWRAP: 39,
    TCPWRAP: 40,
    TTYWRAP: 41,
    UDPSENDWRAP: 42,
    UDPWRAP: 43,
    SIGINTWATCHDOG: 44,
    WORKER: 45,
    WORKERHEAPSNAPSHOT: 46,
    WRITEWRAP: 47,
    ZLIB: 48,
    CHECKPRIMEREQUEST: 49,
    PBKDF2REQUEST: 50,
    KEYPAIRGENREQUEST: 51,
    KEYGENREQUEST: 52,
    KEYEXPORTREQUEST: 53,
    CIPHERREQUEST: 54,
    DERIVEBITSREQUEST: 55,
    HASHREQUEST: 56,
    RANDOMBYTESREQUEST: 57,
    RANDOMPRIMEREQUEST: 58,
    SCRYPTREQUEST: 59,
    SIGNREQUEST: 60,
    TLSWRAP: 61,
    VERIFYREQUEST: 62,
  });
