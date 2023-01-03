import type * as net from "node:net";
import { Callback, BufferEncoding } from "../../_internal/types";
import { Duplex } from "../stream/duplex";

// Docs: https://nodejs.org/api/net.html#net_class_net_socket
export class Socket extends Duplex implements net.Socket {
  readonly bufferSize: number = 0;
  readonly bytesRead: number = 0;
  readonly bytesWritten: number = 0;
  readonly connecting: boolean = false;
  readonly destroyed: boolean = false;
  readonly localAddress: string = "";
  readonly localPort: number = 0;
  readonly remoteAddress?: string = "";
  readonly remoteFamily?: string = "";
  readonly remotePort?: number = 0;
  readonly readyState: net.SocketReadyState = "readOnly";

  constructor(_options?: net.SocketConstructorOpts) {
    super();
  }

  write(
    _buffer: Uint8Array | string,
    _arg1?: BufferEncoding | Callback<Error | undefined>,
    _arg2?: Callback<Error | undefined>
  ): boolean {
    return false;
  }

  connect(
    _arg1: number | string | net.SocketConnectOpts,
    _arg2?: string | Callback,
    _arg3?: Callback
  ) {
    return this;
  }

  end(
    _arg1?: Callback | Uint8Array | string,
    _arg2?: BufferEncoding | Callback,
    _arg3?: Callback
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

  resetAndDestroy() {
    const err = new Error("ERR_SOCKET_CLOSED");
    (err as any).code = "ERR_SOCKET_CLOSED";
    this.destroy(err);
    return this;
  }
}
