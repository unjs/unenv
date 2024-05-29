import mock from "../../mock/proxy";

// https://developer.mozilla.org/en-US/docs/Web/API/Performance
export const Performance: typeof globalThis.Performance = mock.__createMock__(
  "perf_hooks.Performance",
);

// https://developer.mozilla.org/en-US/docs/Web/API/Performance
const _timeOrigin = Date.now();
export const performance: typeof globalThis.performance =
  globalThis.performance ||
  mock.__createMock__("perf_hooks.performance", {
    // https://developer.mozilla.org/en-US/docs/Web/API/Performance/now
    // performance.now() ~= Date.now()-performance.timeOrigin
    timeOrigin: _timeOrigin,
    now: () => Date.now() - _timeOrigin,
  });

// https://developer.mozilla.org/en-US/docs/Web/API/PerformanceEntry
export const PerformanceEntry: typeof globalThis.PerformanceEntry =
  globalThis.PerformanceEntry ||
  mock.__createMock__("perf_hooks.PerformanceEntry");

// https://developer.mozilla.org/en-US/docs/Web/API/PerformanceMark
export const PerformanceMark: typeof globalThis.PerformanceMark =
  mock.__createMock__("perf_hooks.PerformanceMark");

// https://developer.mozilla.org/en-US/docs/Web/API/PerformanceMeasure
export const PerformanceMeasure: typeof globalThis.PerformanceMeasure =
  globalThis.PerformanceMeasure ||
  mock.__createMock__("perf_hooks.PerformanceMeasure");

// https://developer.mozilla.org/en-US/docs/Web/API/PerformanceObserver
export const PerformanceObserver: globalThis.PerformanceObserver =
  // globalThis.PerformanceObserver || // TODO
  mock.__createMock__("perf_hooks.PerformanceObserver");

// https://developer.mozilla.org/en-US/docs/Web/API/PerformanceObserverEntryList
export const PerformanceObserverEntryList: globalThis.PerformanceEntry[] =
  // globalThis.PerformanceObserverEntryList || // TODO
  mock.__createMock__("perf_hooks.PerformanceObserverEntryList");

// https://developer.mozilla.org/en-US/docs/Web/API/PerformanceResourceTiming
export const PerformanceResourceTiming: typeof globalThis.PerformanceResourceTiming =
  globalThis.PerformanceResourceTiming ||
  mock.__createMock__("perf_hooks.PerformanceResourceTiming");
