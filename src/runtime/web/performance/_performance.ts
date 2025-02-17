import { createNotImplementedError } from "../../_internal/utils.ts";
import { _PerformanceMark, _PerformanceMeasure } from "./_entry.ts";

const _timeOrigin = Date.now();

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

export const Performance: typeof globalThis.Performance =
  globalThis.Performance || _Performance;

export const performance: typeof globalThis.performance =
  globalThis.performance || new Performance();
