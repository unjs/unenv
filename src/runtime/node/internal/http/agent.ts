import type http from "node:http";
import { EventEmitter } from "node:events";

export class Agent extends EventEmitter implements http.Agent {
  public __unenv__ = {};
  maxFreeSockets = 256;
  maxSockets: number = Infinity;
  maxTotalSockets: number = Infinity;
  readonly freeSockets = {};
  readonly sockets = {};
  readonly requests = {};
  destroy(): void {}
}
