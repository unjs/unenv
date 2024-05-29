import type perf_hooks from "node:perf_hooks";

export class IntervalHistogram implements perf_hooks.IntervalHistogram {
  reset(): void {
    throw new Error("Method not implemented.");
  }
  min = 9_223_372_036_854_776_000;
  max = 0;
  mean = Number.NaN;
  exceeds = 0;
  stddev = Number.NaN;
  count = 0;
  percentiles: Map<number, number> = new Map();
  buckets: Map<number, number> = new Map();
  percentile(percentile: number): number {
    return this.percentiles.get(percentile) ?? Number.NaN;
  }
  enable() {
    return true;
  }
  disable() {
    return true;
  }
}

export class RecordableHistogram implements perf_hooks.RecordableHistogram {
  min = 9_223_372_036_854_776_000;
  max = 0;
  mean = Number.NaN;
  exceeds = 0;
  stddev = Number.NaN;
  count = 0;
  percentiles: Map<number, number> = new Map();
  buckets: Map<number, number> = new Map();
  percentile(percentile: number): number {
    return this.percentiles.get(percentile) ?? Number.NaN;
  }
  reset(): void {
    throw new Error("Method not implemented.");
  }
  record(val: number | bigint): void {
    throw new Error("Method not implemented.");
  }
  recordDelta(): void {
    throw new Error("Method not implemented.");
  }
  add(other: perf_hooks.RecordableHistogram): void {
    throw new Error("Method not implemented.");
  }
}
