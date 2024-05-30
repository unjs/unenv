import type trace_events from "node:trace_events";
import { Tracing } from "./tracing";

export const createTracing: typeof trace_events.createTracing = function () {
  return new Tracing();
};
export const getEnabledCategories: typeof trace_events.getEnabledCategories =
  () => undefined;

export default <typeof trace_events>{
  createTracing,
  getEnabledCategories,
};