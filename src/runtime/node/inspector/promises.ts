import type nodeInspectorPromises from "node:inspector/promises";
import { notImplemented, notImplementedClass } from "../../_internal/utils.ts";
import noop from "../../mock/noop.ts";

export const console: typeof nodeInspectorPromises.console = {
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

export const Network = /*@__PURE__*/ notImplementedClass<
  typeof nodeInspectorPromises.Network
>("inspectorPromises.Network");

export const Session = /*@__PURE__*/ notImplementedClass<
  typeof nodeInspectorPromises.Session
>("inspectorPromises.Session");

export const url = /*@__PURE__*/ notImplemented<
  typeof nodeInspectorPromises.url
>("inspectorPromises.url");

export const waitForDebugger = /*@__PURE__*/ notImplemented<
  typeof nodeInspectorPromises.waitForDebugger
>("inspectorPromises.waitForDebugger");

export const open = /*@__PURE__*/ notImplemented<
  typeof nodeInspectorPromises.open
>("inspectorPromises.open");

export const close = /*@__PURE__*/ notImplemented<
  typeof nodeInspectorPromises.close
>("inspectorPromises.close");

export default {
  close,
  console,
  Network,
  open,
  Session,
  url,
  waitForDebugger,
} satisfies typeof nodeInspectorPromises;
