import type nodeCluster from "node:cluster";
import type {
  Cluster as NodeCluster,
  Worker as NodeClusterWorker,
  ClusterSettings as NodeClusterSettings,
} from "node:cluster";
import { EventEmitter } from "node:events";
import { notImplemented } from "../_internal/utils.ts";

export const SCHED_NONE: typeof nodeCluster.SCHED_NONE = 1;
export const SCHED_RR: typeof nodeCluster.SCHED_RR = 2;

export const isMaster: typeof nodeCluster.isMaster = true;
export const isPrimary: typeof nodeCluster.isPrimary = true;
export const isWorker: typeof nodeCluster.isWorker = false;

export const schedulingPolicy: typeof nodeCluster.schedulingPolicy = SCHED_RR;
export const settings: typeof nodeCluster.settings = {};
export const workers: typeof nodeCluster.workers = {};

export const fork: typeof nodeCluster.fork =
  /*@__PURE__*/ notImplemented("cluster.fork");

export const disconnect: typeof nodeCluster.disconnect =
  /*@__PURE__*/ notImplemented("cluster.disconnect");

export const setupPrimary: typeof nodeCluster.setupPrimary =
  /*@__PURE__*/ notImplemented("cluster.setupPrimary");

export const setupMaster: typeof nodeCluster.setupMaster =
  /*@__PURE__*/ notImplemented("cluster.setupMaster");

// Make ESM coverage happy
export const _events = [];
export const _eventsCount = 0;
export const _maxListeners = 0;

export class Worker extends EventEmitter implements NodeClusterWorker {
  _connected: boolean = false;
  id = 0;
  get process() {
    return globalThis.process as any;
  }
  get exitedAfterDisconnect() {
    return this._connected;
  }
  isConnected(): boolean {
    return this._connected;
  }
  isDead(): boolean {
    return true;
  }
  send(message: any, sendHandle?: any, options?: any, callback?: any): boolean {
    return false;
  }
  kill(signal?: string): void {
    this._connected = false;
  }
  destroy(signal?: string): void {
    this._connected = false;
  }
  disconnect(): this {
    this._connected = false;
    return this;
  }
}

class _Cluster extends EventEmitter implements NodeCluster {
  Worker = Worker;
  isMaster = isMaster;
  isPrimary = isPrimary;
  isWorker = isWorker;
  SCHED_NONE = SCHED_NONE;
  SCHED_RR = SCHED_RR;
  schedulingPolicy = SCHED_RR;
  settings = settings;
  workers = workers;
  setupPrimary(_settings?: NodeClusterSettings): void {
    setupPrimary();
  }
  setupMaster(_settings?: NodeClusterSettings): void {
    setupMaster();
  }
  disconnect(): void {
    disconnect();
  }
  fork(env?: any): NodeClusterWorker {
    return fork(env);
  }
}

export default new _Cluster();
