import { MessagePort } from "./message-port.ts";
import type worker_threads from "node:worker_threads";

export class MessageChannel implements worker_threads.MessageChannel {
  port1 = new MessagePort();
  port2 = new MessagePort();
}
