import { EventEmitter } from "node:events";
import type worker_threads from "node:worker_threads";
import { Readable } from "node:stream";

export class Worker extends EventEmitter implements worker_threads.Worker {
  stdin = null;
  stdout = new Readable();
  stderr = new Readable();
  threadId = 0;
  performance = {
    eventLoopUtilization: () => ({ idle: 0, active: 0, utilization: 0 }),
  };
  postMessage(
    _value: any,
    _transferList?: readonly worker_threads.TransferListItem[] | undefined,
  ) {}
  postMessageToThread(
    _threadId: unknown,
    _value: unknown,
    _transferList?: unknown,
    _timeout?: unknown,
  ): Promise<void> {
    return Promise.resolve();
  }
  ref() {}
  unref() {}
  terminate() {
    return Promise.resolve(0);
  }
  getHeapSnapshot() {
    return Promise.resolve(new Readable());
  }
}
