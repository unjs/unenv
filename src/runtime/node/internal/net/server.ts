import type nodeNet from "node:net";
import { createNotImplementedError } from "../../../_internal/utils.ts";
import { EventEmitter } from "node:events";

// Docs: https://nodejs.org/api/net.html#net_class_net_server
export class Server extends EventEmitter implements nodeNet.Server {
  readonly __unenv__ = true;

  maxConnections: number = 1;
  connections: number = 0;
  readonly listening: boolean = false;

  constructor(
    arg1?: nodeNet.ServerOpts | ((socket: nodeNet.Socket) => void),
    arg2?: (socket: nodeNet.Socket) => void,
  ) {
    super();
  }

  listen(): this {
    throw createNotImplementedError("node:net.Server.listen()");
  }

  close(callback?: (err?: Error) => void): this {
    throw createNotImplementedError("node:net.Server.close()");
  }

  address(): nodeNet.AddressInfo | string | null {
    return null;
  }

  getConnections(cb: (error: Error | null, count: number) => void): void {
    cb(null, 0);
  }

  ref(): this {
    return this;
  }

  unref(): this {
    return this;
  }

  [Symbol.asyncDispose](): Promise<void> {
    return Promise.resolve();
  }
}
