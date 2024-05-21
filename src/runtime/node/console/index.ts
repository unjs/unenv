import type console from "node:console";
import mock from "../../mock/proxy";

const _console = globalThis.console;

const noop = () => {};

const log: typeof console.log = _console?.log ?? noop;
const info: typeof console.info = _console?.info ?? log;
const warn: typeof console.warn = _console?.warn ?? log;
const debug: typeof console.debug = _console?.debug ?? log;
const error: typeof console.error = _console?.error ?? log;

const assert: typeof console.assert = _console?.assert ?? noop;
const clear: typeof console.clear = _console?.clear ?? noop;
const count: typeof console.count = _console?.count ?? noop;
const countReset: typeof console.countReset = _console?.countReset ?? noop;
const dir: typeof console.dir = _console?.dir ?? noop;
const dirxml: typeof console.dirxml = _console?.dirxml ?? noop;
const group: typeof console.group = _console?.group ?? noop;
const groupEnd: typeof console.groupEnd = _console?.groupEnd ?? noop;
const groupCollapsed: typeof console.groupCollapsed =
  _console?.groupCollapsed ?? noop;
const profile: typeof console.profile = _console?.profile ?? noop;
const profileEnd: typeof console.profileEnd = _console?.profileEnd ?? noop;
const table: typeof console.table = _console?.table ?? noop;
const time: typeof console.time = _console?.time ?? noop;
const timeEnd: typeof console.timeEnd = _console?.timeEnd ?? noop;
const timeLog: typeof console.timeLog = _console?.timeLog ?? noop;
const timeStamp: typeof console.timeStamp = _console?.timeStamp ?? noop;
const trace: typeof console.trace = _console?.trace ?? noop;

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
