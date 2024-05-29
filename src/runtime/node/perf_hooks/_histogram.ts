import type perf_hooks from "node:perf_hooks";
import { createNotImplementedError } from "../../_internal/utils";

class Histogram implements perf_hooks.Histogram {
  buckets: Map<number, number> = new Map();
  min = 9_223_372_036_854_776_000;
  max = 0;
  mean = Number.NaN;
  exceeds = 0;
  stddev = Number.NaN;
  percentiles: Map<number, number> = new Map();
  percentile(percentile: number): number {
    return this.percentiles.get(percentile) ?? Number.NaN;
  }
  reset(): void {
    throw createNotImplementedError("Histogram.reset");
  }
}

export class IntervalHistogram
  extends Histogram
  implements perf_hooks.IntervalHistogram
{
  enable() {
    return true;
  }
  disable() {
    return true;
  }
}

export class RecordableHistogram
  extends Histogram
  implements perf_hooks.RecordableHistogram
{
  record(val: number | bigint): void {
    throw createNotImplementedError("RecordableHistogram.record");
  }
  recordDelta(): void {
    throw createNotImplementedError("RecordableHistogram.recordDelta");
  }
  add(other: perf_hooks.RecordableHistogram): void {
    throw createNotImplementedError("RecordableHistogram.add");
  }
}
