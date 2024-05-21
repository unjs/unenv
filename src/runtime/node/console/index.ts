import type console from "node:console";
import { notImplemented } from "../../_internal/utils";
import mock from "../../mock/proxy";

const assert: typeof console.assert =
  globalThis.console?.assert || notImplemented("console.assert");

const clear: typeof console.clear =
  globalThis.console?.clear || notImplemented("console.clear");

const count: typeof console.count =
  globalThis.console?.count || notImplemented("console.count");

const countReset: typeof console.countReset =
  globalThis.console?.countReset || notImplemented("console.countReset");

const debug: typeof console.debug =
  globalThis.console?.debug || notImplemented("console.debug");

const dir: typeof console.dir =
  globalThis.console?.dir || notImplemented("console.dir");

const dirxml: typeof console.dirxml =
  globalThis.console?.dirxml || notImplemented("console.dirxml");

const error: typeof console.error =
  globalThis.console?.error || notImplemented("console.error");

const group: typeof console.group =
  globalThis.console?.group || notImplemented("console.group");
const groupEnd: typeof console.groupEnd =
  globalThis.console?.groupEnd || notImplemented("console.groupEnd");

const groupCollapsed: typeof console.groupCollapsed =
  globalThis.console?.groupCollapsed ||
  notImplemented("console.groupCollapsed");

const info: typeof console.info =
  globalThis.console?.info || notImplemented("console.info");

const log: typeof console.log =
  globalThis.console?.log || notImplemented("console.log");

const profile: typeof console.profile =
  globalThis.console?.profile || notImplemented("console.profile");

const profileEnd: typeof console.profileEnd =
  globalThis.console?.profileEnd || notImplemented("console.profileEnd");

const table: typeof console.table =
  globalThis.console?.table || notImplemented("console.table");

const time: typeof console.time =
  globalThis.console?.time || notImplemented("console.time");

const timeEnd: typeof console.timeEnd =
  globalThis.console?.timeEnd || notImplemented("console.timeEnd");

const timeLog: typeof console.timeLog =
  globalThis.console?.timeLog || notImplemented("console.timeLog");

const timeStamp: typeof console.timeStamp =
  globalThis.console?.timeStamp || notImplemented("console.timeStamp");

const trace: typeof console.trace =
  globalThis.console?.trace || notImplemented("console.trace");

const warn: typeof console.warn =
  globalThis.console?.warn || notImplemented("console.warn");

export const Console: typeof console.Console =
  globalThis.console?.Console || mock.__createMock__("console.Console");

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
