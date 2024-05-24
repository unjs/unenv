import mock from "../../mock/proxy";
import type perf_hooks from "node:perf_hooks";
import type { IntervalHistogram } from "node:perf_hooks";
import { constants } from "./constants";

export { constants } from "./constants";

const mockRecordableHistogram = () =>
  Object.create({
    min: 9_223_372_036_854_776_000,
    max: 0,
    mean: null,
    exceeds: 0,
    stddev: null,
    count: 0,
    percentile: {
      100: 0,
    },
  });

function mockIntervalHistogram(): IntervalHistogram {
  return Object.create({
    ...mockRecordableHistogram(),
    enable: () => true,
    disable: () => true,
  });
}

export const Performance: typeof perf_hooks.performance = mock.__createMock__(
  "perf_hooks.Performance",
);
export const PerformanceEntry: typeof perf_hooks.PerformanceEntry =
  mock.__createMock__("perf_hooks.PerformanceEntry");
export const PerformanceMark: typeof perf_hooks.PerformanceMark =
  mock.__createMock__("perf_hooks.PerformanceMark");
export const PerformanceMeasure: typeof perf_hooks.PerformanceMeasure =
  mock.__createMock__("perf_hooks.PerformanceMeasure");
export const PerformanceObserver: typeof perf_hooks.PerformanceObserver =
  mock.__createMock__("perf_hooks.PerformanceObserver");
export const PerformanceObserverEntryList: (typeof perf_hooks.PerformanceEntry)[] =
  mock.__createMock__("perf_hooks.PerformanceObserverEntryList");
export const PerformanceResourceTiming: typeof perf_hooks.PerformanceNodeTiming =
  mock.__createMock__("perf_hooks.PerformanceResourceTiming");

export const createHistogram: typeof perf_hooks.createHistogram = () =>
  mockRecordableHistogram();
export const monitorEventLoopDelay: typeof perf_hooks.monitorEventLoopDelay =
  () => mockIntervalHistogram();

export const performance: typeof perf_hooks.performance = mock.__createMock__(
  "perf_hooks.performance",
);

// Return a real value for performance.now
performance.now = () => Date.now();

// PerformanceNodeTiming is included in the types but doesn't exist in the runtime
export default <Omit<typeof perf_hooks, "PerformanceNodeTiming">>{
  Performance,
  PerformanceEntry,
  PerformanceMark,
  PerformanceMeasure,
  PerformanceObserver,
  PerformanceObserverEntryList,
  PerformanceResourceTiming,
  constants,
  performance,
  createHistogram,
  monitorEventLoopDelay,
};
