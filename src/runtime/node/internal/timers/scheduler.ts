import timers from "node:timers/promises";
import type { TimerOptions } from "node:timers";

import { setTimeoutFallbackPromises as setTimeout } from "./set-timeout";
import { setImmediateFallbackPromises as setImmediate } from "./set-immediate";

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
