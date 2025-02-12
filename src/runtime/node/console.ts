import type nodeConsole from "node:console";
import { Writable } from "node:stream";
import noop from "../mock/noop.ts";
import { notImplemented, notImplementedClass } from "../_internal/utils.ts";

const _console = globalThis.console;

// undocumented public APIs
export const _ignoreErrors: boolean = true;
export const _stderr: Writable = new Writable();
export const _stdout: Writable = new Writable();

export const log: typeof nodeConsole.log = _console?.log ?? noop;
export const info: typeof nodeConsole.info = _console?.info ?? log;
export const trace: typeof nodeConsole.trace = _console?.trace ?? info;
export const debug: typeof nodeConsole.debug = _console?.debug ?? log;
export const table: typeof nodeConsole.table = _console?.table ?? log;
export const error: typeof nodeConsole.error = _console?.error ?? log;
export const warn: typeof nodeConsole.warn = _console?.warn ?? error;

// https://developer.chrome.com/docs/devtools/console/api#createtask
export const createTask =
  (_console as any)?.createTask ??
  /*@__PURE__*/ notImplemented("console.createTask");

export const assert: typeof nodeConsole.assert =
  /*@__PURE__*/ notImplemented<typeof nodeConsole.assert>("console.assert");

// noop
export const clear: typeof nodeConsole.clear = _console?.clear ?? noop;
export const count: typeof nodeConsole.count = _console?.count ?? noop;
export const countReset: typeof nodeConsole.countReset =
  _console?.countReset ?? noop;
export const dir: typeof nodeConsole.dir = _console?.dir ?? noop;
export const dirxml: typeof nodeConsole.dirxml = _console?.dirxml ?? noop;
export const group: typeof nodeConsole.group = _console?.group ?? noop;
export const groupEnd: typeof nodeConsole.groupEnd = _console?.groupEnd ?? noop;
export const groupCollapsed: typeof nodeConsole.groupCollapsed =
  _console?.groupCollapsed ?? noop;
export const profile: typeof nodeConsole.profile = _console?.profile ?? noop;
export const profileEnd: typeof nodeConsole.profileEnd =
  _console?.profileEnd ?? noop;
export const time: typeof nodeConsole.time = _console?.time ?? noop;
export const timeEnd: typeof nodeConsole.timeEnd = _console?.timeEnd ?? noop;
export const timeLog: typeof nodeConsole.timeLog = _console?.timeLog ?? noop;
export const timeStamp: typeof nodeConsole.timeStamp =
  _console?.timeStamp ?? noop;

export const Console: typeof nodeConsole.Console =
  _console?.Console ?? /*@__PURE__*/ notImplementedClass("console.Console");

export const _times = /*@__PURE__*/ new Map();

export function context() {
  // TODO: Should be Console with all the methods
  return _console;
}

export {
  default as _stdoutErrorHandler,
  default as _stderrErrorHandler,
} from "../mock/noop.ts";

export default {
  // @ts-expect-error
  _times,
  assert,
  clear,
  Console,
  count,
  countReset,
  debug,
  dir,
  dirxml,
  error,
  context,
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
} satisfies typeof nodeConsole;
