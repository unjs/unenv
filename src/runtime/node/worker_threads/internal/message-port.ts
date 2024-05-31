import { EventEmitter } from "node:events";
import type worker_threads from "node:worker_threads";

export class MessagePort
  extends EventEmitter // eslint-disable-line unicorn/prefer-event-target
  implements worker_threads.MessagePort
{
  close() {}
  postMessage(
    value: any,
    transferList?: readonly worker_threads.TransferListItem[] | undefined,
  ) {}
  ref() {}
  unref() {}
  start() {}
}
