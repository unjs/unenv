import { createNotImplementedError } from "../../_internal/utils.ts";
import { _supportedEntryTypes } from "./_entry.ts";

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

export const PerformanceObserver: typeof globalThis.PerformanceObserver =
  globalThis.PerformanceObserver || _PerformanceObserver;

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

export const PerformanceObserverEntryList: typeof globalThis.PerformanceObserverEntryList =
  globalThis.PerformanceObserverEntryList || _PerformanceObserverEntryList;
