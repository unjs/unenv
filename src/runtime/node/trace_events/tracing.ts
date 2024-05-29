import type trace_events from "node:trace_events";

export class Tracing implements trace_events.Tracing {
  categories = "";
  disable() {}
  enable() {}
  enabled = false;
}
