import type nodeWorkerThreads from "node:worker_threads";
import { BroadcastChannel } from "./internal/worker_threads/broadcast-channel.ts";
import { MessageChannel } from "./internal/worker_threads/message-channel.ts";
import { MessagePort } from "./internal/worker_threads/message-port.ts";
import { Worker } from "./internal/worker_threads/worker.ts";

import { notImplemented } from "../_internal/utils.ts";

export { BroadcastChannel } from "./internal/worker_threads/broadcast-channel.ts";
export { MessageChannel } from "./internal/worker_threads/message-channel.ts";
export { MessagePort } from "./internal/worker_threads/message-port.ts";
export { Worker } from "./internal/worker_threads/worker.ts";

const _environmentData = new Map<string, nodeWorkerThreads.Serializable>();
export const getEnvironmentData: typeof nodeWorkerThreads.getEnvironmentData =
  function getEnvironmentData(key) {
    return _environmentData.get(key as string)!;
  };
export const setEnvironmentData: typeof nodeWorkerThreads.setEnvironmentData =
  function setEnvironmentData(key, value) {
    _environmentData.set(key as string, value);
  };

export const isMainThread: typeof nodeWorkerThreads.isMainThread = true;

export const isMarkedAsUntransferable: any /* Node.js 22 */ = () => false;
export const markAsUntransferable: typeof nodeWorkerThreads.markAsUntransferable =
  function markAsUntransferable(value) {
    // noop
  };

export const markAsUncloneable: typeof nodeWorkerThreads.markAsUncloneable =
  () => {
    // noop
  };

export const moveMessagePortToContext: typeof nodeWorkerThreads.moveMessagePortToContext =
  () => new MessagePort();

export const parentPort: typeof nodeWorkerThreads.parentPort = null;

export const receiveMessageOnPort: typeof nodeWorkerThreads.receiveMessageOnPort =
  () => undefined;

export const SHARE_ENV = Symbol.for(
  "nodejs.worker_threads.SHARE_ENV",
) as typeof nodeWorkerThreads.SHARE_ENV;

export const resourceLimits: typeof nodeWorkerThreads.resourceLimits = {};

export const threadId: typeof nodeWorkerThreads.threadId = 0;

export const workerData: typeof nodeWorkerThreads.workerData = null;

// https://nodejs.org/api/worker_threads.html#workerpostmessagetothreadthreadid-value-transferlist-timeout
export const postMessageToThread = /*@__PURE__*/ notImplemented(
  "worker_threads.postMessageToThread",
);

export default {
  BroadcastChannel,
  MessageChannel,
  MessagePort,
  Worker,
  SHARE_ENV,
  getEnvironmentData,
  isMainThread,
  isMarkedAsUntransferable,
  markAsUntransferable,
  markAsUncloneable,
  moveMessagePortToContext,
  parentPort,
  receiveMessageOnPort,
  resourceLimits,
  setEnvironmentData,
  postMessageToThread,
  threadId,
  workerData,
} as /* TODO: use satisfies */ typeof nodeWorkerThreads;
