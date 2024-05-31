import { notImplemented, notImplementedAsync } from "../../_internal/utils";
import noop from "../../mock/noop";
import type timers from "node:timers";
import promises from "./promises";
import { setTimeoutFallback } from "./set-timeout";
import { setImmediateFallback } from "./set-immediate";
import { setIntervalFallback } from "./set-interval";

export * as promises from "./promises";

export const clearImmediate: typeof timers.clearImmediate =
  globalThis.clearImmediate || noop;
export const clearInterval: typeof timers.clearInterval =
  globalThis.clearInterval || noop;
export const clearTimeout: typeof timers.clearTimeout =
  globalThis.clearTimeout || noop;

export const setImmediate: typeof timers.setImmediate =
  globalThis.setImmediate || setImmediateFallback;
export const setTimeout: typeof timers.setTimeout =
  globalThis.setTimeout || setTimeoutFallback;
export const setInterval: typeof timers.setInterval =
  globalThis.setInterval || setIntervalFallback;

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
