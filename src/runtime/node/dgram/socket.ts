import { EventEmitter } from "../events";
import noop from "../../mock/noop";
import type net from "node:net";
import type dgram from "node:dgram";

// eslint-disable-next-line unicorn/prefer-event-target
export class Socket extends EventEmitter implements dgram.Socket {
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
  address(): net.AddressInfo {
    return { address: "127.0.0.1", family: "IPv4", port: 1234 };
  }

  remoteAddress(): net.AddressInfo {
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
