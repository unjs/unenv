import type trace_events from "node:trace_events";

export class Tracing implements trace_events.Tracing {
  categories = "";
  enabled = false;
  disable() {
    this.enabled = false;
  }
  enable() {
    this.enabled = true;
  }
}
