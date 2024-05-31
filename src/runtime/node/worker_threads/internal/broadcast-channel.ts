import type worker_threads from "node:worker_threads";

export class BroadcastChannel implements worker_threads.BroadcastChannel {
  name = "";
  onmessage = (message: unknown) => {};
  onmessageerror = (message: unknown) => {};
  close() {}
  postMessage(message: unknown) {}
  ref() {
    return this;
  }
  unref() {
    return this;
  }
}
