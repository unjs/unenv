import { EventEmitter } from "node:events";
import type nodeNet from "node:net";
import type nodeDgram from "node:dgram";

export class Socket extends EventEmitter implements nodeDgram.Socket {
  readonly __unenv__ = true;

  bind(): this {
    return this;
  }
  close(): this {
    return this;
  }
  ref(): this {
    return this;
  }
  unref(): this {
    return this;
  }
  getRecvBufferSize(): number {
    return 100_000;
  }
  getSendBufferSize(): number {
    return 10_000;
  }
  getSendQueueSize(): number {
    return 0;
  }
  getSendQueueCount(): number {
    return 0;
  }
  setMulticastLoopback(): boolean {
    return false;
  }
  setMulticastTTL(): number {
    return 1;
  }
  setTTL(): number {
    return 1;
  }
  address(): nodeNet.AddressInfo {
    return { address: "127.0.0.1", family: "IPv4", port: 1234 };
  }

  remoteAddress(): nodeNet.AddressInfo {
    throw new Error("ERR_SOCKET_DGRAM_NOT_CONNECTED");
  }

  [Symbol.asyncDispose]() {
    return Promise.resolve();
  }

  addMembership() {}
  addSourceSpecificMembership() {}
  connect() {}
  disconnect() {}
  dropMembership() {}
  dropSourceSpecificMembership() {}
  send() {}
  setSendBufferSize() {}
  setBroadcast() {}
  setRecvBufferSize() {}
  setMulticastInterface() {}
}
