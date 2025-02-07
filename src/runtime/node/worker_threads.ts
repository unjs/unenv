import type worker_threads from "node:worker_threads";
import { BroadcastChannel } from "./internal/worker_threads/broadcast-channel.ts";
import { MessageChannel } from "./internal/worker_threads/message-channel.ts";
import { MessagePort } from "./internal/worker_threads/message-port.ts";
import { Worker } from "./internal/worker_threads/worker.ts";

import { notImplemented } from "../_internal/utils.ts";

export { BroadcastChannel } from "./internal/worker_threads/broadcast-channel.ts";
export { MessageChannel } from "./internal/worker_threads/message-channel.ts";
export { MessagePort } from "./internal/worker_threads/message-port.ts";
export { Worker } from "./internal/worker_threads/worker.ts";

const _environmentData = new Map<string, worker_threads.Serializable>();
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

export const markAsUncloneable: typeof worker_threads.markAsUncloneable =
  () => {
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
} as /* TODO: use satisfies */ typeof worker_threads;
