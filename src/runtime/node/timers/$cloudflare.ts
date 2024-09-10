import { notImplemented } from "../../_internal/utils";
import noop from "../../mock/noop";
import type timers from "node:timers";
import promises from "./promises";
import { setTimeoutFallback } from "./internal/set-timeout";
import {
  setImmediateFallback as setImmediate,
  clearImmediateFallback as clearImmediate,
} from "./internal/set-immediate";
import { setIntervalFallback } from "./internal/set-interval";

// Always use the polyfill rather than the worked implementation.
//
// NOTE:
// `setImmediate` and `clearImmediate` must be function (re)exports.
// `export const setImmediate = ...` might cause esbuild to generate invalid code.
export {
  setImmediateFallback as setImmediate,
  clearImmediateFallback as clearImmediate,
} from "./internal/set-immediate";

export * as promises from "./promises";

export const clearInterval: typeof timers.clearInterval =
  globalThis.clearInterval || noop;
export const clearTimeout: typeof timers.clearTimeout =
  globalThis.clearTimeout || noop;

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
