import type worker_threads from "node:worker_threads";
import { BroadcastChannel } from "./broadcast-channel";
import { MessageChannel } from "./message-channel";
import { MessagePort } from "./message-port";
import { Worker } from "./worker";
import { Serializable } from "node:worker_threads";

export { BroadcastChannel } from "./broadcast-channel";
export { MessageChannel } from "./message-channel";
export { MessagePort } from "./message-port";
export { Worker } from "./worker";

const _environmentData = new Map<string, Serializable>();
export const getEnvironmentData: typeof worker_threads.getEnvironmentData =
  function getEnvironmentData(key) {
    return _environmentData.get(key as string)!;
  };
export const setEnvironmentData: typeof worker_threads.setEnvironmentData =
  function setEnvironmentData(key, value) {
    _environmentData.set(key as string, value);
  };

export const isMainThread: typeof worker_threads.isMainThread = true;

export const isMarkedAsUntransferable: any /* Node.js 22 */ = () => false;
export const markAsUntransferable: typeof worker_threads.markAsUntransferable =
  function markAsUntransferable(value) {
    // noop
  };

export const moveMessagePortToContext: typeof worker_threads.moveMessagePortToContext =
  () => new MessagePort();

export const parentPort: typeof worker_threads.parentPort = null;

export const receiveMessageOnPort: typeof worker_threads.receiveMessageOnPort =
  () => undefined;

export const SHARE_ENV = Symbol.for(
  "nodejs.worker_threads.SHARE_ENV",
) as typeof worker_threads.SHARE_ENV;

export const resourceLimits: typeof worker_threads.resourceLimits = {};

export const threadId: typeof worker_threads.threadId = 0;

export const workerData: typeof worker_threads.workerData = null;

export default <typeof worker_threads>{
  BroadcastChannel,
  MessageChannel,
  MessagePort,
  Worker,
  SHARE_ENV,
  getEnvironmentData,
  isMainThread,
  isMarkedAsUntransferable,
  markAsUntransferable,
  moveMessagePortToContext,
  parentPort,
  receiveMessageOnPort,
  resourceLimits,
  setEnvironmentData,
  threadId,
  workerData,
};
