// https://nodejs.org/api/net.html
import type nodeNet from "node:net";

import { notImplemented, notImplementedClass } from "../_internal/utils.ts";

import { Socket, SocketAddress } from "./internal/net/socket.ts";
import { Server } from "./internal/net/server.ts";

export { Server } from "./internal/net/server.ts";

// require('node:net').Socket === require('node:net').Stream
export {
  Socket,
  SocketAddress,
  Socket as Stream,
} from "./internal/net/socket.ts";

export const createServer = /*@__PURE__*/ notImplemented(
  "net.createServer",
) as typeof nodeNet.createServer;

export const BlockList = /*@__PURE__*/ notImplementedClass(
  "net.BlockList",
) as typeof nodeNet.BlockList;

export const connect = /*@__PURE__*/ notImplemented(
  "net.connect",
) as typeof nodeNet.connect;

export const createConnection = /*@__PURE__*/ notImplemented(
  "net.createConnection",
) as typeof nodeNet.createConnection;

export const getDefaultAutoSelectFamily = /*@__PURE__*/ notImplemented(
  "net.getDefaultAutoSelectFamily",
) as typeof nodeNet.getDefaultAutoSelectFamily;

export const setDefaultAutoSelectFamily = /*@__PURE__*/ notImplemented(
  "net.setDefaultAutoSelectFamily",
) as typeof nodeNet.setDefaultAutoSelectFamily;

export const getDefaultAutoSelectFamilyAttemptTimeout =
  /*@__PURE__*/ notImplemented(
    "net.getDefaultAutoSelectFamilyAttemptTimeout",
  ) as typeof nodeNet.getDefaultAutoSelectFamilyAttemptTimeout;

export const setDefaultAutoSelectFamilyAttemptTimeout =
  /*@__PURE__*/ notImplemented(
    "net.setDefaultAutoSelectFamilyAttemptTimeout",
  ) as typeof nodeNet.setDefaultAutoSelectFamilyAttemptTimeout;

const IPV4Regex = /^(?:\d{1,3}\.){3}\d{1,3}$/;
export const isIPv4: typeof nodeNet.isIPv4 = (host: string) =>
  IPV4Regex.test(host);

const IPV6Regex = /^([\dA-Fa-f]{1,4}:){7}[\dA-Fa-f]{1,4}$/;
export const isIPv6: typeof nodeNet.isIPv6 = (host: string) =>
  IPV6Regex.test(host);

export const isIP: typeof nodeNet.isIP = (host: string) => {
  if (isIPv4(host)) {
    return 4;
  }
  if (isIPv6(host)) {
    return 6;
  }
  return 0;
};

// --- internal ---
export const _createServerHandle = /*@__PURE__*/ notImplemented(
  "net._createServerHandle",
);

export const _normalizeArgs =
  /*@__PURE__*/ notImplemented("net._normalizeArgs");

export const _setSimultaneousAccepts = /*@__PURE__*/ notImplemented(
  "net._setSimultaneousAccepts",
);

export const exports: typeof nodeNet = {
  Socket: Socket,
  // @ts-expect-error (deprecated alias)
  Stream: Socket,
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
  _createServerHandle,
  _normalizeArgs,
  _setSimultaneousAccepts,
};

export default exports;
