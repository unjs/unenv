import { MessagePort } from "./message-port.ts";
import type nodeWorkerThreads from "node:worker_threads";

export class MessageChannel implements nodeWorkerThreads.MessageChannel {
  port1 = new MessagePort();
  port2 = new MessagePort();
}
