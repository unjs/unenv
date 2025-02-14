import type nodePerfHooks from "node:perf_hooks";
import { createNotImplementedError } from "../../../_internal/utils.ts";
import {
  _Performance,
  _PerformanceMark,
  _PerformanceMeasure,
  _PerformanceObserver,
  _PerformanceObserverEntryList,
  _PerformanceResourceTiming,
} from "../../../web/performance/index.ts";

// Non modified APIs
export {
  PerformanceResourceTiming,
  PerformanceObserverEntryList,
  PerformanceEntry,
  PerformanceMeasure,
} from "../../../web/performance/index.ts";

const nodeTiming = {
  name: "node",
  entryType: "node",
  startTime: 0,
  duration: 0,
  nodeStart: 0,
  v8Start: 0,
  bootstrapComplete: 0,
  environment: 0,
  loopStart: 0,
  loopExit: 0,
  idleTime: 0,
  uvMetricsInfo: { loopCount: 0, events: 0, eventsWaiting: 0 },
  // only present in Node.js 18.x
  detail: undefined,
} satisfies Omit<nodePerfHooks.PerformanceNodeTiming, "toJSON">;

// Performance
export const Performance = class Performance
  extends _Performance<nodePerfHooks.PerformanceEntry>
  implements nodePerfHooks.Performance
{
  constructor() {
    super();
  }
  timerify<T extends (...params: any[]) => any>(
    _fn: T,
    _options?: nodePerfHooks.TimerifyOptions | undefined,
  ): T {
    throw createNotImplementedError("Performance.timerify");
  }

  get nodeTiming(): nodePerfHooks.PerformanceNodeTiming {
    return {
      ...nodeTiming,
      toJSON: () => nodeTiming,
    };
  }

  eventLoopUtilization() {
    return {} as nodePerfHooks.EventLoopUtilization;
  }

  mark(name: string, options?: PerformanceMarkOptions | undefined) {
    const entry = super.mark(name, options);
    return entry as any;
  }

  measure(
    measureName: string,
    startOrMeasureOptions?: string | PerformanceMeasureOptions | undefined,
    endMark?: string | undefined,
  ) {
    const entry = super.measure(measureName, startOrMeasureOptions, endMark);
    return entry as any;
  }

  markResourceTiming(
    timingInfo: object,
    requestedUrl: string,
    initiatorType: string,
    global: object,
    cacheMode: "" | "local",
    bodyInfo: object,
    responseStatus: number,
    deliveryType?: string,
  ): nodePerfHooks.PerformanceResourceTiming {
    // TODO: create a new PerformanceResourceTiming entry
    // so that performance.getEntries, getEntriesByName, and getEntriesByType return it
    // see: https://nodejs.org/api/perf_hooks.html#performancemarkresourcetimingtiminginfo-requestedurl-initiatortype-global-cachemode-bodyinfo-responsestatus-deliverytype
    return new _PerformanceResourceTiming("");
  }
};

// performance (instance)
export const performance = (globalThis.performance ??
  new Performance()) as unknown as nodePerfHooks.Performance;

// PerformanceMark
export const PerformanceMark: typeof nodePerfHooks.PerformanceMark = class PerformanceMark
  extends _PerformanceMark
  implements nodePerfHooks.PerformanceMark
{
  constructor() {
    // @ts-ignore
    super(...arguments);
  }
  get duration() {
    return 0 as any;
  }
};

// PerformanceObserver
export const PerformanceObserver: typeof nodePerfHooks.PerformanceObserver = class PerformanceObserver
  extends _PerformanceObserver
  implements nodePerfHooks.PerformanceObserver
{
  static override supportedEntryTypes = [
    // Web
    "event",
    "mark",
    "measure",
    "resource",
    // Node
    "dns",
    "function",
    "gc",
    "http",
    "http2",
    "net",
  ] as any[] /* sadly types mismatch */;

  constructor(callback: nodePerfHooks.PerformanceObserverCallback) {
    super(callback as any);
  }

  observe(options: any): void {
    throw createNotImplementedError("PerformanceObserver.observe");
  }
  bind<Func extends (...args: any[]) => any>(fn: Func): Func {
    return fn;
  }
  runInAsyncScope<This, Result>(
    fn: (this: This, ...args: any[]) => Result,
    thisArg?: This | undefined,
    ...args: any[]
  ) {
    return fn.call(thisArg as any, ...args);
  }
  asyncId(): number {
    return 0;
  }
  triggerAsyncId(): number {
    return 0;
  }
  emitDestroy(): this {
    return this;
  }
};
