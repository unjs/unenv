import type nodeTraceEvents from "node:trace_events";
import { Tracing } from "./internal/trace_events/tracing.ts";

export const createTracing: typeof nodeTraceEvents.createTracing = function () {
  return new Tracing();
};
export const getEnabledCategories: typeof nodeTraceEvents.getEnabledCategories =
  () => "";

export default {
  createTracing,
  getEnabledCategories,
} satisfies typeof nodeTraceEvents;
