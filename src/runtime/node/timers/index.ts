import { notImplemented, notImplementedAsync } from "../../_internal/utils";
import noop from "../../mock/noop";
import type timers from "node:timers";
import promises from "./promises";

export * as promises from "./promises";

export const clearImmediate: typeof timers.clearImmediate =
  globalThis.clearImmediate || noop;
export const clearInterval: typeof timers.clearInterval =
  globalThis.clearInterval || noop;
export const clearTimeout: typeof timers.clearTimeout =
  globalThis.clearTimeout || noop;

// We're throwing `notImplemented` errors for now but will revisit in the future.
// We considered using `queueMicrotask` or `postMessage` but these won't result in an exact emulation
// of runtime behavior.
export const setImmediate: typeof timers.setImmediate =
  globalThis.setImmediate || notImplementedAsync("timers.setImmediate");
export const setInterval: typeof timers.setInterval =
  globalThis.setInterval || notImplementedAsync("timers.setInterval");
export const setTimeout: typeof timers.setTimeout =
  globalThis.setTimeout || notImplementedAsync("timers.setTimeout");

export const active = notImplemented("timers.active");
export const _unrefActive = notImplemented("timers._unrefActive");
export const enroll = notImplemented("timers.enroll");
export const unenroll = notImplemented("timers.unenroll");

export default <typeof timers>{
  _unrefActive,
  active,
  clearImmediate,
  clearInterval,
  clearTimeout,
  enroll,
  promises,
  setImmediate,
  setInterval,
  setTimeout,
  unenroll,
};
