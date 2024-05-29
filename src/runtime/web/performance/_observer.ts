import { createNotImplementedError } from "../../_internal/utils";
import { supportedEntryTypes } from "./_entry";

// https://developer.mozilla.org/en-US/docs/Web/API/PerformanceObserver
export const PerformanceObserver: typeof globalThis.PerformanceObserver =
  globalThis.PerformanceObserver ||
  class _PerformanceObserver implements globalThis.PerformanceObserver {
    static supportedEntryTypes: ReadonlyArray<string> = supportedEntryTypes;

    _callback: PerformanceObserverCallback | null = null;

    constructor(callback: PerformanceObserverCallback) {
      this._callback = callback;
    }

    takeRecords(): PerformanceEntryList {
      return [];
    }

    disconnect(): void {
      throw createNotImplementedError("PerformanceObserver.disconnect");
    }

    observe(options: PerformanceObserverInit): void {
      throw createNotImplementedError("PerformanceObserver.observe");
    }
  };

// https://developer.mozilla.org/en-US/docs/Web/API/PerformanceObserverEntryList
export const PerformanceObserverEntryList: typeof globalThis.PerformanceObserverEntryList =
  globalThis.PerformanceObserverEntryList ||
  class _PerformanceObserverEntryList
    implements globalThis.PerformanceObserverEntryList
  {
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
  };
