// https://nodejs.org/api/net.html
import type net from "node:net";
import { notImplemented, notImplementedClass } from "../../_internal/utils";
import { Socket, SocketAddress } from "./internal/socket";

export { Socket, SocketAddress } from "./internal/socket";

export const createServer = notImplemented(
  "net.createServer",
) as typeof net.createServer;

export const Server = notImplementedClass("net.Server") as typeof net.Server;

export const BlockList = notImplementedClass(
  "net.BlockList",
) as typeof net.BlockList;

export const connect = notImplemented("net.connect") as typeof net.connect;

export const createConnection = notImplemented(
  "net.createConnection",
) as typeof net.createConnection;

export const getDefaultAutoSelectFamily = notImplemented(
  "net.getDefaultAutoSelectFamily",
) as typeof net.getDefaultAutoSelectFamily;

export const setDefaultAutoSelectFamily = notImplemented(
  "net.setDefaultAutoSelectFamily",
) as typeof net.setDefaultAutoSelectFamily;

export const getDefaultAutoSelectFamilyAttemptTimeout = notImplemented(
  "net.getDefaultAutoSelectFamilyAttemptTimeout",
) as typeof net.getDefaultAutoSelectFamilyAttemptTimeout;

export const setDefaultAutoSelectFamilyAttemptTimeout = notImplemented(
  "net.setDefaultAutoSelectFamilyAttemptTimeout",
) as typeof net.setDefaultAutoSelectFamilyAttemptTimeout;

const IPV4Regex = /^(?:\d{1,3}\.){3}\d{1,3}$/;
export const isIPv4: typeof net.isIPv4 = (host: string) => IPV4Regex.test(host);

const IPV6Regex = /^([\dA-Fa-f]{1,4}:){7}[\dA-Fa-f]{1,4}$/;
export const isIPv6: typeof net.isIPv6 = (host: string) => IPV6Regex.test(host);

export const isIP: typeof net.isIP = (host: string) => {
  if (isIPv4(host)) {
    return 4;
  }
  if (isIPv6(host)) {
    return 6;
  }
  return 0;
};

export const exports: typeof net = {
  Socket: Socket as any, // TODO
  Server,
  BlockList,
  SocketAddress,
  createServer,
  connect,
  createConnection,
  isIPv4,
  isIPv6,
  isIP,
  getDefaultAutoSelectFamily,
  getDefaultAutoSelectFamilyAttemptTimeout,
  setDefaultAutoSelectFamily,
  setDefaultAutoSelectFamilyAttemptTimeout,
};

export default exports;
