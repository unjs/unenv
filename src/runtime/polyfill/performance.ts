import {
  performance,
  Performance,
  PerformanceEntry,
  PerformanceMark,
  PerformanceMeasure,
  PerformanceObserver,
  PerformanceObserverEntryList,
  PerformanceResourceTiming,
} from "../web/performance/index.ts";

globalThis.performance = globalThis.performance || performance;
globalThis.Performance = globalThis.Performance || Performance;
globalThis.PerformanceEntry = globalThis.PerformanceEntry || PerformanceEntry;
globalThis.PerformanceMark = globalThis.PerformanceMark || PerformanceMark;
globalThis.PerformanceMeasure =
  globalThis.PerformanceMeasure || PerformanceMeasure;
globalThis.PerformanceObserver =
  globalThis.PerformanceObserver || PerformanceObserver;
globalThis.PerformanceObserverEntryList =
  globalThis.PerformanceObserverEntryList || PerformanceObserverEntryList;
globalThis.PerformanceResourceTiming =
  globalThis.PerformanceResourceTiming || PerformanceResourceTiming;

export default globalThis.performance;
