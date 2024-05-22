import { notImplemented } from "src/runtime/_internal/utils";
import noop from "../../mock/noop";
import mock from "../../mock/proxy";
import type cluster from "node:cluster";
import type { Cluster, Worker as _Worker } from "node:cluster";
import { EventEmitter } from "../events";

const _cluster = new EventEmitter() as Cluster;
const _noop = () => {
  return _cluster;
};

const on: typeof cluster.on = _noop;
const addListener: typeof cluster.addListener = _noop;
const once: typeof cluster.once = _noop;
const removeListener: typeof cluster.removeListener = _noop;
const removeAllListeners: typeof cluster.removeAllListeners = _noop;
const emit: typeof cluster.emit = () => false;
const off: typeof cluster.off = _noop;
const prependListener: typeof cluster.prependListener = _noop;
const prependOnceListener: typeof cluster.prependOnceListener = _noop;
const listeners: typeof cluster.listeners = function (name) {
  return [];
};
const listenerCount: typeof cluster.listenerCount = () => 0;
const setMaxListeners: typeof cluster.setMaxListeners = notImplemented(
  "cluster.setMaxListeners",
);
const getMaxListeners: typeof cluster.getMaxListeners = notImplemented(
  "cluster.getMaxListeners",
);
const rawListeners: typeof cluster.rawListeners = notImplemented(
  "cluster.rawListeners",
);
const eventNames: typeof cluster.eventNames =
  notImplemented("cluster.eventNames");

export const disconnect: typeof cluster.disconnect =
  notImplemented("cluster.disconnect");
export const fork: typeof cluster.fork = notImplemented("cluster.fork");
export const isPrimary: typeof cluster.isPrimary = true;
export const isMaster: typeof cluster.isMaster = true;
export const isWorker: typeof cluster.isWorker = false;
export const SCHED_NONE: typeof cluster.SCHED_NONE = 1;
export const SCHED_RR: typeof cluster.SCHED_RR = 2;
export const schedulingPolicy: typeof cluster.schedulingPolicy = SCHED_RR;
export const settings: typeof cluster.settings = {};
export const setupPrimary: typeof cluster.setupPrimary = noop;
export const setupMaster: typeof cluster.setupMaster = noop;
export const workers: typeof cluster.workers = {};
export const Worker: typeof _Worker = mock.__createMock__("cluster.Worker");

export default <typeof cluster>{
  addListener,
  disconnect,
  emit,
  eventNames,
  fork,
  getMaxListeners,
  isMaster,
  isPrimary,
  isWorker,
  listeners,
  listenerCount,
  on,
  once,
  off,
  prependListener,
  prependOnceListener,
  rawListeners,
  removeAllListeners,
  removeListener,
  SCHED_NONE,
  SCHED_RR,
  schedulingPolicy,
  setMaxListeners,
  settings,
  setupPrimary,
  setupMaster,
  Worker,
  workers,
};
