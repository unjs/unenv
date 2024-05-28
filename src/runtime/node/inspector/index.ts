// https://nodejs.org/api/inspector.html

import noop from "../../mock/noop";
import mock from "../../mock/proxy";
import disposable from "../../mock/disposable";
import type inspector from "node:inspector";
import type Console from "node:console";

const noopDisposable = () => disposable;

export const Session: typeof inspector.Session =
  mock.__createMock__("inspector.Session");
export const close: typeof inspector.close = noop;
export const console: Console = mock.__createMock__("inspector.console");
export const open: typeof inspector.open = noopDisposable;
export const url: typeof inspector.url = () => {
  return undefined;
};
export const waitForDebugger: typeof inspector.waitForDebugger = noop;

export default <typeof inspector>{
  Session,
  close,
  console,
  open,
  url,
  waitForDebugger,
};
