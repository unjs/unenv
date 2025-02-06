import type timers from "node:timers/promises";
import { Scheduler } from "../internal/timers/scheduler";
import { setTimeoutFallbackPromises } from "../internal/timers/set-timeout";
import { setIntervalFallbackPromises } from "../internal/timers/set-interval";
import { setImmediateFallbackPromises } from "../internal/timers/set-immediate";

export { setTimeoutFallbackPromises as setTimeout } from "../internal/timers/set-timeout";
export { setIntervalFallbackPromises as setInterval } from "../internal/timers/set-interval";
export { setImmediateFallbackPromises as setImmediate } from "../internal/timers/set-immediate";

export const scheduler = new Scheduler();

export default <typeof timers>{
  scheduler,
  setImmediate: setImmediateFallbackPromises,
  setInterval: setIntervalFallbackPromises,
  setTimeout: setTimeoutFallbackPromises,
};
