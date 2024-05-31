import type timers from "node:timers/promises";
import { Scheduler } from "./scheduler";
import { setTimeoutFallbackPromises } from "../set-timeout";
import { setIntervalFallbackPromises } from "../set-interval";
import { setImmediateFallbackPromises } from "../set-immediate";

export { setTimeoutFallbackPromises as setTimeout } from "../set-timeout";
export { setIntervalFallbackPromises as setInterval } from "../set-interval";
export { setImmediateFallbackPromises as setImmediate } from "../set-immediate";

export const scheduler = new Scheduler();

export default <typeof timers>{
  scheduler,
  setImmediate: setImmediateFallbackPromises,
  setInterval: setIntervalFallbackPromises,
  setTimeout: setTimeoutFallbackPromises,
};
