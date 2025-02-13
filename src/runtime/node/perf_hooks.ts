import type nodePerfHooks from "node:perf_hooks";

import {
  IntervalHistogram,
  RecordableHistogram,
} from "./internal/perf_hooks/histogram.ts";

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

export * from "./internal/perf_hooks/performance.ts";

// prettier-ignore
import {
  NODE_PERFORMANCE_GC_MAJOR, NODE_PERFORMANCE_GC_MINOR, NODE_PERFORMANCE_GC_INCREMENTAL, NODE_PERFORMANCE_GC_WEAKCB, NODE_PERFORMANCE_GC_FLAGS_NO, NODE_PERFORMANCE_GC_FLAGS_CONSTRUCT_RETAINED, NODE_PERFORMANCE_GC_FLAGS_FORCED, NODE_PERFORMANCE_GC_FLAGS_SYNCHRONOUS_PHANTOM_PROCESSING, NODE_PERFORMANCE_GC_FLAGS_ALL_AVAILABLE_GARBAGE, NODE_PERFORMANCE_GC_FLAGS_ALL_EXTERNAL_MEMORY, NODE_PERFORMANCE_GC_FLAGS_SCHEDULE_IDLE, NODE_PERFORMANCE_ENTRY_TYPE_GC, NODE_PERFORMANCE_ENTRY_TYPE_HTTP, NODE_PERFORMANCE_ENTRY_TYPE_HTTP2, NODE_PERFORMANCE_ENTRY_TYPE_NET, NODE_PERFORMANCE_ENTRY_TYPE_DNS, NODE_PERFORMANCE_MILESTONE_TIME_ORIGIN_TIMESTAMP, NODE_PERFORMANCE_MILESTONE_TIME_ORIGIN, NODE_PERFORMANCE_MILESTONE_ENVIRONMENT, NODE_PERFORMANCE_MILESTONE_NODE_START, NODE_PERFORMANCE_MILESTONE_V8_START, NODE_PERFORMANCE_MILESTONE_LOOP_START, NODE_PERFORMANCE_MILESTONE_LOOP_EXIT, NODE_PERFORMANCE_MILESTONE_BOOTSTRAP_COMPLETE
} from "./internal/constants/perf_hooks.ts";

// prettier-ignore
export const constants = {
  NODE_PERFORMANCE_GC_MAJOR, NODE_PERFORMANCE_GC_MINOR, NODE_PERFORMANCE_GC_INCREMENTAL, NODE_PERFORMANCE_GC_WEAKCB, NODE_PERFORMANCE_GC_FLAGS_NO, NODE_PERFORMANCE_GC_FLAGS_CONSTRUCT_RETAINED, NODE_PERFORMANCE_GC_FLAGS_FORCED, NODE_PERFORMANCE_GC_FLAGS_SYNCHRONOUS_PHANTOM_PROCESSING, NODE_PERFORMANCE_GC_FLAGS_ALL_AVAILABLE_GARBAGE, NODE_PERFORMANCE_GC_FLAGS_ALL_EXTERNAL_MEMORY, NODE_PERFORMANCE_GC_FLAGS_SCHEDULE_IDLE, NODE_PERFORMANCE_ENTRY_TYPE_GC, NODE_PERFORMANCE_ENTRY_TYPE_HTTP, NODE_PERFORMANCE_ENTRY_TYPE_HTTP2, NODE_PERFORMANCE_ENTRY_TYPE_NET, NODE_PERFORMANCE_ENTRY_TYPE_DNS, NODE_PERFORMANCE_MILESTONE_TIME_ORIGIN_TIMESTAMP, NODE_PERFORMANCE_MILESTONE_TIME_ORIGIN, NODE_PERFORMANCE_MILESTONE_ENVIRONMENT, NODE_PERFORMANCE_MILESTONE_NODE_START, NODE_PERFORMANCE_MILESTONE_V8_START, NODE_PERFORMANCE_MILESTONE_LOOP_START, NODE_PERFORMANCE_MILESTONE_LOOP_EXIT, NODE_PERFORMANCE_MILESTONE_BOOTSTRAP_COMPLETE
} as unknown as typeof nodePerfHooks.constants;

export const monitorEventLoopDelay: typeof nodePerfHooks.monitorEventLoopDelay =
  function (_options) {
    return new IntervalHistogram();
  };

export const createHistogram: typeof nodePerfHooks.createHistogram = function (
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
} satisfies Omit<typeof nodePerfHooks, "PerformanceNodeTiming">; // @types/node bug: PerformanceNodeTiming is included in the types but doesn't exist in the runtime
