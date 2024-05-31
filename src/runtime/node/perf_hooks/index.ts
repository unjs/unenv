import type perf_hooks from "node:perf_hooks";
import { IntervalHistogram, RecordableHistogram } from "./internal/histogram";
import { constants } from "./internal/constants";
import * as _performance from "./internal/performance";
export { constants } from "./internal/constants";

export * from "./internal/performance";

export const monitorEventLoopDelay: typeof perf_hooks.monitorEventLoopDelay =
  function (_options) {
    return new IntervalHistogram();
  };

export const createHistogram: typeof perf_hooks.createHistogram = function (
  _options,
) {
  return new RecordableHistogram();
};

// PerformanceNodeTiming is included in the types but doesn't exist in the runtime
export default <Omit<typeof perf_hooks, "PerformanceNodeTiming">>{
  ..._performance,
  constants,
  createHistogram,
  monitorEventLoopDelay,
};
