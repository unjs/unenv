import noop from "../../mock/noop";
import mock from "../../mock/proxy";
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

export const getEnvironmentData: typeof worker_threads.getEnvironmentData =
  () => {
    return undefined as unknown as Serializable;
  };
export const isMainThread: typeof worker_threads.isMainThread = false;
export const isMarkedAsUntransferable = () => false;
export const markAsUntransferable: typeof worker_threads.markAsUntransferable =
  noop;
export const moveMessagePortToContext: typeof worker_threads.moveMessagePortToContext =
  () => new MessagePort();
export const parentPort: typeof worker_threads.parentPort = new MessagePort();
export const receiveMessageOnPort: typeof worker_threads.receiveMessageOnPort =
  () => ({
    message: undefined,
  });
export const SHARE_ENV = Symbol.for(
  "nodejs.worker_threads.SHARE_ENV",
) as typeof worker_threads.SHARE_ENV;
export const resourceLimits: typeof worker_threads.resourceLimits = {};
export const setEnvironmentData: typeof worker_threads.setEnvironmentData =
  noop;
export const threadId: typeof worker_threads.threadId = 0;
export const workerData: typeof worker_threads.workerData = undefined;

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
