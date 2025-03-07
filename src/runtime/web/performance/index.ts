// https://developer.mozilla.org/en-US/docs/Web/API/Performance_API

import {
  type _PerformanceEntryType,
  _PerformanceEntry,
  _PerformanceMark,
  _PerformanceMeasure,
  _PerformanceResourceTiming,
  _Performance,
  _PerformanceObserver,
  _PerformanceObserverEntryList,
} from "./_polyfills.ts";

export {
  type _PerformanceEntryType,
  _PerformanceEntry,
  _PerformanceMark,
  _PerformanceMeasure,
  _PerformanceResourceTiming,
  _Performance,
  _PerformanceObserver,
  _PerformanceObserverEntryList,
} from "./_polyfills.ts";

export const PerformanceEntry: typeof globalThis.PerformanceEntry =
  globalThis.PerformanceEntry || _PerformanceEntry;

export const PerformanceMark: typeof globalThis.PerformanceMark =
  globalThis.PerformanceMark || _PerformanceMark;

export const PerformanceMeasure: typeof globalThis.PerformanceMeasure =
  globalThis.PerformanceMeasure || _PerformanceMeasure;

export const PerformanceResourceTiming: typeof globalThis.PerformanceResourceTiming =
  globalThis.PerformanceResourceTiming || _PerformanceResourceTiming;

export const PerformanceObserver: typeof globalThis.PerformanceObserver =
  globalThis.PerformanceObserver || _PerformanceObserver;

export const Performance: typeof globalThis.Performance =
  globalThis.Performance || _Performance;

export const PerformanceObserverEntryList: typeof globalThis.PerformanceObserverEntryList =
  globalThis.PerformanceObserverEntryList || _PerformanceObserverEntryList;

export const performance: typeof globalThis.performance =
  globalThis.performance || new _Performance();
