import type nodeTraceEvents from "node:trace_events";

export class Tracing implements nodeTraceEvents.Tracing {
  categories = "";
  enabled = false;
  disable() {
    this.enabled = false;
  }
  enable() {
    this.enabled = true;
  }
}
