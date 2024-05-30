import type trace_events from "node:trace_events";

export class Tracing implements trace_events.Tracing {
  categories = "";
  disable() {
    this.enabled = false;
  }
  enable() {
    this.enabled = true;
  }
  enabled = false;
}
