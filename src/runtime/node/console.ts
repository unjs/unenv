import type console from "node:console";
import { Writable } from "node:stream";
import mock from "../mock/proxy.ts";
import noop from "../mock/noop.ts";
import { notImplemented } from "../_internal/utils.ts";

const _console = globalThis.console;

// undocumented public APIs
export const _ignoreErrors: boolean = true;
export const _stderr: Writable = new Writable();
export const _stdout: Writable = new Writable();

export const log: typeof console.log = _console?.log ?? noop;
export const info: typeof console.info = _console?.info ?? log;
export const trace: typeof console.trace = _console?.trace ?? info;
export const debug: typeof console.debug = _console?.debug ?? log;
export const table: typeof console.table = _console?.table ?? log;
export const error: typeof console.error = _console?.error ?? log;
export const warn: typeof console.warn = _console?.warn ?? error;

// https://developer.chrome.com/docs/devtools/console/api#createtask
export const createTask =
  (_console as any)?.createTask ??
  /*@__PURE__*/ notImplemented("console.createTask");

export const assert: typeof console.assert =
  /*@__PURE__*/ notImplemented<typeof console.assert>("console.assert");

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

export { default as _times } from "../mock/proxy.ts";

export function context() {
  // TODO: Should be Console with all the methods
  return _console;
}

export {
  default as _stdoutErrorHandler,
  default as _stderrErrorHandler,
} from "../mock/noop.ts";

export default {
  assert,
  clear,
  Console,
  count,
  countReset,
  debug,
  dir,
  dirxml,
  error,
  // @ts-expect-error
  context,
  // @ts-expect-error
  createTask,
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
} satisfies typeof console;
