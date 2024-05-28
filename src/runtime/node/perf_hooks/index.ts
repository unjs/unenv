import type perf_hooks from "node:perf_hooks";
import type { IntervalHistogram } from "node:perf_hooks";
import * as performanceApis from "../../../web/performance/index";
import { constants } from "./constants";

export { constants } from "./constants";
export * from "../../../web/performance/index";

const mockRecordableHistogram = () =>
  Object.create({
    min: 9_223_372_036_854_776_000,
    max: 0,
    mean: null,
    exceeds: 0,
    stddev: null,
    count: 0,
    percentile: {
      100: 0,
    },
  });

function mockIntervalHistogram(): IntervalHistogram {
  return Object.create({
    ...mockRecordableHistogram(),
    enable: () => true,
    disable: () => true,
  });
}

export const createHistogram: typeof perf_hooks.createHistogram = () =>
  mockRecordableHistogram();
export const monitorEventLoopDelay: typeof perf_hooks.monitorEventLoopDelay =
  () => mockIntervalHistogram();

// PerformanceNodeTiming is included in the types but doesn't exist in the runtime
export default <Omit<typeof perf_hooks, "PerformanceNodeTiming">>{
  ...performanceApis,
  constants,
  createHistogram,
  monitorEventLoopDelay,
};
