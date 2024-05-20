import type console from "node:console";
import { createNotImplementedError } from "../../_internal/utils";
import mock from "../../mock/proxy";

export const assert: typeof console.assert = (
  ...args: Parameters<(typeof globalThis)["console"]["assert"]>
) => {
  if (globalThis.console?.assert) {
    return globalThis.console.assert(...args);
  }
  createNotImplementedError("console.assert");
};

export const clear: typeof console.clear = () => {
  if (globalThis.console?.clear) {
    return globalThis.console.clear();
  }
  createNotImplementedError("console.clear");
};

export const count: typeof console.count = (
  ...args: Parameters<(typeof globalThis)["console"]["count"]>
) => {
  if (globalThis.console?.count) {
    return globalThis.console.count(...args);
  }
  createNotImplementedError("console.count");
};

export const countReset: typeof console.countReset = (
  ...args: Parameters<(typeof globalThis)["console"]["countReset"]>
) => {
  if (globalThis.console?.countReset) {
    return globalThis.console.countReset(...args);
  }
  createNotImplementedError("console.countReset");
};

export const debug: typeof console.debug = (
  ...args: Parameters<(typeof globalThis)["console"]["debug"]>
) => {
  if (globalThis.console?.debug) {
    return globalThis.console.debug(...args);
  }
  createNotImplementedError("console.debug");
};

export const dir: typeof console.dir = (
  ...args: Parameters<(typeof globalThis)["console"]["dir"]>
) => {
  if (globalThis.console?.dir) {
    return globalThis.console.dir(...args);
  }
  createNotImplementedError("console.dir");
};

export const dirxml: typeof console.dirxml = (
  ...args: Parameters<(typeof globalThis)["console"]["dirxml"]>
) => {
  if (globalThis.console?.dirxml) {
    return globalThis.console.dirxml(...args);
  }
  createNotImplementedError("console.dirxml");
};

export const error: typeof console.error = (
  ...args: Parameters<(typeof globalThis)["console"]["error"]>
) => {
  if (globalThis.console?.error) {
    return globalThis.console.error(...args);
  }
  createNotImplementedError("console.error");
};

export const group: typeof console.group = (
  ...args: Parameters<(typeof globalThis)["console"]["group"]>
) => {
  if (globalThis.console?.group) {
    return globalThis.console.group(...args);
  }
  createNotImplementedError("console.group");
};

export const groupEnd: typeof console.groupEnd = (
  ...args: Parameters<(typeof globalThis)["console"]["groupEnd"]>
) => {
  if (globalThis.console?.groupEnd) {
    return globalThis.console.groupEnd(...args);
  }
  createNotImplementedError("console.groupEnd");
};

export const groupCollapsed: typeof console.groupCollapsed = (
  ...args: Parameters<(typeof globalThis)["console"]["groupCollapsed"]>
) => {
  if (globalThis.console?.groupCollapsed) {
    return globalThis.console.groupCollapsed(...args);
  }
  createNotImplementedError("console.groupCollapsed");
};

export const info: typeof console.info = (
  ...args: Parameters<(typeof globalThis)["console"]["info"]>
) => {
  if (globalThis.console?.info) {
    return globalThis.console.info(...args);
  }
  createNotImplementedError("console.info");
};

export const log: typeof console.log = (
  ...args: Parameters<(typeof globalThis)["console"]["log"]>
) => {
  if (globalThis.console?.log) {
    return globalThis.console.log(...args);
  }
  createNotImplementedError("console.log");
};

export const profile: typeof console.profile = (
  ...args: Parameters<(typeof globalThis)["console"]["profile"]>
) => {
  if (globalThis.console?.profile) {
    return globalThis.console.profile(...args);
  }
  createNotImplementedError("console.profile");
};

export const profileEnd: typeof console.profileEnd = (
  ...args: Parameters<(typeof globalThis)["console"]["profileEnd"]>
) => {
  if (globalThis.console?.profileEnd) {
    return globalThis.console.profileEnd(...args);
  }
  createNotImplementedError("console.profileEnd");
};

export const table: typeof console.table = (
  ...args: Parameters<(typeof globalThis)["console"]["table"]>
) => {
  if (globalThis.console?.table) {
    return globalThis.console.table(...args);
  }
  createNotImplementedError("console.table");
};

export const time: typeof console.time = (
  ...args: Parameters<(typeof globalThis)["console"]["time"]>
) => {
  if (globalThis.console?.time) {
    return globalThis.console.time(...args);
  }
  createNotImplementedError("console.time");
};

export const timeEnd: typeof console.timeEnd = (
  ...args: Parameters<(typeof globalThis)["console"]["timeEnd"]>
) => {
  if (globalThis.console?.timeEnd) {
    return globalThis.console.timeEnd(...args);
  }
  createNotImplementedError("console.timeEnd");
};

export const timeLog: typeof console.timeLog = (
  ...args: Parameters<(typeof globalThis)["console"]["timeLog"]>
) => {
  if (globalThis.console?.timeLog) {
    return globalThis.console.timeLog(...args);
  }
  createNotImplementedError("console.timeLog");
};

export const timeStamp: typeof console.timeStamp = (
  ...args: Parameters<(typeof globalThis)["console"]["timeStamp"]>
) => {
  if (globalThis.console?.timeStamp) {
    return globalThis.console.timeStamp(...args);
  }
  createNotImplementedError("console.timeStamp");
};

export const trace: typeof console.trace = (
  ...args: Parameters<(typeof globalThis)["console"]["trace"]>
) => {
  if (globalThis.console?.trace) {
    return globalThis.console.trace(...args);
  }
  createNotImplementedError("console.trace");
};

export const warn: typeof console.warn = (
  ...args: Parameters<(typeof globalThis)["console"]["warn"]>
) => {
  if (globalThis.console?.warn) {
    return globalThis.console.warn(...args);
  }
  createNotImplementedError("console.warn");
};

export const Console: typeof console.Console =
  mock.__createMock__("console.Console");

export default <typeof console>{
  assert,
  clear,
  Console,
  count,
  countReset,
  debug,
  dir,
  dirxml,
  error,
  group,
  groupEnd,
  groupCollapsed,
  info,
  log,
  profile,
  profileEnd,
  table,
  time,
  timeEnd,
  timeLog,
  timeStamp,
  trace,
  warn,
};
