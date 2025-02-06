import type tls from "node:tls";
import { notImplemented } from "../_internal/utils.ts";
import { TLSSocket } from "./internal/tls/tls-socket.ts";
import { Server } from "./internal/tls/server.ts";
import { SecureContext } from "./internal/tls/secure-context.ts";
import * as constants from "./internal/tls/constants.ts";

export * from "./internal/tls/constants.ts";
export { TLSSocket } from "./internal/tls/tls-socket.ts";
export { Server } from "./internal/tls/server.ts";
export { SecureContext } from "./internal/tls/secure-context.ts";

export const connect: typeof tls.connect = function connect() {
  return new TLSSocket();
};

export const createServer: typeof tls.createServer = function createServer() {
  return new Server();
};
export const checkServerIdentity: typeof tls.checkServerIdentity =
  notImplemented("tls.checkServerIdentity");
export const convertALPNProtocols = notImplemented("tls.convertALPNProtocols");
export const createSecureContext: typeof tls.createSecureContext =
  notImplemented("tls.createSecureContext");
export const createSecurePair: typeof tls.createSecurePair = notImplemented(
  "tls.createSecurePair",
);
export const getCiphers: typeof tls.getCiphers =
  notImplemented("tls.getCiphers");

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
