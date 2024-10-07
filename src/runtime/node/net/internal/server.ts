import type * as net from "node:net";
import { EventEmitter } from "node:events";

// Docs: https://nodejs.org/api/net.html#net_class_net_server
export class Server extends EventEmitter implements net.Server {
  readonly __unenv__ = true;

  maxConnections: number = 1;
  connections: number = 0;
  readonly listening: boolean = false;

  constructor(
    arg1?: net.ServerOpts | ((socket: net.Socket) => void),
    arg2?: (socket: net.Socket) => void,
  ) {
    super();
  }

  listen(): this {
    return this;
  }

  close(callback?: (err?: Error) => void): this {
    callback?.();
    return this;
  }

  address(): net.AddressInfo | string | null {
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
