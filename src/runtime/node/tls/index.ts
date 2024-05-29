import type tls from "node:tls";
import { notImplemented, notImplementedClass } from "../../_internal/utils";
import { TLSSocket } from "./tls-socket";
import { Server } from "./server";
import * as constants from "./constants";

export * from "./constants";
export { TLSSocket } from "./tls-socket";
export { Server } from "./server";

export const SecureContext: tls.SecureContext =
  notImplementedClass("tls.SecureContext");

export const checkServerIdentity: typeof tls.checkServerIdentity =
  notImplemented("tls.checkServerIdentity");

export const connect: typeof tls.connect = notImplemented("tls.connect");
export const convertALPNProtocols = notImplemented("tls.convertALPNProtocols");

export const createSecureContext: typeof tls.createSecureContext =
  notImplemented("tls.createSecureContext");
export const createSecurePair: typeof tls.createSecurePair = notImplemented(
  "tls.createSecurePair",
);
export const createServer: typeof tls.createServer =
  notImplemented("tls.createServer");
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
