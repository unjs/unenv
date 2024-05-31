import type console from "node:console";
import mock from "../../mock/proxy";
import noop from "../../mock/noop";
import { notImplemented } from "../../_internal/utils";

const _console = globalThis.console;

export const log: typeof console.log = _console?.log ?? noop;
export const info: typeof console.info = _console?.info ?? log;
export const trace: typeof console.trace = _console?.trace ?? info;
export const debug: typeof console.debug = _console?.debug ?? log;
export const table: typeof console.table = _console?.table ?? log;
export const error: typeof console.error = _console?.error ?? log;
export const warn: typeof console.warn = _console?.warn ?? error;

export const assert: typeof console.assert =
  notImplemented<typeof console.assert>("console.assert");

// noop
export const clear: typeof console.clear = _console?.clear ?? noop;
export const count: typeof console.count = _console?.count ?? noop;
export const countReset: typeof console.countReset =
  _console?.countReset ?? noop;
export const dir: typeof console.dir = _console?.dir ?? noop;
export const dirxml: typeof console.dirxml = _console?.dirxml ?? noop;
export const group: typeof console.group = _console?.group ?? noop;
export const groupEnd: typeof console.groupEnd = _console?.groupEnd ?? noop;
export const groupCollapsed: typeof console.groupCollapsed =
  _console?.groupCollapsed ?? noop;
export const profile: typeof console.profile = _console?.profile ?? noop;
export const profileEnd: typeof console.profileEnd =
  _console?.profileEnd ?? noop;
export const time: typeof console.time = _console?.time ?? noop;
export const timeEnd: typeof console.timeEnd = _console?.timeEnd ?? noop;
export const timeLog: typeof console.timeLog = _console?.timeLog ?? noop;
export const timeStamp: typeof console.timeStamp = _console?.timeStamp ?? noop;

export const Console: typeof console.Console =
  _console?.Console ?? mock.__createMock__("console.Console");

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
