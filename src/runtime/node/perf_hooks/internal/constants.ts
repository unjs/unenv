import type perf_hooks from "node:perf_hooks";

export const constants = Object.create(
  null,
) satisfies typeof perf_hooks.constants;

// captured from Node.js v22.3.0 using
// Object.getOwnPropertyDescriptors(require('perf_hooks').constants)
Object.defineProperties(constants, {
  NODE_PERFORMANCE_GC_MAJOR: {
    value: 4,
    writable: false,
    enumerable: true,
    configurable: false,
  },
  NODE_PERFORMANCE_GC_MINOR: {
    value: 1,
    writable: false,
    enumerable: true,
    configurable: false,
  },
  NODE_PERFORMANCE_GC_INCREMENTAL: {
    value: 8,
    writable: false,
    enumerable: true,
    configurable: false,
  },
  NODE_PERFORMANCE_GC_WEAKCB: {
    value: 16,
    writable: false,
    enumerable: true,
    configurable: false,
  },
  NODE_PERFORMANCE_GC_FLAGS_NO: {
    value: 0,
    writable: false,
    enumerable: true,
    configurable: false,
  },
  NODE_PERFORMANCE_GC_FLAGS_CONSTRUCT_RETAINED: {
    value: 2,
    writable: false,
    enumerable: true,
    configurable: false,
  },
  NODE_PERFORMANCE_GC_FLAGS_FORCED: {
    value: 4,
    writable: false,
    enumerable: true,
    configurable: false,
  },
  NODE_PERFORMANCE_GC_FLAGS_SYNCHRONOUS_PHANTOM_PROCESSING: {
    value: 8,
    writable: false,
    enumerable: true,
    configurable: false,
  },
  NODE_PERFORMANCE_GC_FLAGS_ALL_AVAILABLE_GARBAGE: {
    value: 16,
    writable: false,
    enumerable: true,
    configurable: false,
  },
  NODE_PERFORMANCE_GC_FLAGS_ALL_EXTERNAL_MEMORY: {
    value: 32,
    writable: false,
    enumerable: true,
    configurable: false,
  },
  NODE_PERFORMANCE_GC_FLAGS_SCHEDULE_IDLE: {
    value: 64,
    writable: false,
    enumerable: true,
    configurable: false,
  },
  NODE_PERFORMANCE_ENTRY_TYPE_GC: {
    value: 0,
    writable: false,
    enumerable: false,
    configurable: false,
  },
  NODE_PERFORMANCE_ENTRY_TYPE_HTTP: {
    value: 1,
    writable: false,
    enumerable: false,
    configurable: false,
  },
  NODE_PERFORMANCE_ENTRY_TYPE_HTTP2: {
    value: 2,
    writable: false,
    enumerable: false,
    configurable: false,
  },
  NODE_PERFORMANCE_ENTRY_TYPE_NET: {
    value: 3,
    writable: false,
    enumerable: false,
    configurable: false,
  },
  NODE_PERFORMANCE_ENTRY_TYPE_DNS: {
    value: 4,
    writable: false,
    enumerable: false,
    configurable: false,
  },
  NODE_PERFORMANCE_MILESTONE_TIME_ORIGIN_TIMESTAMP: {
    value: 0,
    writable: false,
    enumerable: false,
    configurable: false,
  },
  NODE_PERFORMANCE_MILESTONE_TIME_ORIGIN: {
    value: 1,
    writable: false,
    enumerable: false,
    configurable: false,
  },
  NODE_PERFORMANCE_MILESTONE_ENVIRONMENT: {
    value: 2,
    writable: false,
    enumerable: false,
    configurable: false,
  },
  NODE_PERFORMANCE_MILESTONE_NODE_START: {
    value: 3,
    writable: false,
    enumerable: false,
    configurable: false,
  },
  NODE_PERFORMANCE_MILESTONE_V8_START: {
    value: 4,
    writable: false,
    enumerable: false,
    configurable: false,
  },
  NODE_PERFORMANCE_MILESTONE_LOOP_START: {
    value: 5,
    writable: false,
    enumerable: false,
    configurable: false,
  },
  NODE_PERFORMANCE_MILESTONE_LOOP_EXIT: {
    value: 6,
    writable: false,
    enumerable: false,
    configurable: false,
  },
  NODE_PERFORMANCE_MILESTONE_BOOTSTRAP_COMPLETE: {
    value: 7,
    writable: false,
    enumerable: false,
    configurable: false,
  },
});
