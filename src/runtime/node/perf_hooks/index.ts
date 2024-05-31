import type perf_hooks from "node:perf_hooks";
import { IntervalHistogram, RecordableHistogram } from "./_histogram";
import { constants } from "./constants";
import * as _performance from "./_performance";

export { constants } from "./constants";

export * from "./_performance";

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
  PerformanceObserverEntryList: {} as any,
  PerformanceResourceTiming: {} as any,
};
