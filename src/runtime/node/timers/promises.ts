import type timers from "node:timers/promises";
import { Scheduler } from "../internal/timers/scheduler.ts";
import { setTimeoutFallbackPromises } from "../internal/timers/set-timeout.ts";
import { setIntervalFallbackPromises } from "../internal/timers/set-interval.ts";
import { setImmediateFallbackPromises } from "../internal/timers/set-immediate.ts";

export { setTimeoutFallbackPromises as setTimeout } from "../internal/timers/set-timeout.ts";
export { setIntervalFallbackPromises as setInterval } from "../internal/timers/set-interval.ts";
export { setImmediateFallbackPromises as setImmediate } from "../internal/timers/set-immediate.ts";

export const scheduler = new Scheduler();

export default <typeof timers>{
  scheduler,
  setImmediate: setImmediateFallbackPromises,
  setInterval: setIntervalFallbackPromises,
  setTimeout: setTimeoutFallbackPromises,
};
