import type nodeWorkerThreads from "node:worker_threads";

export class BroadcastChannel implements nodeWorkerThreads.BroadcastChannel {
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
