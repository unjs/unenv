import type tls from "node:tls";
import { notImplemented } from "../_internal/utils";
import { TLSSocket } from "./internal/tls/tls-socket";
import { Server } from "./internal/tls/server";
import { SecureContext } from "./internal/tls/secure-context";
import * as constants from "./internal/tls/constants";

export * from "./internal/tls/constants";
export { TLSSocket } from "./internal/tls/tls-socket";
export { Server } from "./internal/tls/server";
export { SecureContext } from "./internal/tls/secure-context";

export const connect: typeof tls.connect = function connect() {
  return new TLSSocket();
};

export const createServer: typeof tls.createServer = function createServer() {
  return new Server();
};
export const checkServerIdentity: typeof tls.checkServerIdentity =
  /*@__PURE__*/ notImplemented("tls.checkServerIdentity");
export const convertALPNProtocols = /*@__PURE__*/ notImplemented(
  "tls.convertALPNProtocols",
);
export const createSecureContext: typeof tls.createSecureContext =
  /*@__PURE__*/ notImplemented("tls.createSecureContext");
export const createSecurePair: typeof tls.createSecurePair =
  /*@__PURE__*/ notImplemented("tls.createSecurePair");
export const getCiphers: typeof tls.getCiphers =
  /*@__PURE__*/ notImplemented("tls.getCiphers");

export const rootCertificates: typeof tls.rootCertificates = [];

export default <typeof tls>{
  ...constants,
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
};
