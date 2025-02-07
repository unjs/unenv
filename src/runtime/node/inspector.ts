// https://nodejs.org/api/inspector.html
import noop from "../mock/noop.ts";
import mock from "../mock/proxy.ts";
import type nodeInspector from "node:inspector";

export const close: typeof nodeInspector.close = noop;

export const console: Console = mock.__createMock__("inspector.console");

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
  mock.__createMock__("inspector.Session");

export const Network = mock.__createMock__("inspector.Network");

export default {
  Session,
  close,
  console,
  open,
  url,
  waitForDebugger,
  Network,
} satisfies typeof nodeInspector;
