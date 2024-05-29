import type perf_hooks from "node:perf_hooks";
import * as performanceApis from "../../web/performance/index";
import { IntervalHistogram, RecordableHistogram } from "./_histogram";
import { constants } from "./constants";

export { constants } from "./constants";
export * from "../../web/performance";

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
  ...performanceApis,
  constants,
  createHistogram,
  monitorEventLoopDelay,
};
