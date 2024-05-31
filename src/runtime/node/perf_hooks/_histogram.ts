import type perf_hooks from "node:perf_hooks";
import { createNotImplementedError } from "../../_internal/utils";

class Histogram implements perf_hooks.Histogram {
  min = 9_223_372_036_854_776_000;
  max = 0;
  mean = Number.NaN;
  exceeds = 0;
  stddev = Number.NaN;
  count: number = 0;
  countBigInt: bigint = BigInt(0);
  exceedsBigInt: bigint = BigInt(0);
  maxBigInt: number = 0;
  minBigInt: bigint = BigInt(9_223_372_036_854_775_807n);
  percentiles: Map<number, number> = new Map();
  percentilesBigInt: Map<bigint, bigint> = new Map();
  percentileBigInt(_percentile: number): bigint {
    throw createNotImplementedError("Histogram.percentileBigInt");
  }
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
