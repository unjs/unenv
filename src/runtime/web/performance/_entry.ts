export type _PerformanceEntryType = "mark" | "measure" | "resource" | "event";

// https://developer.mozilla.org/en-US/docs/Web/API/PerformanceObserver/supportedEntryTypes_static
export const _supportedEntryTypes: _PerformanceEntryType[] = [
  "event", // PerformanceEntry
  "mark", // PerformanceMark
  "measure", // PerformanceMeasure
  "resource", // PerformanceResourceTiming
] as const;

// https://developer.mozilla.org/en-US/docs/Web/API/PerformanceEntry
export class _PerformanceEntry implements globalThis.PerformanceEntry {
  readonly __unenv__ = true;

  detail: any | undefined;
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
  entryType = "mark" as const;
}

export const PerformanceMark: typeof globalThis.PerformanceMark =
  globalThis.PerformanceMark || _PerformanceMark;

// https://developer.mozilla.org/en-US/docs/Web/API/PerformanceMeasure
export class _PerformanceMeasure
  extends _PerformanceEntry
  implements globalThis.PerformanceMeasure
{
  entryType = "measure" as const;
}

export const PerformanceMeasure: typeof globalThis.PerformanceMeasure =
  globalThis.PerformanceMeasure || _PerformanceMeasure;

// https://developer.mozilla.org/en-US/docs/Web/API/PerformanceResourceTiming
export class _PerformanceResourceTiming
  extends _PerformanceEntry
  implements globalThis.PerformanceResourceTiming
{
  entryType = "resource" as const;
  serverTiming: readonly PerformanceServerTiming[] = [];
  connectEnd: number = 0;
  connectStart: number = 0;
  decodedBodySize: number = 0;
  domainLookupEnd: number = 0;
  domainLookupStart: number = 0;
  encodedBodySize: number = 0;
  fetchStart: number = 0;
  initiatorType = "";
  name = "";
  nextHopProtocol = "";
  redirectEnd: number = 0;
  redirectStart: number = 0;
  requestStart: number = 0;
  responseEnd: number = 0;
  responseStart: number = 0;
  secureConnectionStart: number = 0;
  startTime: number = 0;
  transferSize: number = 0;
  workerStart: number = 0;
  responseStatus: number = 0;
}

export const PerformanceResourceTiming: typeof globalThis.PerformanceResourceTiming =
  globalThis.PerformanceResourceTiming || _PerformanceResourceTiming;
