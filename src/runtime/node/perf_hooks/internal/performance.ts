import type perf_hooks from "node:perf_hooks";
import { createNotImplementedError } from "../../../_internal/utils";
import mock from "../../../mock/proxy";
import {
  _Performance,
  _PerformanceEntry,
  _PerformanceMark,
  _PerformanceMeasure,
  _PerformanceObserver,
  _PerformanceObserverEntryList,
  _PerformanceResourceTiming,
} from "../../../web/performance/index";

// Non modified APIs
export {
  PerformanceResourceTiming,
  PerformanceObserverEntryList,
} from "../../../web/performance/index";

// grabbed from Node.js v22.3.0 using:
//   performance.nodeTiming
const nodeTiming = {
  name: "node",
  entryType: "node",
  startTime: 0,
  duration: 305_963.045_666,
  nodeStart: 1.662_124_991_416_931_2,
  v8Start: 44.762_125_015_258_79,
  bootstrapComplete: 49.992_666_006_088_26,
  environment: 46.754_665_970_802_31,
  loopStart: 63.262_040_972_709_656,
  loopExit: -1,
  idleTime: 305_360.555_328,
  // only present in Node.js 18.x
  detail: undefined,
} satisfies Omit<perf_hooks.PerformanceNodeTiming, "toJSON">;

// Performance
export const Performance = class Performance
  extends _Performance<perf_hooks.PerformanceEntry>
  implements perf_hooks.Performance
{
  constructor() {
    super();
  }
  timerify<T extends (...params: any[]) => any>(
    _fn: T,
    _options?: perf_hooks.TimerifyOptions | undefined,
  ): T {
    throw createNotImplementedError("Performance.timerify");
  }

  get nodeTiming(): perf_hooks.PerformanceNodeTiming {
    return {
      ...nodeTiming,
      toJSON: () => nodeTiming,
    };
  }

  eventLoopUtilization() {
    return <perf_hooks.EventLoopUtilization>{};
  }

  mark(name: string, options?: PerformanceMarkOptions | undefined) {
    const entry = super.mark(name, options);
    return entry as any;
  }

  markResourceTiming(
    timingInfo: object,
    requestedUrl: string,
    initiatorType: string,
    global: object,
    cacheMode: string,
    bodyInfo: object,
    responseStatus: number,
    deliveryType?: string,
  ): PerformanceResourceTiming {
    // TODO: create a new PerformanceResourceTiming entry
    // so that performance.getEntries, getEntriesByName, and getEntriesByType return it
    // see: https://nodejs.org/api/perf_hooks.html#performancemarkresourcetimingtiminginfo-requestedurl-initiatortype-global-cachemode-bodyinfo-responsestatus-deliverytype
    return new _PerformanceResourceTiming("");
  }

  measure(
    measureName: string,
    startOrMeasureOptions?: string | PerformanceMeasureOptions | undefined,
    endMark?: string | undefined,
  ) {
    const entry = super.measure(measureName, startOrMeasureOptions, endMark);
    return entry as any;
  }
};

// performance (instance)
export const performance = (globalThis.performance ??
  new Performance()) as unknown as perf_hooks.Performance;

// PerformanceMark
export const PerformanceMark: typeof perf_hooks.PerformanceMark = class PerformanceMark
  extends _PerformanceMark
  implements perf_hooks.PerformanceMark
{
  constructor() {
    // @ts-ignore
    super(...arguments);
  }
  get duration() {
    return 0 as any;
  }
};

// PerformanceEntry
export const PerformanceEntry: typeof perf_hooks.PerformanceEntry = class PerformanceEntry
  extends _PerformanceEntry
  implements perf_hooks.PerformanceEntry
{
  entryType = "event" as any;
  constructor() {
    // @ts-ignore
    super(...arguments);
  }
};

// PerformanceMeasure
export const PerformanceMeasure: typeof perf_hooks.PerformanceMeasure = class PerformanceMeasure
  extends _PerformanceMeasure
  implements perf_hooks.PerformanceMeasure
{
  constructor() {
    // @ts-ignore
    super(...arguments);
  }
};

// PerformanceObserver
export const PerformanceObserver: typeof perf_hooks.PerformanceObserver = class PerformanceObserver
  extends _PerformanceObserver
  implements perf_hooks.PerformanceObserver
{
  constructor(callback: perf_hooks.PerformanceObserverCallback) {
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
