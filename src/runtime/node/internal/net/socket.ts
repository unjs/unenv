import type nodeNet from "node:net";
import {
  type Callback,
  type BufferEncoding,
} from "../../../_internal/types.ts";
// Relative stream import required, see https://github.com/unjs/unenv/issues/353
import { Duplex } from "../stream/duplex.ts";

// Docs: https://nodejs.org/api/net.html#net_class_net_socket
export class Socket extends Duplex implements nodeNet.Socket {
  readonly __unenv__ = true;

  readonly bufferSize: number = 0;
  readonly bytesRead: number = 0;
  readonly bytesWritten: number = 0;
  readonly connecting: boolean = false;
  readonly destroyed: boolean = false;
  readonly pending: boolean = false;
  readonly localAddress: string = "";
  readonly localPort: number = 0;
  readonly remoteAddress?: string = "";
  readonly remoteFamily?: string = "";
  readonly remotePort?: number = 0;
  readonly autoSelectFamilyAttemptedAddresses = [];
  readonly readyState: nodeNet.SocketReadyState = "readOnly";

  constructor(_options?: nodeNet.SocketConstructorOpts) {
    super();
  }

  write(
    _buffer: Uint8Array | string,
    _arg1?: BufferEncoding | Callback<Error | undefined>,
    _arg2?: Callback<Error | undefined>,
  ): boolean {
    return false;
  }

  connect(
    _arg1: number | string | nodeNet.SocketConnectOpts,
    _arg2?: string | Callback,
    _arg3?: Callback,
  ) {
    return this;
  }

  end(
    _arg1?: Callback | Uint8Array | string,
    _arg2?: BufferEncoding | Callback,
    _arg3?: Callback,
  ) {
    return this;
  }

  setEncoding(_encoding?: BufferEncoding): this {
    return this;
  }

  pause() {
    return this;
  }

  resume() {
    return this;
  }

  setTimeout(_timeout: number, _callback?: Callback): this {
    return this;
  }

  setNoDelay(_noDelay?: boolean): this {
    return this;
  }

  setKeepAlive(_enable?: boolean, _initialDelay?: number): this {
    return this;
  }

  address() {
    return {};
  }

  unref() {
    return this;
  }

  ref() {
    return this;
  }

  destroySoon() {
    this.destroy();
  }

  resetAndDestroy() {
    const err = new Error("ERR_SOCKET_CLOSED");
    (err as any).code = "ERR_SOCKET_CLOSED";
    this.destroy(err);
    return this;
  }
}

export class SocketAddress implements nodeNet.SocketAddress {
  readonly __unenv__ = true;

  address: string;
  family: "ipv4" | "ipv6";
  port: number;
  flowlabel: number;

  static parse(_address: string, _port?: number) {
    return undefined; // successful
  }

  constructor(options: nodeNet.SocketAddress) {
    this.address = options.address;
    this.family = options.family;
    this.port = options.port;
    this.flowlabel = options.flowlabel;
  }
}
