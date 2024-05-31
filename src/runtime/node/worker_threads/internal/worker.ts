import { EventEmitter } from "node:events";
import type worker_threads from "node:worker_threads";
import { Readable } from "node:stream";

// eslint-disable-next-line unicorn/prefer-event-target
export class Worker extends EventEmitter implements worker_threads.Worker {
  stdin = null;
  stdout = new Readable();
  stderr = new Readable();
  threadId = 0;
  performance = {
    eventLoopUtilization: () => ({ idle: 0, active: 0, utilization: 0 }),
  };
  postMessage(
    value: any,
    transferList?: readonly worker_threads.TransferListItem[] | undefined,
  ) {}
  ref() {}
  unref() {}
  terminate() {
    return Promise.resolve(0);
  }
  getHeapSnapshot() {
    return Promise.resolve(new Readable());
  }
}
