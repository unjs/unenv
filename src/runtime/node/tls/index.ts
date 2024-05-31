import type tls from "node:tls";
import { notImplemented } from "../../_internal/utils";
import { TLSSocket } from "./internal/tls-socket";
import { Server } from "./internal/server";
import { SecureContext } from "./internal/secure-context";
import * as constants from "./internal/constants";

export * from "./internal/constants";
export { TLSSocket } from "./internal/tls-socket";
export { Server } from "./internal/server";
export { SecureContext } from "./internal/secure-context";

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
