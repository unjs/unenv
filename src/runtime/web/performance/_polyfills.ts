import { createNotImplementedError } from "../../_internal/utils.ts";

export type _PerformanceEntryType = "mark" | "measure" | "resource" | "event";

const _timeOrigin = Date.now();

// --------------------------------------
// Performance entry polyfills
// --------------------------------------

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

// https://developer.mozilla.org/en-US/docs/Web/API/PerformanceMark
export class _PerformanceMark
  extends _PerformanceEntry
  implements globalThis.PerformanceMark
{
  entryType = "mark" as const;
}

// https://developer.mozilla.org/en-US/docs/Web/API/PerformanceMeasure
export class _PerformanceMeasure
  extends _PerformanceEntry
  implements globalThis.PerformanceMeasure
{
  entryType = "measure" as const;
}

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

// --------------------------------------
// PerformanceObserver polyfill
// --------------------------------------

// https://developer.mozilla.org/en-US/docs/Web/API/PerformanceObserver
export class _PerformanceObserver implements globalThis.PerformanceObserver {
  readonly __unenv__ = true;

  static supportedEntryTypes: ReadonlyArray<string> = _supportedEntryTypes;

  _callback: PerformanceObserverCallback | null = null;

  constructor(callback: PerformanceObserverCallback) {
    this._callback = callback;
  }

  takeRecords() {
    return [];
  }

  disconnect(): void {
    throw createNotImplementedError("PerformanceObserver.disconnect");
  }

  observe(options: PerformanceObserverInit): void {
    throw createNotImplementedError("PerformanceObserver.observe");
  }
}

// https://developer.mozilla.org/en-US/docs/Web/API/PerformanceObserverEntryList
export class _PerformanceObserverEntryList
  implements globalThis.PerformanceObserverEntryList
{
  readonly __unenv__ = true;

  getEntries(): PerformanceEntryList {
    return [];
  }

  getEntriesByName(
    _name: string,
    _type?: string | undefined,
  ): PerformanceEntryList {
    return [];
  }

  getEntriesByType(type: string): PerformanceEntryList {
    return [];
  }
}

// --------------------------------------
// Performance polyfill
// --------------------------------------

// https://developer.mozilla.org/en-US/docs/Web/API/Performance
export class _Performance<
  PerformanceEntryT extends PerformanceEntry = PerformanceEntry,
> implements globalThis.Performance
{
  readonly __unenv__ = true;

  timeOrigin: number = _timeOrigin;

  eventCounts: EventCounts = new Map<string, number>();

  _entries: PerformanceEntry[] = [];
  _resourceTimingBufferSize = 0;

  navigation = undefined as any;
  timing = undefined as any;

  onresourcetimingbufferfull: ((this: Performance, ev: Event) => any) | null =
    null;

  now(): number {
    // https://developer.mozilla.org/en-US/docs/Web/API/Performance/now
    // Prefer performance.now() if available
    if (globalThis?.performance?.now && this.timeOrigin === _timeOrigin) {
      return globalThis.performance.now();
    }
    // performance.now() - (Date.now()-performance.timeOrigin) ~= 0
    return Date.now() - this.timeOrigin;
  }

  clearMarks(markName?: string | undefined): void {
    this._entries = markName
      ? this._entries.filter((e) => e.name !== markName)
      : this._entries.filter((e) => e.entryType !== "mark");
  }

  clearMeasures(measureName?: string | undefined): void {
    this._entries = measureName
      ? this._entries.filter((e) => e.name !== measureName)
      : this._entries.filter((e) => e.entryType !== "measure");
  }

  clearResourceTimings(): void {
    this._entries = this._entries.filter(
      (e) =>
        e.entryType !== "resource" || (e.entryType as any) !== "navigation",
    );
  }

  getEntries(): PerformanceEntryT[] {
    return this._entries as PerformanceEntryT[];
  }

  getEntriesByName(
    name: string,
    type?: string | undefined,
  ): PerformanceEntryT[] {
    return this._entries.filter(
      (e) => e.name === name && (!type || e.entryType === type),
    ) as PerformanceEntryT[];
  }

  getEntriesByType(type: string): PerformanceEntryT[] {
    return this._entries.filter(
      (e) => e.entryType === type,
    ) as PerformanceEntryT[];
  }

  mark(
    name: string,
    options?: PerformanceMarkOptions | undefined,
  ): PerformanceMark {
    const entry = new _PerformanceMark(name, options);
    this._entries.push(entry);
    return entry;
  }

  measure(
    measureName: string,
    startOrMeasureOptions?: string | PerformanceMeasureOptions,
    endMark?: string,
  ): PerformanceMeasure {
    let start: number;
    let end: number;
    if (typeof startOrMeasureOptions === "string") {
      start = this.getEntriesByName(startOrMeasureOptions, "mark")[0]
        ?.startTime;
      end = this.getEntriesByName(endMark!, "mark")[0]?.startTime;
    } else {
      start =
        Number.parseFloat(startOrMeasureOptions?.start as string) || this.now();
      end =
        Number.parseFloat(startOrMeasureOptions?.end as string) || this.now();
    }
    const entry = new _PerformanceMeasure(measureName, {
      startTime: start,
      detail: { start, end },
    });
    this._entries.push(entry);
    return entry;
  }

  setResourceTimingBufferSize(maxSize: number): void {
    this._resourceTimingBufferSize = maxSize;
  }

  toJSON() {
    return this;
  }

  addEventListener<K extends "resourcetimingbufferfull">(
    type: K,
    listener: (this: Performance, ev: PerformanceEventMap[K]) => any,
    options?: boolean | AddEventListenerOptions | undefined,
  ): void;
  addEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | AddEventListenerOptions | undefined,
  ): void;
  addEventListener(type: unknown, listener: unknown, options?: unknown): void {
    throw createNotImplementedError("Performance.addEventListener");
  }

  removeEventListener<K extends "resourcetimingbufferfull">(
    type: K,
    listener: (this: Performance, ev: PerformanceEventMap[K]) => any,
    options?: boolean | EventListenerOptions | undefined,
  ): void;
  removeEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | EventListenerOptions | undefined,
  ): void;
  removeEventListener(
    type: unknown,
    listener: unknown,
    options?: unknown,
  ): void {
    throw createNotImplementedError("Performance.removeEventListener");
  }

  dispatchEvent(event: Event): boolean {
    throw createNotImplementedError("Performance.dispatchEvent");
  }
}
