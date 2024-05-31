import type timers from "node:timers/promises";
import { Scheduler } from "../internal/scheduler";
import { setTimeoutFallbackPromises } from "../internal/set-timeout";
import { setIntervalFallbackPromises } from "../internal/set-interval";
import { setImmediateFallbackPromises } from "../internal/set-immediate";

export { setTimeoutFallbackPromises as setTimeout } from "../internal/set-timeout";
export { setIntervalFallbackPromises as setInterval } from "../internal/set-interval";
export { setImmediateFallbackPromises as setImmediate } from "../internal/set-immediate";

export const scheduler = new Scheduler();

export default <typeof timers>{
  scheduler,
  setImmediate: setImmediateFallbackPromises,
  setInterval: setIntervalFallbackPromises,
  setTimeout: setTimeoutFallbackPromises,
};
