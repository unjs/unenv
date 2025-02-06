import type perf_hooks from "node:perf_hooks";
import {
  IntervalHistogram,
  RecordableHistogram,
} from "./internal/perf_hooks/histogram.ts";
import { constants } from "./internal/perf_hooks/constants.ts";
import {
  performance,
  Performance,
  PerformanceEntry,
  PerformanceMark,
  PerformanceMeasure,
  PerformanceObserverEntryList,
  PerformanceObserver,
  PerformanceResourceTiming,
} from "./internal/perf_hooks/performance.ts";
export { constants } from "./internal/perf_hooks/constants.ts";

export * from "./internal/perf_hooks/performance.ts";

export const monitorEventLoopDelay: typeof perf_hooks.monitorEventLoopDelay =
  function (_options) {
    return new IntervalHistogram();
  };

export const createHistogram: typeof perf_hooks.createHistogram = function (
  _options,
) {
  return new RecordableHistogram();
};

export default {
  Performance,
  PerformanceMark,
  // @ts-expect-error TODO: resolve type-mismatch between web and node
  PerformanceEntry,
  // @ts-expect-error TODO: resolve type-mismatch between web and node
  PerformanceMeasure,
  // @ts-expect-error TODO: resolve type-mismatch between web and node
  PerformanceObserverEntryList,
  PerformanceObserver,
  // @ts-expect-error TODO: resolve type-mismatch between web and node
  PerformanceResourceTiming,
  constants,
  createHistogram,
  monitorEventLoopDelay,
  performance,
} satisfies Omit<typeof perf_hooks, "PerformanceNodeTiming">; // @types/node bug: PerformanceNodeTiming is included in the types but doesn't exist in the runtime
