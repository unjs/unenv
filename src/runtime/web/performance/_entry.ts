// https://developer.mozilla.org/en-US/docs/Web/API/PerformanceObserver/supportedEntryTypes_static
export const _supportedEntryTypes = [
  "event", // PerformanceEntry
  "mark", // PerformanceMark
  "measure", // PerformanceMeasure
  "resource", // PerformanceResourceTiming
] as const;
export type _PerformanceEntryType = (typeof _supportedEntryTypes)[number];

// https://developer.mozilla.org/en-US/docs/Web/API/PerformanceEntry
export class _PerformanceEntry implements globalThis.PerformanceEntry {
  readonly __unenv__ = true;

  detail: any;
  entryType: _PerformanceEntryType = "event";

  name: string;
  startTime: number;

  constructor(name: string, options?: PerformanceMarkOptions) {
    this.name = name;
    this.startTime = options?.startTime || performance.now();
    this.detail = options?.detail;
  }

  get duration(): number {
    return performance.now() - this.startTime;
  }

  toJSON() {
    return {
      name: this.name,
      entryType: this.entryType,
      startTime: this.startTime,
      duration: this.duration,
      detail: this.detail,
    };
  }
}

export const PerformanceEntry: typeof globalThis.PerformanceEntry =
  globalThis.PerformanceEntry || _PerformanceEntry;

// https://developer.mozilla.org/en-US/docs/Web/API/PerformanceMark
export class _PerformanceMark
  extends _PerformanceEntry
  implements globalThis.PerformanceMark
{
  entryType: _PerformanceEntryType = "mark";
}

export const PerformanceMark: typeof globalThis.PerformanceMark =
  globalThis.PerformanceMark || _PerformanceMark;

// https://developer.mozilla.org/en-US/docs/Web/API/PerformanceMeasure
export class _PerformanceMeasure
  extends _PerformanceEntry
  implements globalThis.PerformanceMeasure
{
  entryType: _PerformanceEntryType = "measure";
}

export const PerformanceMeasure: typeof globalThis.PerformanceMeasure =
  globalThis.PerformanceMeasure || _PerformanceMeasure;

// https://developer.mozilla.org/en-US/docs/Web/API/PerformanceResourceTiming
export class _PerformanceResourceTiming
  extends _PerformanceEntry
  implements globalThis.PerformanceResourceTiming
{
  entryType: _PerformanceEntryType = "resource";
  serverTiming: readonly PerformanceServerTiming[] = [];
  connectEnd = 0;
  connectStart = 0;
  decodedBodySize = 0;
  domainLookupEnd = 0;
  domainLookupStart = 0;
  encodedBodySize = 0;
  fetchStart = 0;
  initiatorType = "";
  name = "";
  nextHopProtocol = "";
  redirectEnd = 0;
  redirectStart = 0;
  requestStart = 0;
  responseEnd = 0;
  responseStart = 0;
  secureConnectionStart = 0;
  startTime = 0;
  transferSize = 0;
  workerStart = 0;
}

export const PerformanceResourceTiming: typeof globalThis.PerformanceResourceTiming =
  globalThis.PerformanceResourceTiming || _PerformanceResourceTiming;
