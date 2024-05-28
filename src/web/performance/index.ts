import mock from "../../runtime/mock/proxy";
import type perf_hooks from "node:perf_hooks";

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

export const performance: typeof perf_hooks.performance = mock.__createMock__(
  "perf_hooks.performance",
);

// Return a real value for performance.now
performance.now = () => Date.now();
