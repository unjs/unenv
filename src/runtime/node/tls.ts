import type nodeTls from "node:tls";
import { notImplemented } from "../_internal/utils.ts";
import { TLSSocket } from "./internal/tls/tls-socket.ts";
import { Server } from "./internal/tls/server.ts";
import { SecureContext } from "./internal/tls/secure-context.ts";

// prettier-ignore
import { CLIENT_RENEG_LIMIT, CLIENT_RENEG_WINDOW, DEFAULT_CIPHERS, DEFAULT_ECDH_CURVE, DEFAULT_MAX_VERSION, DEFAULT_MIN_VERSION } from "./internal/tls/constants.ts"

export * from "./internal/tls/constants.ts";

export { TLSSocket } from "./internal/tls/tls-socket.ts";
export { Server } from "./internal/tls/server.ts";
export { SecureContext } from "./internal/tls/secure-context.ts";

export const connect: typeof nodeTls.connect = function connect() {
  return new TLSSocket();
};

export const createServer: typeof nodeTls.createServer =
  function createServer() {
    return new Server();
  };
export const checkServerIdentity: typeof nodeTls.checkServerIdentity =
  /*@__PURE__*/ notImplemented("tls.checkServerIdentity");
export const convertALPNProtocols = /*@__PURE__*/ notImplemented(
  "tls.convertALPNProtocols",
);
export const createSecureContext: typeof nodeTls.createSecureContext =
  /*@__PURE__*/ notImplemented("tls.createSecureContext");
export const createSecurePair: typeof nodeTls.createSecurePair =
  /*@__PURE__*/ notImplemented("tls.createSecurePair");
export const getCiphers: typeof nodeTls.getCiphers =
  /*@__PURE__*/ notImplemented("tls.getCiphers");

export const rootCertificates: typeof nodeTls.rootCertificates = [];

export default {
  CLIENT_RENEG_LIMIT,
  CLIENT_RENEG_WINDOW,
  DEFAULT_CIPHERS,
  DEFAULT_ECDH_CURVE,
  DEFAULT_MAX_VERSION,
  DEFAULT_MIN_VERSION,
  SecureContext,
  Server,
  TLSSocket,
  checkServerIdentity,
  connect,
  convertALPNProtocols,
  createSecureContext,
  createSecurePair,
  createServer,
  getCiphers,
  rootCertificates,
} as /* TODO: use satisfies */ typeof nodeTls;
