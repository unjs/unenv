// https://developer.mozilla.org/en-US/docs/Web/API/Performance_API

export { Performance, _Performance, performance } from "./_performance";

export {
  PerformanceObserver,
  _PerformanceObserver,
  PerformanceObserverEntryList,
  _PerformanceObserverEntryList,
} from "./_observer";

export {
  PerformanceEntry,
  _PerformanceEntry,
  PerformanceMark,
  _PerformanceMark,
  PerformanceMeasure,
  _PerformanceMeasure,
  PerformanceResourceTiming,
  _PerformanceResourceTiming,
} from "./_entry";

// Not implemented:
// EventCounts
// PerformanceEventTiming
// PerformanceLongTaskTiming
// PerformanceServerTiming
// TaskAttributionTiming
// LargestContentfulPaint (browser)
// LayoutShift (browser)
// LayoutShiftAttribution (browser)
// VisibilityStateEntry (browser)
// PerformancePaintTiming (browser)
// PerformanceLongAnimationFrameTiming (browser)
// PerformanceScriptTiming (browser)
// PerformanceNavigation (browser)
// PerformanceNavigationTiming (browser)
// PerformanceElementTiming (browser)
