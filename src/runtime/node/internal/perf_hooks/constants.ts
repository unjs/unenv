import type perf_hooks from "node:perf_hooks";

// captured from Node.js v22.3.0 using
// Object.getOwnPropertyDescriptors(require('perf_hooks').constants)
const constants: typeof perf_hooks.constants = Object.create(null, {
  NODE_PERFORMANCE_ENTRY_TYPE_GC: {
    value: 0,
    enumerable: false,
  },
  NODE_PERFORMANCE_ENTRY_TYPE_HTTP: {
    value: 1,
    enumerable: false,
  },
  NODE_PERFORMANCE_ENTRY_TYPE_HTTP2: {
    value: 2,
    enumerable: false,
  },
  NODE_PERFORMANCE_ENTRY_TYPE_NET: {
    value: 3,
    enumerable: false,
  },
  NODE_PERFORMANCE_ENTRY_TYPE_DNS: {
    value: 4,
    enumerable: false,
  },
  NODE_PERFORMANCE_MILESTONE_TIME_ORIGIN_TIMESTAMP: {
    value: 0,
    enumerable: false,
  },
  NODE_PERFORMANCE_MILESTONE_TIME_ORIGIN: {
    value: 1,
    enumerable: false,
  },
  NODE_PERFORMANCE_MILESTONE_ENVIRONMENT: {
    value: 2,
    enumerable: false,
  },
  NODE_PERFORMANCE_MILESTONE_NODE_START: {
    value: 3,
    enumerable: false,
  },
  NODE_PERFORMANCE_MILESTONE_V8_START: {
    value: 4,
    enumerable: false,
  },
  NODE_PERFORMANCE_MILESTONE_LOOP_START: {
    value: 5,
    enumerable: false,
  },
  NODE_PERFORMANCE_MILESTONE_LOOP_EXIT: {
    value: 6,
    enumerable: false,
  },
  NODE_PERFORMANCE_MILESTONE_BOOTSTRAP_COMPLETE: {
    value: 7,
    enumerable: false,
  },
});

// add enumerable properties
Object.assign(constants, {
  NODE_PERFORMANCE_GC_MAJOR: 4,
  NODE_PERFORMANCE_GC_MINOR: 1,
  NODE_PERFORMANCE_GC_INCREMENTAL: 8,
  NODE_PERFORMANCE_GC_WEAKCB: 16,
  NODE_PERFORMANCE_GC_FLAGS_NO: 0,
  NODE_PERFORMANCE_GC_FLAGS_CONSTRUCT_RETAINED: 2,
  NODE_PERFORMANCE_GC_FLAGS_FORCED: 4,
  NODE_PERFORMANCE_GC_FLAGS_SYNCHRONOUS_PHANTOM_PROCESSING: 8,
  NODE_PERFORMANCE_GC_FLAGS_ALL_AVAILABLE_GARBAGE: 16,
  NODE_PERFORMANCE_GC_FLAGS_ALL_EXTERNAL_MEMORY: 32,
  NODE_PERFORMANCE_GC_FLAGS_SCHEDULE_IDLE: 64,
});

Object.freeze(constants);

export { constants };
