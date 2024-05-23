// Reference: https://github.com/nodejs/node/blob/main/lib/internal/cluster/primary.js
import noop from "../../mock/noop";
import mock from "../../mock/proxy";
import type cluster from "node:cluster";
import type { Cluster, Worker as _Worker } from "node:cluster";
import { EventEmitter } from "../events";

// A mapped type used internally to allow assigning to readonly fields like `isPrimary`
type MutableCluster = {
  -readonly [key in keyof Cluster]: Cluster[key];
} & {
  Worker: typeof _Worker;
};

// eslint-disable-next-line unicorn/prefer-event-target
const _cluster = new EventEmitter() as MutableCluster;

export const disconnect: typeof cluster.disconnect = noop;
export const fork: typeof cluster.fork = () =>
  mock.__createMock__("cluster.Worker");
export const isMaster: typeof cluster.isMaster = true;
export const isPrimary: typeof cluster.isPrimary = true;
export const isWorker: typeof cluster.isWorker = false;
export const SCHED_NONE: typeof cluster.SCHED_NONE = 1;
export const SCHED_RR: typeof cluster.SCHED_RR = 2;
export const schedulingPolicy: typeof cluster.schedulingPolicy = SCHED_RR;
export const settings: typeof cluster.settings = {};
export const setupPrimary: typeof cluster.setupPrimary = noop;
export const setupMaster: typeof cluster.setupMaster = noop;
export const workers: typeof cluster.workers = {};
export const Worker: typeof _Worker = mock.__createMock__("cluster.Worker");

// These 3 _functions don't exist on the EventEmitter type
export const _events = (_cluster as any)._events;
export const _eventsCount = (_cluster as any)._eventsCount;
export const _maxListeners = (_cluster as any)._maxListeners;

_cluster.disconnect = disconnect;
_cluster.fork = fork;
_cluster.isMaster = isMaster;
_cluster.isPrimary = isPrimary;
_cluster.isWorker = isWorker;
_cluster.SCHED_NONE = SCHED_NONE;
_cluster.SCHED_RR = SCHED_RR;
_cluster.schedulingPolicy = SCHED_RR;
_cluster.settings = settings;
_cluster.setupPrimary = setupPrimary;
_cluster.setupMaster = setupMaster;
_cluster.workers = workers;
_cluster.Worker = Worker;

export default _cluster as Cluster;
