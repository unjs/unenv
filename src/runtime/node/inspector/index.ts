// https://nodejs.org/api/inspector.html
import noop from "../../mock/noop";
import mock from "../../mock/proxy";
import type inspector from "node:inspector";
import type Console from "node:console";

export const close: typeof inspector.close = noop;

export const console: Console = mock.__createMock__("inspector.console");

export const open: typeof inspector.open = () => ({
  __unenv__: true,
  [Symbol.dispose]() {
    return Promise.resolve();
  },
});

export const url: typeof inspector.url = () => {
  return undefined;
};

export const waitForDebugger: typeof inspector.waitForDebugger = noop;

// `node:inspector` and `node:inspector/promises` share the same implementation with only Session being in the promises module:
// https://github.com/nodejs/node/blob/main/lib/inspector/promises.js
export const Session: typeof inspector.Session =
  mock.__createMock__("inspector.Session");

export default <typeof inspector>{
  Session,
  close,
  console,
  open,
  url,
  waitForDebugger,
};
