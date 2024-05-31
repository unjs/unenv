import { notImplementedAsync } from "../../../_internal/utils";
import type timers from "node:timers/promises";
import { Scheduler } from "../internal/scheduler";

export const setImmediate: typeof timers.setImmediate = notImplementedAsync(
  "timers.setImmediate",
);
export const setTimeout: typeof timers.setTimeout =
  notImplementedAsync("timers.setTimeout");
export const setInterval: typeof timers.setInterval =
  notImplementedAsync("timers.setInterval");

export const scheduler = new Scheduler();

export default <typeof timers>{
  scheduler,
  setImmediate,
  setInterval,
  setTimeout,
};
