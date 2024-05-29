import mock from "../../mock/proxy";

// https://developer.mozilla.org/en-US/docs/Web/API/Performance
export const Performance: typeof globalThis.Performance = mock.__createMock__(
  "perf_hooks.Performance",
);

// https://developer.mozilla.org/en-US/docs/Web/API/Performance
type Writeable<T> = { -readonly [P in keyof T]: T[P] };
export const performance: Writeable<typeof globalThis.performance> =
  mock.__createMock__("perf_hooks.performance");

// https://developer.mozilla.org/en-US/docs/Web/API/Performance/now
// performance.now() ~= Date.now()-performance.timeOrigin
performance.timeOrigin = Date.now();
performance.now = () => Date.now() - performance.timeOrigin;

// https://developer.mozilla.org/en-US/docs/Web/API/PerformanceEntry
export const PerformanceEntry: typeof globalThis.PerformanceEntry =
  globalThis.PerformanceEntry ||
  mock.__createMock__("perf_hooks.PerformanceEntry");

// https://developer.mozilla.org/en-US/docs/Web/API/PerformanceMark
export const PerformanceMark: typeof globalThis.PerformanceMark =
  mock.__createMock__("perf_hooks.PerformanceMark");

// https://developer.mozilla.org/en-US/docs/Web/API/PerformanceMeasure
export const PerformanceMeasure: typeof globalThis.PerformanceMeasure =
  mock.__createMock__("perf_hooks.PerformanceMeasure");

// https://developer.mozilla.org/en-US/docs/Web/API/PerformanceObserver
export const PerformanceObserver: globalThis.PerformanceObserver =
  mock.__createMock__("perf_hooks.PerformanceObserver");

// https://developer.mozilla.org/en-US/docs/Web/API/PerformanceObserverEntryList
export const PerformanceObserverEntryList: globalThis.PerformanceEntry[] =
  mock.__createMock__("perf_hooks.PerformanceObserverEntryList");

// https://developer.mozilla.org/en-US/docs/Web/API/PerformanceResourceTiming
export const PerformanceResourceTiming: typeof globalThis.PerformanceResourceTiming =
  mock.__createMock__("perf_hooks.PerformanceResourceTiming");
