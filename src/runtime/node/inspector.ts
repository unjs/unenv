// https://nodejs.org/api/inspector.html
import { notImplementedClass, notImplemented } from "../_internal/utils.ts";
import noop from "../mock/noop.ts";
import type nodeInspector from "node:inspector";

export const close: typeof nodeInspector.close = noop;

export const console: nodeInspector.InspectorConsole = {
  debug: noop,
  error: noop,
  info: noop,
  log: noop,
  warn: noop,
  dir: noop,
  dirxml: noop,
  table: noop,
  trace: noop,
  group: noop,
  groupCollapsed: noop,
  groupEnd: noop,
  clear: noop,
  count: noop,
  countReset: noop,
  assert: noop,
  profile: noop,
  profileEnd: noop,
  time: noop,
  timeLog: noop,
  timeStamp: noop,
};

export const open: typeof nodeInspector.open = () => ({
  __unenv__: true,
  [Symbol.dispose]() {
    return Promise.resolve();
  },
});

export const url: typeof nodeInspector.url = () => undefined;

export const waitForDebugger: typeof nodeInspector.waitForDebugger = noop;

// `node:inspector` and `node:inspector/promises` share the same implementation with only Session being in the promises module:
// https://github.com/nodejs/node/blob/main/lib/inspector/promises.js
export const Session: typeof nodeInspector.Session =
  /*@__PURE__*/ notImplementedClass("inspector.Session");

export const Network: typeof nodeInspector.Network = /*@__PURE__*/ {
  loadingFailed: /*@__PURE__*/ notImplemented(
    "inspector.Network.loadingFailed",
  ),
  loadingFinished: /*@__PURE__*/ notImplemented(
    "inspector.Network.loadingFinished",
  ),
  requestWillBeSent: /*@__PURE__*/ notImplemented(
    "inspector.Network.requestWillBeSent",
  ),
  responseReceived: /*@__PURE__*/ notImplemented(
    "inspector.Network.responseReceived",
  ),
};

export default {
  Session,
  close,
  console,
  open,
  url,
  waitForDebugger,
  Network,
} satisfies typeof nodeInspector;
