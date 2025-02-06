import type trace_events from "node:trace_events";
import { Tracing } from "./internal/trace_events/tracing.ts";

export const createTracing: typeof trace_events.createTracing = function () {
  return new Tracing();
};
export const getEnabledCategories: typeof trace_events.getEnabledCategories =
  () => "";

export default {
  createTracing,
  getEnabledCategories,
} satisfies typeof trace_events;
