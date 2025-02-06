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
import _global from "./global-this.ts";

_global.performance = _global.performance || performance;
_global.Performance = _global.Performance || Performance;
_global.PerformanceEntry = _global.PerformanceEntry || PerformanceEntry;
_global.PerformanceMark = _global.PerformanceMark || PerformanceMark;
_global.PerformanceMeasure = _global.PerformanceMeasure || PerformanceMeasure;
_global.PerformanceObserver =
  _global.PerformanceObserver || PerformanceObserver;
_global.PerformanceObserverEntryList =
  _global.PerformanceObserverEntryList || PerformanceObserverEntryList;
_global.PerformanceResourceTiming =
  _global.PerformanceResourceTiming || PerformanceResourceTiming;

export default _global.performance;
