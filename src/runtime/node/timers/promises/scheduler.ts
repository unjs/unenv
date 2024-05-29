import type timers from "node:timers/promises";
import { setTimeout, setImmediate } from "node:timers/promises";
import type { TimerOptions } from "node:timers";

export class Scheduler implements timers.Scheduler {
  wait(
    delay?: number | undefined,
    options?: Pick<TimerOptions, "signal"> | undefined,
  ) {
    return setTimeout(delay, undefined, options);
  }
  yield() {
    return setImmediate();
  }
}
