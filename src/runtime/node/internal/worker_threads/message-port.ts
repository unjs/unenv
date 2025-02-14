import { EventEmitter } from "node:events";
import type nodeWorkerThreads from "node:worker_threads";

export class MessagePort
  extends EventEmitter
  implements nodeWorkerThreads.MessagePort
{
  close() {}
  postMessage(
    value: any,
    transferList?: readonly nodeWorkerThreads.TransferListItem[] | undefined,
  ) {}
  ref() {}
  unref() {}
  start() {}

  addEventListener(type: string, listener: (...args: any[]) => void): void {
    this.on(type, listener);
  }

  removeEventListener(type: string, listener: (...args: any[]) => void): void {
    this.off(type, listener);
  }

  dispatchEvent(event: Event) {
    return this.emit(event.type, event);
  }
}
