import type nodeV8 from "node:v8";

export class GCProfiler implements nodeV8.GCProfiler {
  start() {}
  stop() {
    return {
      version: 1,
      startTime: 0,
      endTime: 0,
      statistics: [],
    };
  }
}
