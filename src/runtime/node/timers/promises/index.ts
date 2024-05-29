import { notImplementedAsync } from "../../../_internal/utils";
import type { TimerOptions } from "node:timers";
import type timers from "node:timers/promises";

export class Scheduler implements timers.Scheduler {
  wait(
    delay?: number | undefined,
    options?: Pick<TimerOptions, "signal"> | undefined,
  ) {
    return Promise.resolve();
  }
  yield() {
    return Promise.resolve();
  }
}

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
