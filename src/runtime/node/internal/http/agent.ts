import type nodeHttp from "node:http";
import { EventEmitter } from "node:events";

export class Agent extends EventEmitter implements nodeHttp.Agent {
  public __unenv__ = {};
  maxFreeSockets = 256;
  maxSockets: number = Infinity;
  maxTotalSockets: number = Infinity;
  readonly freeSockets = {};
  readonly sockets = {};
  readonly requests = {};
  readonly options: nodeHttp.AgentOptions;
  constructor(opts: nodeHttp.AgentOptions = {}) {
    super();
    this.options = opts;
  }
  destroy(): void {}
}
