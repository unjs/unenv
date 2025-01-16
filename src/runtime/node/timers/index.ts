import { notImplemented } from "../../_internal/utils";
import noop from "../../mock/noop";
import type nodeTimers from "node:timers";
import promises from "./promises";
import { setTimeoutFallback } from "./internal/set-timeout";
import {
  setImmediateFallback,
  clearImmediateFallback,
} from "./internal/set-immediate";
import { setIntervalFallback } from "./internal/set-interval";

export * as promises from "./promises";

export const clearImmediate: typeof nodeTimers.clearImmediate =
  globalThis.clearImmediate?.bind(globalThis) || clearImmediateFallback;
export const clearInterval: typeof nodeTimers.clearInterval =
  globalThis.clearInterval?.bind(globalThis) || noop;
export const clearTimeout: typeof nodeTimers.clearTimeout =
  globalThis.clearTimeout?.bind(globalThis) || noop;

export const setImmediate: typeof nodeTimers.setImmediate =
  globalThis.setImmediate?.bind(globalThis) || setImmediateFallback;
export const setTimeout: typeof nodeTimers.setTimeout =
  globalThis.setTimeout?.bind(globalThis) || setTimeoutFallback;
export const setInterval: typeof nodeTimers.setInterval =
  globalThis.setInterval?.bind(globalThis) || setIntervalFallback;

export const active = function active(timeout: NodeJS.Timeout | undefined) {
  timeout?.refresh?.();
};
export const _unrefActive = active;
export const enroll = notImplemented("timers.enroll");
export const unenroll = notImplemented("timers.unenroll");

export default {
  // @ts-expect-error: deprecated
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
} satisfies typeof nodeTimers;
